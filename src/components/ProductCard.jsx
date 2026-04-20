import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/produto/${product.id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[24px] overflow-hidden border border-gray-100 flex flex-col h-full transition-all hover:shadow-2xl group relative p-5"
    >
      {/* Favorite Heart */}
      <button 
        className="absolute top-6 right-6 z-10 p-2.5 bg-white/95 backdrop-blur-md rounded-full text-gray-300 hover:text-red-500 transition-all shadow-sm border border-gray-50 active:scale-90"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart size={16} strokeWidth={2.5} />
      </button>

      {/* Product Image Section */}
      <div 
        onClick={handleNavigate}
        className="relative aspect-square w-full mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 cursor-pointer"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out px-4 py-4"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-brand-green text-white text-[9px] font-black px-3 py-1.5 rounded shadow-lg uppercase tracking-[0.15em] z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-left">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={11} 
                className={i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-200"} 
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-bold tracking-tight">({product.reviews})</span>
        </div>

        <h3 
          onClick={handleNavigate}
          className="text-[#1a1a1a] font-serif font-bold text-[15px] leading-[1.3] mb-4 line-clamp-2 min-h-[40px] cursor-pointer hover:text-brand-green transition-colors px-1"
        >
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-auto pt-2 px-1">
          <div className="flex flex-col mb-5">
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through mb-0.5 font-medium">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-brand-green tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.1em]">no pix</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                navigate('/checkout');
              }}
              className="w-full bg-[#017a54] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.25em] hover:brightness-110 active:scale-[0.97] transition-all shadow-md shadow-[#017a54]/20 flex items-center justify-center gap-2"
            >
              Comprar Agora
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full bg-[#f0f9f6] text-[#017a54] border border-[#017a54]/20 py-2.5 rounded-xl font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-[#e2f3ec] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={12} />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

