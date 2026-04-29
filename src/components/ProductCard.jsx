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
      className="bg-white rounded-[16px] overflow-hidden flex flex-col items-center h-full transition-all group relative border border-gray-200/60 p-4 gap-4"
    >
      {/* Product Image Section */}
      <div 
        onClick={handleNavigate}
        className="relative w-full aspect-square flex-shrink-0 rounded-lg overflow-hidden bg-[#f9f9f9] cursor-pointer group-hover:bg-[#f0f0f0] transition-colors"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500 p-4"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#e91428] text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-center py-1 w-full">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? "fill-[#017a54] text-[#017a54]" : "text-gray-200"} 
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 ml-1">({product.reviews})</span>
        </div>

        <h3 
          onClick={handleNavigate}
          className="text-gray-900 font-sans font-medium text-[13px] sm:text-[14px] leading-snug mb-3 line-clamp-2 min-h-[40px] cursor-pointer hover:text-[#017a54] transition-colors"
        >
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex flex-col mb-4">
            {product.originalPrice && (
              <span className="text-[12px] text-gray-400 line-through mb-0">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-extrabold text-[#017a54] tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <div className="flex w-full gap-2 mt-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                navigate('/checkout');
              }}
              className="flex-1 bg-[#017a54] text-white py-2.5 rounded-[4px] font-bold text-[11px] uppercase hover:bg-green-800 transition-colors text-center"
            >
              Comprar
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-10 h-10 border border-[#017a54] text-[#017a54] rounded-[4px] hover:bg-[#017a54] hover:text-white transition-all flex items-center justify-center flex-shrink-0"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

