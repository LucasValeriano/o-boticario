import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const FREE_SHIPPING_THRESHOLD = 199.00;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer (Sheet) */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-[#017a54]" />
                <h2 className="text-lg font-bold text-gray-900">Sua Sacola</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-1.5 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            <div className="px-6 py-5 bg-white border-b border-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={18} className={progress >= 100 ? "text-[#017a54]" : "text-gray-400"} />
                <span className="text-xs font-bold text-gray-700">
                  {progress >= 100 
                    ? "Parabéns! Você ganhou Frete Grátis 🚚" 
                    : `Faltam R$ ${remaining.toFixed(2).replace('.', ',')} para Frete Grátis`
                  }
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#017a54] transition-all duration-500"
                />
              </div>
            </div>

            {/* List of Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <ShoppingBag size={64} className="mb-4 text-gray-200" />
                  <p className="text-sm font-medium">Sua sacola está vazia.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                        {item.name}
                      </h4>
                      <div className="text-sm font-black text-[#017a54] mb-3">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-2 hover:bg-white text-gray-500"><Minus size={10} /></button>
                          <span className="text-[10px] w-6 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-2 hover:bg-white text-gray-500"><Plus size={10} /></button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Total</span>
                  <span className="text-2xl font-black text-[#017a54]">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#017a54] text-white py-4 rounded-xl font-bold uppercase tracking-[0.1em] text-[11px] shadow-lg shadow-[#017a54]/20 active:scale-95 transition-all outline-none"
                >
                  Fechar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
