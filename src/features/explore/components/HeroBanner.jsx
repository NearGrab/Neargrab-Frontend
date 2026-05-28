import React, { useState } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

export default function HeroBanner({ banner }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  return (
    <div className="w-full">
      {/* Banner Container */}
      <div className="bg-[#E6F4EA]/60 rounded-none md:rounded-[2rem] px-4 py-4 md:py-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative overflow-hidden border border-brand-100/30 shadow-sm">
        
        {/* Subtle Decorative elements */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Left Side: Promo Copy */}
        <div className="relative z-10 max-w-xl text-left flex-1">
          {/* Badge Tagline */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 md:px-3 md:py-1 bg-white border border-brand-100 rounded-full shadow-sm shadow-brand-900/5 mb-2 md:mb-4 active:scale-95 cursor-pointer hover:border-brand-300 transition-colors">
            <Leaf className="w-3 h-3 text-emerald-600 fill-emerald-100" />
            <span className="text-[9px] font-bold text-brand-900 tracking-wide uppercase">
              {banner.tagline}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-lg sm:text-xl md:text-3.5xl font-poppins font-bold text-brand-900 leading-tight mb-1.5 md:mb-3">
            {banner.headingLine1} <br className="hidden sm:inline" />
            <span className="text-[#D97706]">{banner.headingLine2}</span>
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-[10px] md:text-sm mb-3 md:mb-5 max-w-md leading-relaxed font-inter">
            {banner.description}
          </p>

          {/* CTA Explore Button */}
          <button className="bg-brand-900 text-white px-5 py-2 rounded-full font-bold text-[10px] md:text-xs flex items-center gap-1.5 hover:bg-brand-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer shadow-lg shadow-brand-900/10">
            <span>{banner.buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Right Side: Generated Store Storefront vector graphics */}
        <div className="relative z-10 w-full max-w-xs md:w-1/2 flex justify-center shrink-0">
          <img
            src={banner.image}
            alt="Shop Local Concept"
            className="w-full max-h-20 sm:max-h-32 md:max-h-52 object-contain hover:scale-102 transition-transform duration-500 pointer-events-none drop-shadow-md"
          />
        </div>

      </div>

      {/* Slide Navigation Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              activeSlide === idx
                ? 'w-6 bg-brand-900'
                : 'w-2 bg-neutral-300 hover:bg-neutral-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
