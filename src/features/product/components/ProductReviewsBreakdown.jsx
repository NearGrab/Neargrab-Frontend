import React from 'react';
import { Star } from 'lucide-react';

export default function ProductReviewsBreakdown({ rating = 0, reviewsCount = 0, storeName = 'Local Store', reviewSummary }) {
  const breakdown = reviewSummary?.breakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const total = reviewsCount || reviewSummary?.count || 0;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = breakdown[stars] || 0;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return { stars, count, percent };
  });

  return (
    <div className="w-full bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-4">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="leading-tight">
          <h3 className="font-poppins font-extrabold text-text-primary text-sm sm:text-base">
            Reviews for this product
          </h3>
          <span className="text-[10px] text-text-muted font-bold font-inter">
            From {storeName} <span className="text-brand-900 font-extrabold font-poppins text-xs ml-0.5">✓</span>
          </span>
        </div>
        <span className="text-[11px] font-bold text-text-secondary bg-neutral-100 px-2 py-0.5 rounded-md font-inter">
          {reviewsCount} reviews
        </span>
      </div>

      {/* Ratings stats comparative grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center py-1">
        {/* Left Column: Big Average */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center border-r border-neutral-100/90 pr-0 sm:pr-4 py-2">
          <span className="font-poppins font-extrabold text-4xl sm:text-5xl text-text-primary leading-none">
            {rating}
          </span>
          
          {/* Gold Stars */}
          <div className="flex items-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star 
                key={idx} 
                className={`w-4.5 h-4.5 fill-amber-500 text-amber-500 shrink-0`} 
              />
            ))}
          </div>
          
          <span className="text-[10px] text-text-muted font-bold font-inter mt-1">
            {reviewsCount} reviews
          </span>
        </div>

        {/* Right Column: Star Horizontal Bars Breakdown */}
        <div className="sm:col-span-7 flex flex-col gap-1.5 w-full">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2.5 text-[10px] font-bold text-text-secondary font-inter">
              {/* Star Label */}
              <span className="w-3 text-right">{item.stars}</span>
              <Star className="w-3.5 h-3.5 fill-neutral-300 text-neutral-300 shrink-0" />
              
              {/* Progress bar container */}
              <div className="flex-grow h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-800 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
              
              {/* Review absolute count */}
              <span className="w-6 text-right text-text-muted font-semibold">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
