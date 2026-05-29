import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../../store/useCartStore';

export default function ProductImages({ images = [], productName = 'Product Image', discount }) {
  const { addItem } = useCartStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeIndex] || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Primary Display Viewport Card */}
      <div className="w-full aspect-square bg-white relative flex items-center justify-center select-none">
        
        {/* Discount Pill Badge - Top Left */}
        {discount && (
          <span className="absolute top-0 left-0 bg-[#12634B] text-white text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-lg shadow-sm z-10 select-none uppercase tracking-wide">
            {discount}
          </span>
        )}

        {/* Wishlist Heart Button - Top Right */}
        <button
          onClick={() => {
            setIsWishlisted(!isWishlisted);
            if (!isWishlisted) {
              alert(`"${productName}" added to wishlist!`);
            }
          }}
          className="absolute top-0 right-0 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/60 flex items-center justify-center text-text-secondary hover:text-red-500 hover:scale-105 active:scale-95 transition-all shadow-sm z-10 cursor-pointer"
          aria-label="Toggle wishlist"
        >
          <Heart 
            className={`w-4.5 h-4.5 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-text-secondary'
            }`} 
          />
        </button>

        {/* Main Render Image */}
        <div className="w-full h-full flex items-center justify-center p-2">
          <img
            src={currentImage}
            alt={`${productName} - Angle ${activeIndex + 1}`}
            className="max-h-full max-w-full object-contain transition-all duration-300 transform"
          />
        </div>
      </div>

      {/* Thumbnail Carousel strip with scroll navigations */}
      <div className="flex items-center gap-2 px-1">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-text-secondary cursor-pointer shrink-0 transition-colors shadow-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 text-text-secondary" />
        </button>

        {/* Thumbnails Row */}
        <div className="flex-grow flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border flex items-center justify-center p-1 cursor-pointer shrink-0 hover:shadow-sm transition-all duration-200 ${
                idx === activeIndex
                  ? 'border-brand-900 ring-2 ring-brand-100/50 scale-102'
                  : 'border-neutral-200/80 hover:border-neutral-300'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-text-secondary cursor-pointer shrink-0 transition-colors shadow-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
