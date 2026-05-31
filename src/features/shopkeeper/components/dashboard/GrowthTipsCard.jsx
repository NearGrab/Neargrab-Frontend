import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, RefreshCw, Clock } from 'lucide-react';
import { dashboardMockData } from '../../data/dashboardMockData';

export default function GrowthTipsCard() {
  const { growthTips } = dashboardMockData;

  // Icon Map matching the indicators
  const iconMap = {
    'Add more products': ShoppingBag,
    'Keep stock updated': RefreshCw,
    'Respond faster': Clock
  };

  const colorMap = {
    'Add more products': 'text-emerald-700 bg-emerald-50 border-emerald-100/50',
    'Keep stock updated': 'text-amber-700 bg-amber-50 border-amber-100/50',
    'Respond faster': 'text-blue-700 bg-blue-50 border-blue-100/50'
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Tips to grow your shop
        </h4>
        <Link
          to="/shopkeeper/analytics"
          className="text-[10px] font-bold text-brand-900 hover:text-brand-700 font-poppins transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Tips List */}
      <div className="flex flex-col gap-2.5">
        {growthTips.map((tip) => {
          const IconComponent = iconMap[tip.title] || ShoppingBag;
          const styles = colorMap[tip.title] || 'text-brand-900 bg-brand-50 border-brand-100/50';

          return (
            <div
              key={tip.id}
              className="flex items-center justify-between gap-3 p-2.5 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-150/45 rounded-xl cursor-pointer transition-all duration-300 shadow-3xs group"
            >
              {/* Left icon and description */}
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border ${styles} shadow-3xs`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <span className="text-[11px] font-bold text-text-primary font-poppins block leading-none mb-1 group-hover:text-brand-900 transition-colors">
                    {tip.title}
                  </span>
                  <span className="text-[9px] text-text-muted leading-tight block">
                    {tip.desc}
                  </span>
                </div>
              </div>

              {/* Right Chevron arrow */}
              <ChevronRight className="w-4 h-4 text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5" />

            </div>
          );
        })}
      </div>
    </div>
  );
}
