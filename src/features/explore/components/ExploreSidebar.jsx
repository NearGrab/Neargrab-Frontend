import React from 'react';
import { ShoppingCart, ArrowRight, Store, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../../../shared/components/ReviewCard';

export default function ExploreSidebar({ offers, listShop, reviews }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* 1. TOP OFFERS NEAR YOU */}
      <div className="bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-bold text-text-primary text-sm tracking-wide">
            Top Offers Near You
          </h3>
          <button className="text-[10px] font-bold text-brand-500 hover:text-brand-700 hover:underline transition-all cursor-pointer">
            View all
          </button>
        </div>

        {/* Stack of offer items */}
        <div className="flex flex-col gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-neutral-50 transition-colors duration-200 cursor-pointer group"
            >
              {/* Product Thumbnail with float orange discount badge */}
              <div className="relative w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center shrink-0 p-1 border border-neutral-100">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute -top-1.5 -left-1.5 bg-[#F59E0B] text-white text-[8px] font-bold px-1 py-0.5 rounded-md shadow-sm">
                  {offer.discount}
                </span>
              </div>

              {/* Offer details */}
              <div className="flex-grow text-left leading-tight min-w-0">
                <h4 className="font-bold text-text-primary text-[11px] truncate group-hover:text-brand-900 transition-colors">
                  {offer.name}
                </h4>
                
                {/* Pricing section */}
                <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                  <span className="text-xs font-extrabold text-[#F59E0B]">₹{offer.price}</span>
                  <span className="text-[10px] text-text-muted line-through font-normal">₹{offer.originalPrice}</span>
                </div>

                {/* Store and distance */}
                <div className="flex items-center gap-1 text-[9px] text-text-secondary truncate">
                  <span className="font-medium">{offer.store}</span>
                  <span className="text-text-muted">•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-text-muted" />
                    {offer.distance} km
                  </span>
                </div>
              </div>

              {/* Shopping cart quick add button */}
              <button
                className="w-8 h-8 rounded-lg bg-[#E6F4EA] hover:bg-brand-500 hover:text-white text-[#10B981] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all"
                aria-label="Add offer to cart"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. LIST YOUR SHOP ON NEARGRAB CTA */}
      <div className="bg-[#0B3B2C] text-white p-5 rounded-3xl relative overflow-hidden shadow-md border border-brand-800 flex flex-col justify-between min-h-[11rem] md:min-h-[12rem]">
        {/* Subtle decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-500/20 blur-2xl rounded-full pointer-events-none"></div>
        <div className="absolute left-0 top-0 w-24 h-24 bg-accent-500/5 blur-xl rounded-full pointer-events-none"></div>

        <div>
          {/* Headline */}
          <h3 className="font-poppins font-bold text-sm md:text-base mb-1 text-white leading-tight">
            {listShop.heading}
          </h3>
          {/* Description */}
          <p className="text-brand-100 text-[10px] md:text-xs leading-relaxed mb-4 font-inter">
            {listShop.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2 mt-auto">
          {/* Pill Button */}
          <button className="bg-white text-[#0B3B2C] px-4 py-2 rounded-full font-bold text-[10px] flex items-center gap-1.5 hover:bg-brand-50 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap">
            <span>{listShop.buttonText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          
          {/* Store Graphic Icon */}
          <div className="w-14 h-14 shrink-0">
            <svg className="w-full h-full text-brand-500/30" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="24" width="48" height="32" rx="4" fill="currentColor" opacity="0.2" />
              <path d="M4 24L32 8L60 24H4Z" fill="#F59E0B" />
              <rect x="24" y="38" width="16" height="18" fill="#0B3B2C" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. REAL REVIEWS FROM REAL NEIGHBORS */}
      <div className="bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-bold text-text-primary text-sm tracking-wide">
            Real Reviews from Real Neighbors
          </h3>
          <button className="text-[10px] font-bold text-brand-500 hover:text-brand-700 hover:underline transition-all cursor-pointer">
            View all
          </button>
        </div>

        {/* Stack of user reviews */}
        <div className="flex flex-col gap-4">
          {reviews.map((rev) => (
            <ReviewCard
              key={rev.id}
              avatar={rev.avatar}
              user={rev.user}
              time={rev.time}
              rating={rev.rating}
              comment={rev.comment}
              storeName={rev.storeName}
              showStoreLink={true}
              onClickStore={() => {
                if (rev.shopId) {
                  navigate(`/shops/${rev.shopId}`);
                } else {
                  alert(`Redirecting to shop profile for ${rev.storeName}!`);
                }
              }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
