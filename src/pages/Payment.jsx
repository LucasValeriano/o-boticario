import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Copy, CheckCircle2, Clock, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { pixCode, amount } = location.state || {};
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [status, setStatus] = useState('PENDING');

  const pixQrCodeUrl = pixCode 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}`
    : null;

  useEffect(() => {
    if (!pixCode || !orderId) {
      navigate('/');
      return;
    }

    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', { value: amount, currency: 'BRL' });
    }

    // 1. Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // 2. Status Polling
    const pollStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/orders/${orderId}/status`);
        if (response.data.status === 'PAID') {
          setStatus('PAID');
          if (window.fbq) {
            window.fbq('track', 'Purchase', { value: amount, currency: 'BRL' });
          }
          clearInterval(timer);
          clearInterval(polling);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    const polling = setInterval(pollStatus, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(polling);
    };
  }, [pixCode, orderId, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'PAID') {
    return (
      <div className="bg-[#f9f9f9] min-h-screen py-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container max-w-md mx-auto px-4 text-center"
        >
          <div className="bg-white rounded-[32px] shadow-2xl p-10 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-green" />
            
            <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-green/10 text-brand-green rounded-full mb-8">
              <CheckCircle2 size={48} />
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Pagamento Confirmado!</h1>
            <p className="text-gray-500 mb-10 leading-relaxed font-sans text-sm">
              Sua reserva foi garantida com sucesso. <br />
              <b>Aguarde!</b> Estamos preparando seu pedido para o envio imediato.
            </p>

            <div className="space-y-4">
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-brand-green text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-green/20 hover:brightness-110 transition-all flex items-center justify-center gap-3"
              >
                Voltar ao Início
                <ArrowRight size={16} />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <ShoppingBag size={12} />
                Pedido #{orderId}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen py-12 flex flex-col items-center">
      <div className="container max-w-2xl mx-auto px-4">
        
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-4 bg-brand-green/10 text-brand-green rounded-full mb-5 shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3 tracking-tight">Quase lá!</h1>
          <p className="text-gray-500 font-medium">Finalize seu pagamento para garantir este preço exclusivo.</p>
        </motion.div>

        {/* PIX Container */}
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col items-center p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-3 py-2.5 px-5 bg-red-50 text-red-600 rounded-full border border-red-100">
              <Clock size={16} className="animate-pulse" />
              <span className="text-[11px] font-black tracking-wider uppercase">Expira em: {formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="text-center mb-10 mt-10 md:mt-0">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">Valor total a pagar</p>
            <p className="text-5xl font-serif font-bold text-brand-green tracking-tight">R$ {amount?.toFixed(2).replace('.', ',')}</p>
          </div>

          {/* QR Code Area */}
          <div className="bg-gradient-to-tr from-gray-50 to-white rounded-3xl p-6 mb-10 shadow-inner border border-gray-50 group hover:border-brand-green/30 transition-colors">
             <div className="w-48 h-48 md:w-56 md:h-56 flex flex-col items-center justify-center">
               {pixQrCodeUrl ? (
                 <img 
                   src={pixQrCodeUrl} 
                   alt="PIX QR Code" 
                   className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                 />
               ) : (
                 <div className="flex flex-col items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black tracking-widest uppercase">Gerando Código...</p>
                 </div>
               )}
             </div>
          </div>

          {/* PIX Copy & Paste */}
          <div className="w-full space-y-4 mb-10">
            <div className="flex justify-between items-center px-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Código PIX Copia e Cola</p>
              {copied && <span className="text-[9px] font-black text-brand-green animate-bounce uppercase">Código Copiado!</span>}
            </div>
            <div className="relative">
              <div 
                className="w-full bg-gray-50/80 border border-dashed border-gray-200 rounded-2xl py-6 px-8 text-[11px] font-mono break-all text-gray-500 line-clamp-2 select-all cursor-pointer hover:bg-gray-100/50 transition-all font-bold"
                onClick={copyToClipboard}
              >
                {pixCode}
              </div>
              <button 
                onClick={copyToClipboard}
                className="mt-6 w-full bg-brand-green text-white py-5 rounded-2xl shadow-xl shadow-brand-green/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.25em]"
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copied ? 'Código Copiado' : 'Copiar Código PIX'}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-6 bg-gray-50/50 rounded-2xl flex items-start gap-4 border border-transparent hover:border-brand-green/10 transition-colors">
              <div className="w-8 h-8 shrink-0 bg-white rounded-lg flex items-center justify-center text-brand-green font-black shadow-sm text-sm">1</div>
              <p className="text-[11px] text-gray-600 leading-relaxed font-bold">Abra o app do seu banco e selecione a opção de pagar por <b>PIX</b>.</p>
            </div>
            <div className="p-6 bg-gray-50/50 rounded-2xl flex items-start gap-4 border border-transparent hover:border-brand-green/10 transition-colors">
              <div className="w-8 h-8 shrink-0 bg-white rounded-lg flex items-center justify-center text-brand-green font-black shadow-sm text-sm">2</div>
              <p className="text-[11px] text-gray-600 leading-relaxed font-bold">Escaneie o QR Code acima ou escolha <b>PIX Copia e Cola</b>.</p>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
};

export default Payment;

