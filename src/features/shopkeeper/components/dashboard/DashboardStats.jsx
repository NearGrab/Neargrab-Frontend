import React from 'react';
import { Eye, MapPin, MessageSquare, Users, Star, ArrowUpRight } from 'lucide-react';
import MiniTrendChart from './MiniTrendChart';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function DashboardStats() {
  const { stats } = useShopkeeperDashboardStore();

  // Icon Map matching keys
  const iconMap = {
    views: Eye,
    clicks: MapPin,
    inquiries: MessageSquare,
    followers: Users,
    rating: Star
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {stats.map((card) => {
        // Temporarily disable the entire Inquiries card as requested
        if (card.id === 'inquiries') {
          return null;
        }

        const IconComponent = iconMap[card.id] || Eye;
        const isRatingCard = card.id === 'rating';

        return (
          <div
            key={card.id}
            className="bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs flex flex-col justify-between min-h-[140px] hover:shadow-2xs transition-shadow duration-300 relative text-left"
          >
            {/* Header: Label and Small Circle Icon */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-text-secondary font-poppins truncate">
                {card.label}
              </span>
              <div className="w-7 h-7 bg-neutral-50 rounded-lg flex items-center justify-center text-text-muted shrink-0 border border-neutral-150/40 shadow-3xs">
                <IconComponent className="w-3.5 h-3.5 text-text-muted" />
              </div>
            </div>

            {/* Numeric Large Value */}
            <div className="flex items-baseline gap-1.5 mt-1">
              <h3 className="font-poppins font-bold text-2xl text-text-primary tracking-tight">
                {card.value}
              </h3>
            </div>

            {/* Sub-details (Stars for rating card, Sparklines + Growth tags for standard metrics) */}
            {isRatingCard ? (
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0"
                    />
                  ))}
                </div>
                <span className="text-[9px] text-text-muted font-bold block leading-none">
                  {card.timeframe}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                {/* Growth indicator badge */}
                <div className="flex items-center gap-1.5 text-[9px] font-bold">
                  <span className="text-brand-900 bg-brand-50 border border-brand-100/50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 font-extrabold shrink-0">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                    {card.growth}
                  </span>
                  <span className="text-text-muted truncate">
                    {card.timeframe}
                  </span>
                </div>

                {/* Micro Trend Line Sparkline */}
                {card.trendData && (
                  <div className="w-full">
                    <MiniTrendChart trendData={card.trendData} isPositive={card.isPositive} />
                  </div>
                )}
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}
