import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="bg-brand-teal py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-brand-green mb-4">
              Novidades e <span className="text-brand-gold">Preços Reais</span>
            </h3>
            <p className="text-gray-500 text-lg">
              Inscreva-se para receber promoções exclusivas e lançamentos da linha Cereja de Fases.
            </p>
          </div>

          <form className="w-full lg:w-1/2 max-w-md z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-brand-gold/30 outline-none transition-all"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              </div>
              <button 
                type="submit"
                className="bg-brand-gold text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-brand-gold/30 active:scale-95 transition-all"
              >
                Cadastrar
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-4 text-center lg:text-left leading-relaxed">
              Ao se cadastrar, você concorda com nossa Política de Privacidade.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
