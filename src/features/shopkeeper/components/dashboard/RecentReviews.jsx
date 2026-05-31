import React from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../../../../shared/components/ReviewCard';
import { dashboardMockData } from '../../data/dashboardMockData';

export default function RecentReviews() {
  const { reviews } = dashboardMockData;

  return (
    <div className="w-full text-left font-inter flex flex-col justify-between h-full bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-1">
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Recent Reviews
        </h3>
        <Link
          to="/shopkeeper/reviews"
          className="text-[11px] font-bold text-brand-900 hover:text-brand-700 font-poppins transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Review Card List */}
      <div className="flex flex-col gap-3 flex-grow">
        {reviews.map((rev) => (
          <ReviewCard
            key={rev.id}
            avatar={rev.authorAvatar}
            user={rev.authorName}
            time={rev.date}
            rating={rev.rating}
            comment={rev.text}
            verifiedPurchase={rev.isVerified}
          />
        ))}
      </div>
    </div>
  );
}
