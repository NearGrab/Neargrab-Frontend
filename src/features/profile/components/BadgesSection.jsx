import React from 'react';
import { Award, Compass, Heart, Star, Sparkles } from 'lucide-react';

export default function BadgesSection({ badges }) {
  // Helper to map badge icons dynamically with high-fidelity SVGs
  const getBadgeIcon = (name, type) => {
    const iconClass = `w-7 h-7 ${
      type === 'brand' ? 'text-emerald-700' : 'text-amber-700'
    }`;

    switch (name) {
      case 'Local Explorer':
        return <Compass className={iconClass} />;
      case 'Review Star':
        return <Star className={iconClass} fill="currentColor" />;
      case 'Helpful Human':
        return <Heart className={iconClass} fill="currentColor" />;
      case 'Early Supporter':
        return <Sparkles className={iconClass} fill="currentColor" />;
      default:
        return <Award className={iconClass} />;
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 md:p-6 text-left mb-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-5">
        <h3 className="font-poppins font-bold text-base md:text-lg text-text-primary">
          Your Badges
        </h3>
        <button className="text-xs font-bold text-brand-500 hover:underline cursor-pointer">
          View all
        </button>
      </div>

      {/* Grid containing achievement badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center justify-center p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/30 hover:border-brand-500/25 hover:bg-brand-50/15 transition-all duration-300 group cursor-pointer text-center"
          >
            {/* Circular badge container */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-sm border group-hover:scale-105 transition-transform duration-300 relative ${
              badge.type === 'brand'
                ? 'bg-emerald-50 border-emerald-100/50'
                : 'bg-amber-50 border-amber-100/50'
            }`}>
              {getBadgeIcon(badge.name, badge.type)}
              
              {/* Star accent bubble */}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white border border-neutral-200/50 rounded-full flex items-center justify-center shadow-sm text-[9px] font-extrabold text-text-primary">
                L{badge.level}
              </div>
            </div>

            <span className="block font-poppins font-bold text-text-primary text-xs leading-none mb-1 group-hover:text-brand-900 transition-colors">
              {badge.name}
            </span>
            <span className="text-[10px] text-text-secondary font-medium">
              Level {badge.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
