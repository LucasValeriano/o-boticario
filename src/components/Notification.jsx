import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Notification = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-[200] bg-white border border-gray-100 shadow-2xl px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[320px]"
        >
          <div className="bg-brand-green/10 p-2 rounded-full text-brand-green">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{message}</p>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Adicionado ao seu carrinho</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600 p-1"
          >
            <span className="text-lg">&times;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
