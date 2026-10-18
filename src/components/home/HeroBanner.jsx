import React, { useState, useEffect } from 'react';
import { PROMO_SLIDES } from '../../data/mockData';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = PROMO_SLIDES[currentSlide];

  return (
    <div className="relative w-full aspect-[16/9] max-h-56 overflow-hidden bg-slate-900 select-none group">
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover opacity-85 transition-opacity duration-700 transform group-hover:scale-105 transition-transform ease-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="absolute bottom-4 left-4 right-20 z-10">
        <h2 className="font-script text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-md leading-tight text-shadow">
          {slide.title}
        </h2>
        <p className="text-white/90 text-xs md:text-sm font-medium tracking-normal mt-0.5 drop-shadow-xs">
          {slide.subtitle}
        </p>
      </div>

      <div className="absolute bottom-3.5 right-4 z-10 flex items-center gap-1.5 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
        {PROMO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === idx
                ? 'w-4 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
