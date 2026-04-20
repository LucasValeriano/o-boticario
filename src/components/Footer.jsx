import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#fcfaf9] pt-12 pb-6 border-t border-[#f2ebe5]">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#017a54]">O BOTICÁRIO</h2>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              O Boticário é a marca de beleza mais amada do Brasil. Encontre opções incríveis de maquiagem, perfumaria e cuidados com a pele.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#017a54] hover:bg-[#017a54] hover:text-white transition-all shadow-sm">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-sm uppercase">Sobre o Boticário</h4>
            <ul className="space-y-3 text-[13px] text-gray-600">
              {['Quem Somos', 'Nossas Marcas', 'Trabalhe Conosco', 'Sustentabilidade', 'Mapa do Site'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#017a54] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-sm uppercase">Atendimento</h4>
            <ul className="space-y-3 text-[13px] text-gray-600">
              {['Dúvidas Frequentes', 'Fale Conosco', 'Meus Pedidos', 'Trocas e Devoluções', 'Políticas de Privacidade'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#017a54] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-sm uppercase">Pagamento Seguro</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                <img src="/assets/pix-logo.png" alt="PIX" className="h-10 w-auto object-contain mx-auto" />
              </div>
              
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                <ShieldCheck size={16} className="text-[#017a54]" />
                <span>Compra 100% protegida e blindada</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col text-center md:text-left gap-4 text-[10px] text-gray-500 font-medium leading-[1.6]">
          <p>
            BOTICÁRIO PRODUTOS DE BELEZA LTDA. | CNPJ: 11.137.051/0719-54 | Rua das Borges, 1000 - São Paulo, SP - CEP: 05777-001 <br/>
            E-mail: atendimento@boticario.com.br <br/>
            As imagens presentes em nosso site são meramente ilustrativas e suas cores podem sofrer alterações conforme variações de telas. Promocões válidas apenas enquanto durarem os estoques. Preços podem variar.
          </p>
          <p className="mt-2 text-[#017a54]">
            © {new Date().getFullYear()} O Boticário. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
