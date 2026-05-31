import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '../../../shared/components/ReviewCard';

export default function ShopReviewsManager({ reviews = [] }) {
  const [filter, setFilter] = useState('Newest');

  // Recalculate average and breakdown of scores
  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return { avg: 0.0, total: 0, breakdown: [0, 0, 0, 0, 0] };
    }

    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(1);

    // Count of each score level
    const counts = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5
    reviews.forEach((r) => {
      const idx = Math.min(Math.max(1, r.rating), 5) - 1;
      counts[idx]++;
    });

    return {
      avg,
      total,
      breakdown: counts.reverse() // returns counts for 5, 4, 3, 2, 1 stars
    };
  }, [reviews]);

  // Apply visual sorting dropdown selections
  const sortedReviews = useMemo(() => {
    let list = [...reviews];
    if (filter === 'Highest Rating') {
      list = list.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'Lowest Rating') {
      list = list.sort((a, b) => a.rating - b.rating);
    } else {
      // Newest
      // Mock relative sorts
    }
    return list;
  }, [reviews, filter]);

  return (
    <div className="w-full text-left font-inter flex flex-col gap-6 bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs">
      
      {/* 1. Header & Quick stats */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100/60 select-none">
        <div>
          <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
            What Customers Say
          </h3>
          <span className="text-[10px] text-text-muted">
            Based on {stats.total} total reviews
          </span>
        </div>

        {/* Sort Select */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none text-xs font-bold bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-3 pr-8 py-2 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all shadow-3xs cursor-pointer"
          >
            <option value="Newest">Newest</option>
            <option value="Highest Rating">Highest Rating</option>
            <option value="Lowest Rating">Lowest Rating</option>
          </select>
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted text-[8px]">
            ▼
          </div>
        </div>
      </div>

      {/* 2. Visual Ratings Breakdown split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Left score block */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100 select-none">
          <span className="font-poppins font-extrabold text-3xl md:text-4xl text-text-primary">
            {stats.avg}
          </span>
          {/* Star icons */}
          <div className="flex items-center gap-0.5 mt-1.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 shrink-0 ${
                  idx < Math.floor(stats.avg)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-neutral-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-text-muted font-bold mt-2">
            Average Store Rating
          </span>
        </div>

        {/* Right progress bars list */}
        <div className="md:col-span-8 flex flex-col gap-1.5 select-none">
          {stats.breakdown.map((count, index) => {
            const starNum = 5 - index;
            const percent = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={starNum} className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                <span className="w-2.5">{starNum}</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                
                {/* Gray progress outline container */}
                <div className="flex-grow h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200/30">
                  <div
                    className="h-full bg-brand-900 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                
                {/* Count text */}
                <span className="w-8 text-right text-text-muted">{count}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. Detailed customer reviews list */}
      <div className="flex flex-col gap-3">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((rev) => (
            <ReviewCard
              key={rev.id}
              avatar={rev.avatar}
              user={rev.reviewerName}
              time={rev.dateRelative}
              rating={rev.rating}
              comment={rev.comment}
              verifiedPurchase={rev.isVerified}
            />
          ))
        ) : (
          <div className="text-center py-6 text-text-muted font-bold text-xs select-none">
            💬 No reviews have been posted yet.
          </div>
        )}
      </div>

    </div>
  );
}
