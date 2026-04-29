import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';

const ProductGrid = () => {
  return (
    <section className="container max-w-7xl mx-auto px-0 lg:px-8 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
        <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
          Recomendado para você
        </h2>
        <a href="#" className="hidden sm:block text-[#017a54] font-medium text-[13px] hover:underline underline-offset-4">
          Ver todos
        </a>
      </div>

      {/* Vertical list layout */}
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-0 pb-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
