import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Lock, Truck, ChevronRight, MapPin } from 'lucide-react';
import axios from 'axios';

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input Masking Logic
    if (name === 'cpf') {
      const masked = value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .substring(0, 14);
      setFormData({ ...formData, [name]: masked });
      return;
    }

    if (name === 'phone') {
      const masked = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
      setFormData({ ...formData, [name]: masked });
      return;
    }

    setFormData({ ...formData, [name]: value });

    // Auto-fill address via CEP
    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      handleCepLookup(value.replace(/\D/g, ''));
    }
  };

  const handleCepLookup = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setFormData(prev => ({
          ...prev,
          rua: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf
        }));
      }
    } catch (err) {
      console.error('CEP Lookup failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/checkout', {
        ...formData,
        amount: cartTotal,
        items: cart
      });

      if (response.data.success) {
        navigate(`/pagamento/${response.data.orderId}`, { 
          state: { 
            pixCode: response.data.pixCode,
            pixQrCode: response.data.pixQrCode,
            amount: cartTotal 
          } 
        });
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Erro ao processar checkout. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">Seu carrinho está vazio</h2>
        <button onClick={() => navigate('/')} className="text-[#017a54] underline">Voltar para a loja</button>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen py-10">
      <div className="container max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              
              {/* Step 1: Personal Data */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-[#017a54] text-white rounded-full flex items-center justify-center font-bold">1</div>
                <h2 className="text-xl font-bold text-gray-900">Dados Pessoais</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome Completo</label>
                  <input 
                    required name="name" onChange={handleChange} value={formData.name}
                    placeholder="Ex: João Silva"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CPF</label>
                  <input 
                    required name="cpf" onChange={handleChange} value={formData.cpf}
                    placeholder="000.000.000-00"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">E-mail</label>
                  <input 
                    required type="email" name="email" onChange={handleChange} value={formData.email}
                    placeholder="exemplo@email.com"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Celular</label>
                  <input 
                    required name="phone" onChange={handleChange} value={formData.phone}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-[#017a54] text-white rounded-full flex items-center justify-center font-bold">2</div>
                <h2 className="text-xl font-bold text-gray-900">Endereço de Entrega</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CEP</label>
                  <input 
                    required name="cep" onChange={handleChange} value={formData.cep}
                    placeholder="00000-000"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all font-bold text-[#017a54]"
                  />
                </div>
                <div className="md:col-span-4 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rua / Avenida</label>
                  <input 
                    required name="rua" onChange={handleChange} value={formData.rua}
                    placeholder="Nome da rua"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Número</label>
                  <input 
                    required name="numero" onChange={handleChange} value={formData.numero}
                    placeholder="123"
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="md:col-span-4 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Complemento</label>
                  <input 
                    name="complemento" onChange={handleChange} value={formData.complemento}
                    placeholder="Apto, Bloco, etc."
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="md:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bairro</label>
                  <input 
                    required name="bairro" onChange={handleChange} value={formData.bairro}
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cidade</label>
                  <input 
                    required name="cidade" onChange={handleChange} value={formData.cidade}
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
                <div className="md:col-span-1 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">UF</label>
                  <input 
                    required name="estado" onChange={handleChange} value={formData.estado}
                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 outline-none focus:ring-2 focus:ring-[#017a54]/20 transition-all"
                  />
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#017a54] text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <h2 className="text-xl font-bold text-gray-900">Forma de Pagamento</h2>
                </div>
                
                <div className="border-2 border-[#017a54] bg-[#017a54]/5 p-6 rounded-2xl flex items-center justify-between mb-8 group transition-all cursor-default">
                  <div className="flex items-center gap-5">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[#017a54]/10 group-hover:scale-105 transition-transform flex items-center justify-center min-w-[100px]">
                      <img src="/src/assets/pix-logo.png" alt="PIX" className="h-16 w-auto object-contain drop-shadow-md" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-black text-gray-900 uppercase tracking-tight leading-none">PIX - Aprovação Imediata</p>
                        <span className="bg-[#017a54] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Único</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">Escolha PIX para uma entrega até 2 dias mais rápida.</p>
                    </div>
                  </div>
                  <div className="text-[#017a54]">
                    <ShieldCheck className="text-[#017a54] animate-pulse" />
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-[#017a54] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#017a54]/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? 'Processando...' : 'Finalizar e Gerar PIX'}
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-lg font-bold mb-6 text-gray-900">Resumo do Pedido</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 border border-gray-100 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qtd: {item.quantity}</p>
                    </div>
                    <div className="text-xs font-bold text-[#017a54]">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-b border-gray-100 mb-6 font-medium text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span className="text-[#017a54] font-bold">GRÁTIS</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="text-3xl font-black text-[#017a54]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <ShieldCheck size={16} className="text-[#017a54]" />
                  <span>Pagamento processado via Paradise PIX</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <MapPin size={16} className="text-[#017a54]" />
                  <span>Entrega em até 3 dias úteis após o pagamento</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
