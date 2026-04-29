import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="animate-fade-in bg-white">
      <Hero />
      <ProductGrid />
      <Newsletter />
    </div>
  );
};

export default Home;
