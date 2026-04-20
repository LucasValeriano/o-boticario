require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { run, get } = require('./database');
const crypto = require('crypto');

const FB_PIXEL_ID = '1514005273647484';
const FB_CAPI_TOKEN = 'EAANt5nyjdkABRctKkGHkXGk8UBOOKIMODpAPKZA9jDSAOmsZCjnJgNBPbWz2vfRMmW26tVAPxRcjCmLqmwatYpXO2IQm5E7yfcSMR4j35o2nYLZAxgWuwUwjKfWMUVDJYkrR6EQYTy7ot3pWOEgFtPFkyxT8jarZC9idKZBuw2ambyBFkyRkgnhfQ3njEWIeSbAZDZD';

function hashData(data) {
  if (!data) return '';
  return crypto.createHash('sha256').update(data.toString().toLowerCase().trim()).digest('hex');
}

async function sendCAPIEvent(eventName, req, userData, customData) {
  try {
    const payload = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          em: [hashData(userData.email)],
          ph: [hashData(userData.phone)],
          external_id: [hashData(userData.cpf)],
          client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1',
          client_user_agent: req.headers['user-agent']
        },
        custom_data: customData
      }]
    };
    await axios.post(`https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_CAPI_TOKEN}`, payload);
  } catch (err) {
    console.error(`CAPI Error (${eventName}):`, err.response?.data || err.message);
  }
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Paradise PIX Config
const PARADISE_API_URL = process.env.PARADISE_API_URL || 'https://api.paradisepay.com.br/v1/pix';
const PARADISE_API_KEY = process.env.PARADISE_API_KEY || 'your_api_key_here';

app.post('/api/checkout', async (req, res) => {
  const { 
    name, email, cpf, phone, 
    cep, rua, numero, complemento, bairro, cidade, estado,
    amount, items 
  } = req.body;

  try {
    // 1. Save Lead with Address
    const lead = await run(
      `INSERT INTO leads (name, email, cpf, phone, cep, rua, numero, complemento, bairro, cidade, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, cpf, phone, cep, rua, numero, complemento, bairro, cidade, estado]
    );

    // 2. Prepare Paradise PIX Payload
    let pixCode = "";
    let qrCode = "";
    const externalId = `BOT_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    try {
      const cleanCpf = cpf.replace(/\D/g, '');
      const cleanPhone = phone.replace(/\D/g, '');
      
      const ParadisePixAPI = require('./paradise');
      const pixAPI = new ParadisePixAPI();
      
      const transaction = await pixAPI.createPixTransaction({
        amount: Math.round(amount * 100), // API expects cents (e.g. 4700 for R$ 47.00)
        description: 'Pedido Oficial - Boticário',
        reference: externalId,
        customer: {
          name: name,
          email: email,
          phone: cleanPhone,
          document: cleanCpf
        },
        source: 'api_externa'
      });

      if (transaction && transaction.qr_code) {
        pixCode = transaction.qr_code; // The copy/paste code
        qrCode = transaction.qr_code_base64; // The base64 image (if available)
      } else {
        throw new Error("Invalid transaction response from Paradise API");
      }
    } catch (apiErr) {
      console.error('Paradise API failed:', apiErr.message);
      // Fallback for local testing or fail fast
      return res.status(500).json({ success: false, message: 'Erro ao gerar PIX: ' + apiErr.message });
    }

    // 3. Save Order
    const order = await run(
      'INSERT INTO orders (lead_id, pix_code, pix_qr_code, amount, status, external_ref) VALUES (?, ?, ?, ?, ?, ?)',
      [lead.id, pixCode, qrCode, amount, 'PENDING', externalId]
    );

    // 4. Send CAPI InitiateCheckout
    sendCAPIEvent('InitiateCheckout', req, { email, phone, cpf: cpf.replace(/\D/g, '') }, { value: amount, currency: 'BRL' });

    res.status(201).json({
      success: true,
      orderId: order.id,
      pixCode: pixCode,
      pixQrCode: qrCode,
      amount: amount
    });

  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Check payment status
app.get('/api/orders/:id/status', async (req, res) => {
  try {
    const order = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // O status agora refletirá a realidade do banco de dados e da Paradise PIX API
    if (order.status === 'PENDING' && order.external_ref) {
      try {
        const ParadisePixAPI = require('./paradise');
        const pixAPI = new ParadisePixAPI();
        const pdResult = await pixAPI.getTransactionByReference(order.external_ref);
        
        // Formato da ParadisePIX varia, mas se houver success e status == 'PAID'
        // Considerando que a API retorna dados da transação. Adapte 'status' se necessário.
        if (pdResult && pdResult.status === 'PAID') {
          await run('UPDATE orders SET status = ? WHERE id = ?', ['PAID', req.params.id]);
          order.status = 'PAID';
          
          // Fire Purchase CAPI
          try {
            const lead = await get('SELECT email, phone, cpf FROM leads WHERE id = ?', [order.lead_id]);
            if (lead) {
              sendCAPIEvent('Purchase', req, lead, { value: order.amount, currency: 'BRL' });
            }
          } catch (err) {
            console.error('Failed to send CAPI Purchase:', err);
          }
        }
      } catch (err) {
        console.error('Erro ao checar status nativo:', err.message);
      }
    }

    res.json({ status: order.status });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

