import React from 'react';

const bubbles = [
  { name: 'Boti Promo', img: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=150&q=80&fit=crop' },
  { name: 'Lançamentos', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&q=80&fit=crop' },
  { name: 'Presentes', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150&q=80&fit=crop' },
  { name: 'Perfumaria', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=150&q=80&fit=crop' },
  { name: 'Skincare', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=150&q=80&fit=crop' },
  { name: 'Maquiagem', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&q=80&fit=crop' }
];

const CategoryBubbles = () => {
  return (
    <div className="w-full bg-white pt-4 pb-2 border-b border-gray-100 mb-6">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {bubbles.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-[88px] cursor-pointer group snap-center">
              <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#017a54] p-[2px] transition-all">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-50">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
              </div>
              <span className="text-[11px] sm:text-[13px] text-gray-700 font-medium text-center leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBubbles;
