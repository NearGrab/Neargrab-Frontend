import React from 'react';
import { Star, Store, Check } from 'lucide-react';

export default function ReviewCard({
  avatar,
  user,
  time,
  rating,
  comment,
  verifiedPurchase = false,
  storeName,
  showStoreLink = false,
  onClickStore,
  className = ''
}) {
  return (
    <div className={`p-3.5 bg-neutral-50 rounded-2xl flex flex-col gap-2.5 text-left border border-neutral-100 hover:border-neutral-200/60 hover:bg-neutral-50/50 transition-all duration-300 ${className}`}>
      
      {/* Row 1: User Identity Details */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <img
            src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
            alt={user}
            className="w-8 h-8 rounded-full object-cover border border-neutral-200/80 shadow-sm shrink-0"
          />
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-text-primary text-xs tracking-tight">{user}</h4>
              
              {/* Verified Purchase Badge */}
              {verifiedPurchase && (
                <span className="flex items-center gap-0.5 bg-[#E6F4EA] text-[#0B3B2C] text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border border-[#12634B]/10 select-none">
                  <Check className="w-2 h-2 text-[#0B3B2C]" strokeWidth={3} />
                  <span>Verified Purchase</span>
                </span>
              )}
            </div>
            <span className="text-[9px] text-text-muted font-medium">{time}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Star Rating Icons */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className={`w-3.5 h-3.5 shrink-0 ${
              idx < Math.floor(rating)
                ? 'text-amber-500 fill-amber-500'
                : 'text-neutral-200'
            }`}
          />
        ))}
      </div>

      {/* Row 3: Comment Text Snippet */}
      <p className="text-text-secondary text-[11px] leading-relaxed font-inter italic">
        "{comment}"
      </p>

      {/* Row 4: Direct Hyperlink back to Physical Store */}
      {showStoreLink && storeName && (
        <div 
          onClick={onClickStore}
          className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer transition-colors duration-200"
        >
          <Store className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span>{storeName}</span>
        </div>
      )}
    </div>
  );
}
