import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function Rating({ rating, count, className = '' }) {
  // Generate star array
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const starsArray = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) return 'full';
    if (i === fullStars && hasHalf) return 'half';
    return 'empty';
  });

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Stars icons */}
      <div className="flex items-center gap-0.5">
        {starsArray.map((type, idx) => {
          if (type === 'full') {
            return <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />;
          }
          if (type === 'half') {
            return <StarHalf key={idx} className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />;
          }
          return <Star key={idx} className="w-4 h-4 text-neutral-300 shrink-0" fill="#E5E7EB" stroke="none" />;
        })}
      </div>
      
      {/* Numeric and Count values */}
      <div className="flex items-center gap-1 text-xs font-semibold">
        <span className="text-text-primary">{rating.toFixed(1)}</span>
        {count !== undefined && (
          <span className="text-text-muted font-normal">({count})</span>
        )}
      </div>
    </div>
  );
}
