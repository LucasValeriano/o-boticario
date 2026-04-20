import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-green">oBoticário</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Há mais de 40 anos entregando beleza e autocuidado. Nossos produtos são feitos com amor e respeito ao meio ambiente.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6">Institucional</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {['Sobre o Boticário', 'Portal de Privacidade', 'Termos de Uso', 'Trabalhe Conosco'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-green transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6">Ajuda & Suporte</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {['Minha Conta', 'Rastrear Pedido', 'Trocas e Devoluções', 'Central de Atendimento'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-green transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6">Formas de Pagamento</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                <img src="/assets/pix-logo.png" alt="PIX" className="h-16 w-auto object-contain drop-shadow-md" />
                <div>
                   <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">PIX</p>
                   <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Aprovação Imediata</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                <ShieldCheck size={14} className="text-brand-green" />
                <span>Pagamento 100% Seguro</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-medium">
          <p>© 2026 BOTICÁRIO. TODOS OS DIREITOS RESERVADOS.</p>
          <p>PRODUTOS DESTINADOS AO CONSUMO FINAL. É PROIBIDA A REVENDA.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
