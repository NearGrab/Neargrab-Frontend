import React, { useState } from 'react';
import { Heart, Star, MapPin, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../store/useCartStore';

export default function ProductCard({ product, compact = false }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Helper format price
  const formatPrice = (p) => `₹${p}`;

  const handleViewStore = () => {
    // Navigate to shop details page or trigger standard interactive preview
    navigate(`/shop/${product.id.includes('fortune') ? 'store-patel' : product.id.includes('saffola') ? 'store-jain' : 'store-shree-prov'}`);
  };

  const handleCardClick = () => {
    // Navigate to product detailed page
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="w-full bg-white border border-neutral-100/90 rounded-2xl p-2.5 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative select-none text-left cursor-pointer"
    >
      
      {/* Discount Pill Badge - Top Left */}
      {product.discount && (
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#E6F4EA] text-[#0B3B2C] text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md border border-[#12634B]/10 z-10">
          {product.discount}
        </span>
      )}

      {/* Wishlist Heart Toggle - Top Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
          if (!isWishlisted) {
            addItem(product, 1); // Mock addition to cart as an extra surprise for high fidelity!
            alert(`"${product.name}" added to shopping cart!`);
          }
        }}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-100 flex items-center justify-center text-text-muted hover:text-red-500 hover:scale-105 active:scale-95 transition-all shadow-sm z-10 cursor-pointer"
      >
        <Heart 
          className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-text-secondary'
          }`} 
        />
      </button>

      {/* Product Image Section - bg-white & object-contain p-2 prevents bottle cropping */}
      <div className="w-full aspect-square rounded-xl bg-white overflow-hidden mb-2 sm:mb-3 flex items-center justify-center relative border border-neutral-50/50 p-2 sm:p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-50 text-red-700 border border-red-200/50 text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information details */}
      <div className="flex-grow flex flex-col justify-between">
        {/* Title */}
        <h4 className="font-inter font-bold text-xs sm:text-sm text-text-primary line-clamp-2 leading-snug group-hover:text-brand-900 transition-colors mb-1 min-h-[2rem] sm:min-h-[2.5rem]">
          {product.name}
        </h4>

        {compact ? (
          <div className="flex items-end justify-between mt-1">
            <div className="flex flex-col text-left gap-0.5">
              {/* Pricing tag */}
              <div className="flex items-baseline gap-1">
                <span className="font-poppins font-bold text-xs sm:text-sm text-orange-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-poppins text-[9px] sm:text-[10px] text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-amber-500">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                <span className="text-text-primary">{product.rating}</span>
                <span className="text-text-muted font-normal">({product.reviewsCount})</span>
              </div>
            </div>
            
            {/* Compact Green plus button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product, 1);
                alert(`"${product.name}" added to shopping cart!`);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B3B2C] hover:bg-brand-800 text-white flex items-center justify-center font-bold text-sm sm:text-base transition-colors shadow-sm cursor-pointer hover:scale-102 active:scale-95 shrink-0"
              aria-label="Add to cart"
            >
              +
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Subtitle / Spec tags */}
            <span className="text-[9px] sm:text-xs text-text-muted font-medium mb-2 sm:mb-3">
              {product.size} • {product.category}
            </span>

            {/* Pricing tag - text-orange-600 matches Neargrab styles */}
            <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="font-poppins font-bold text-sm sm:text-base text-orange-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-poppins text-[10px] sm:text-xs text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full border-t border-neutral-100 my-2 sm:my-2.5"></div>

            {/* Store attribution block */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-md bg-neutral-50 flex items-center justify-center shrink-0 border border-neutral-100">
                <Store className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-900" />
              </div>
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold text-text-primary truncate">
                  {product.store}
                </span>
                {product.verified && (
                  <span className="w-3.5 h-3.5 bg-brand-900 text-white rounded-full flex items-center justify-center shrink-0" style={{ transform: 'scale(0.75)' }}>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Ratings, distance stats */}
            <div className="flex items-center justify-between text-[9px] sm:text-xs font-semibold text-text-secondary mb-3 sm:mb-4">
              <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                <span className="text-text-primary">{product.rating}</span>
                <span className="text-text-muted">({product.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-0.5 text-text-secondary">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-text-muted" />
                <span>{product.distance} km</span>
              </div>
            </div>

            {/* Primary outlined visual Action Button matches mockup exactly */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewStore();
              }}
              className="w-full py-1.5 sm:py-2 border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-text-secondary hover:text-text-primary font-poppins font-bold text-[10px] sm:text-xs rounded-full transition-all cursor-pointer text-center"
            >
              View store
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
