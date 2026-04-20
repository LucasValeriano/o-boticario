import React from 'react';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      {/* Banner de Frete Grátis */}
      <div className="bg-[#017a54] text-white text-[10px] sm:text-xs py-2 text-center font-bold tracking-[0.1em] uppercase">
        Frete Grátis nas compras acima de R$ 199
      </div>

      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo - Link para Home */}
          <Link to="/" className="flex items-center flex-1 lg:flex-none hover:opacity-80 transition-opacity">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#017a54] tracking-[0.1em] uppercase whitespace-nowrap">
              O BOTICÁRIO
            </h1>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden lg:flex items-center flex-grow max-w-md relative">
            <input
              type="text"
              placeholder="O que você procura hoje?"
              className="w-full bg-[#f1f1f1] border-none rounded-full py-2.5 px-12 text-sm focus:ring-1 focus:ring-[#017a54]/30 transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end flex-1 gap-3 sm:gap-6 text-[#017a54]">
            <button className="hidden sm:block hover:opacity-70 transition-opacity">
              <User size={22} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block hover:opacity-70 transition-opacity">
              <Heart size={22} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:opacity-70 transition-opacity p-1 flex items-center"
              aria-label="Carrinho"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c9a227] text-white text-[9px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center border-2 border-white px-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="lg:hidden ml-2">
              <Menu size={24} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Encontre o presente ideal"
            className="w-full bg-[#f1f1f1] border-none rounded-full py-2.5 px-11 text-[13px] outline-none placeholder:text-gray-400 placeholder:font-medium"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
