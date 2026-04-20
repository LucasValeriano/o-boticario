import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Produto não encontrado.</p>
        <button 
          onClick={() => navigate('/')}
          className="text-[#017a54] font-bold underline"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#017a54] transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar para a home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Column 1: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-[#f9f9f9] rounded-2xl overflow-hidden flex items-center justify-center p-8"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-[#017a54] text-white text-[11px] font-extrabold px-3 py-1 rounded shadow-md uppercase tracking-widest">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Column 2: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Header Info */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? "fill-[#c9a227] text-[#c9a227]" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">({product.reviews} avaliações)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            <div className="h-px w-full bg-gray-100 mb-6" />

            {/* Pricing */}
            <div className="mb-8 font-sans">
              {product.originalPrice && (
                <span className="block text-sm text-gray-400 line-through mb-1">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#017a54]">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="bg-[#017a54]/10 text-[#017a54] text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">no PIX</span>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-medium italic">Preço exclusivo para pagamento via PIX com aprovação imediata.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => {
                  addToCart(product);
                  navigate('/checkout');
                }}
                className="flex-grow bg-[#017a54] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-[#017a54]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Comprar Agora
              </button>
              <button 
                onClick={() => addToCart(product)}
                className="flex-grow sm:flex-grow-0 sm:w-1/3 bg-[#f0f9f6] text-[#017a54] border border-[#017a54]/20 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#e2f3ec] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <ShoppingBag size={20} />
                Adicionar
              </button>
            </div>

            {/* Benefits Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-gray-50 rounded-2xl">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-[#017a54]" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Frete Grátis</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-[#017a54]" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">100% Seguro</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw size={20} className="text-[#017a54]" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Troca Fácil</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Descrição</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A linha Cuide-se Bem Cereja de Fases traz o equilíbrio perfeito entre hidratação profunda e uma fragrância envolvente. 
                Sua fórmula exclusiva possui ingredientes que respeitam o PH da pele, deixando-a macia, iluminada e perfumada por muito mais tempo.
                Ideal para todos os tipos de pele e para momentos de autocuidado que você merece.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
