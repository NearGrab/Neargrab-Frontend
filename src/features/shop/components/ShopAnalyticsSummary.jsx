import React from 'react';
import { Eye, Navigation, Users, Package, Star, MessageSquare } from 'lucide-react';

export default function ShopAnalyticsSummary({ shopInfo = {} }) {
  const {
    productCount = 0,
    reviewCount = 0,
    rating = 0,
    followersCount = 0,
    viewCount = 0,
    leadCount = 0,
    stats = {}
  } = shopInfo;

  // Extract from stats if nested
  const finalProducts = stats?.productCount ?? productCount;
  const finalReviews = stats?.reviewCount ?? reviewCount;
  const finalRating = stats?.rating ?? rating;
  const finalFollowers = stats?.followersCount ?? followersCount;
  const finalViews = stats?.viewCount ?? viewCount;
  const finalDirectionClicks = stats?.directionClicks ?? leadCount;

  const metrics = [
    {
      label: 'Products',
      value: finalProducts,
      icon: <Package className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50'
    },
    {
      label: 'Followers',
      value: finalFollowers,
      icon: <Users className="w-4 h-4 text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      label: 'Reviews',
      value: finalReviews,
      icon: <MessageSquare className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50'
    },
    {
      label: 'Avg Rating',
      value: Number(finalRating).toFixed(1),
      icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
      bg: 'bg-amber-50'
    },
    {
      label: 'Profile Views',
      value: finalViews,
      icon: <Eye className="w-4 h-4 text-purple-600" />,
      bg: 'bg-purple-50'
    },
    {
      label: 'Directions',
      value: finalDirectionClicks,
      icon: <Navigation className="w-4 h-4 text-rose-600" />,
      bg: 'bg-rose-50'
    }
  ];

  return (
    <div className="w-full bg-white border border-neutral-200/50 rounded-3xl p-5 shadow-sm text-left font-inter">
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary mb-4">
        Shop Performance
      </h3>
      
      <div className="grid grid-cols-2 gap-3.5">
        {metrics.map((item, index) => (
          <div key={index} className="border border-neutral-100 rounded-2xl p-3 flex flex-col gap-2 transition-all hover:border-neutral-200/60 hover:shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                {item.label}
              </span>
              <div className={`w-7 h-7 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                {item.icon}
              </div>
            </div>
            <span className="font-poppins font-extrabold text-base md:text-lg text-text-primary leading-none">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
