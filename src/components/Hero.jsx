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
      <div className="w-full mx-auto">
        <motion.div 
          style={{ y, opacity }}
          className="relative w-full overflow-hidden"
        >
          {/* Overlay Gradient for Elegance */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#5c0a0a]/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Unified Banner - Responsive h-auto prevents any text cropping on mobile */}
          <img 
            src={desktopBanner} 
            alt="Campanha Boticário Cereja de Fases" 
            className="w-full h-auto object-contain object-center bg-[#5c0a0a]"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Floating Campaign Badge - Optimized for Mobile */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-1 md:bottom-10 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90%]"
      >
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-8 md:py-4 rounded-full shadow-xl border border-white/20 text-center">
          <p className="text-[#017a54] font-serif font-bold tracking-tight md:tracking-[0.2em] text-[7px] md:text-xs uppercase whitespace-nowrap">
            Edição Limitada <span className="hidden md:inline">•</span> <span className="text-[#c9a227]">Cereja de Fases</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;


