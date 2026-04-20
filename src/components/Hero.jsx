import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
const desktopBanner = '/assets/hero-banner.webp';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full bg-[#5c0a0a] overflow-hidden">
      <div className="w-full mx-auto relative group cursor-pointer">
        <motion.div 
          style={{ y, opacity }}
          className="relative w-full overflow-hidden"
        >
          {/* Main Banner Desktop & Mobile Responsive */}
          <picture>
            <img 
              src={desktopBanner} 
              alt="Boticário Promoções" 
              className="w-full h-auto object-cover md:object-contain object-center bg-[#5c0a0a]"
              loading="eager"
            />
          </picture>
        </motion.div>
        
        {/* Fake Banner slide dots for UI aesthetic */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          <div className="w-6 h-1 rounded-full bg-white opacity-100"></div>
          <div className="w-6 h-1 rounded-full bg-white opacity-40"></div>
          <div className="w-6 h-1 rounded-full bg-white opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


