import React from 'react';
import { Search, User, Heart, ShoppingBag, Menu, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const categories = [
  'Presentes',
  'Perfumaria',
  'Maquiagem',
  'Cabelos',
  'Corpo e Banho',
  'Skincare',
  'Marcas',
  'Promoção'
];

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#017a54] text-white text-[11px] sm:text-[13px] py-1.5 text-center font-medium tracking-wide">
        Fique Linda, Fique Cheirosa ✨ <span className="font-bold underline cursor-pointer">Aproveite as Ofertas de Fases!</span>
      </div>

      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-6">
          
          {/* Logo & Hamburger (Mobile order) */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-gray-700">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <h1 className="text-[18px] sm:text-[22px] font-serif font-bold text-[#017a54] tracking-[0.08em] whitespace-nowrap">
                O BOTICÁRIO
              </h1>
            </Link>
          </div>

          {/* SearchBar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative group">
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="w-full bg-[#f4f4f4] border border-transparent rounded-[4px] py-[10px] pl-4 pr-12 text-[14px] focus:bg-white focus:border-[#017a54] transition-all outline-none placeholder:text-gray-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#017a54]" size={20} />
          </div>

          {/* Icons & Location */}
          <div className="flex items-center gap-4 sm:gap-6 text-gray-600">
            <div className="hidden xl:flex items-center gap-2 cursor-pointer hover:text-[#017a54] text-xs">
              <MapPin size={20} />
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px]">Olá, visitante!</span>
                <span className="font-semibold text-gray-700">Informe seu CEP</span>
              </div>
            </div>

            <button className="hidden sm:flex flex-col items-center gap-1 hover:text-[#017a54] transition-colors">
              <User size={22} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:flex flex-col items-center gap-1 hover:text-[#017a54] transition-colors">
              <Heart size={22} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 hover:text-[#017a54] transition-colors"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#017a54] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile SearchBar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full bg-[#f4f4f4] border border-transparent rounded-[4px] py-2.5 pl-4 pr-10 text-[13px] outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>
      </div>

      {/* Mega Menu Navigation (Scrollable on small screens) */}
      <div className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="container max-w-7xl mx-auto px-8">
          <ul className="flex items-center justify-between py-3">
            {categories.map((cat, i) => (
              <li key={i}>
                <a href="#" className={`text-[13px] tracking-wide font-medium hover:text-[#017a54] hover:underline underline-offset-4 ${cat === 'Promoção' ? 'text-red-600' : 'text-gray-700'}`}>
                  {cat.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
