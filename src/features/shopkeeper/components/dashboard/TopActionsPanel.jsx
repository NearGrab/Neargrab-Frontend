import React from 'react';
import { ShoppingBag, MessageSquare, Phone, Bookmark, ArrowUpRight } from 'lucide-react';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function TopActionsPanel() {
  const { topActions } = useShopkeeperDashboardStore();

  // Icon Map matching the indicators
  const iconMap = {
    'Product Views': ShoppingBag,
    'Saved by Users': Bookmark
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs flex flex-col justify-between text-left h-full">
      {/* Title */}
      <div className="mb-4 pb-1">
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Top Actions
        </h3>
      </div>

      {/* Actions List Grid */}
      <div className="flex flex-col gap-3.5 flex-grow justify-between">
        {topActions.map((action) => {
          const IconComponent = iconMap[action.label] || ShoppingBag;

          return (
            <div
              key={action.label}
              className="flex items-center justify-between gap-4 p-3 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-150/40 rounded-xl transition-all duration-300 shadow-3xs"
            >
              {/* Left visual icon and label */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8.5 h-8.5 bg-white border border-neutral-150/50 rounded-xl flex items-center justify-center text-text-muted shrink-0 shadow-3xs">
                  <IconComponent className="w-4.5 h-4.5 text-brand-900" />
                </div>
                <span className="text-[11px] font-bold text-text-secondary font-poppins truncate">
                  {action.label}
                </span>
              </div>

              {/* Right metrics value and growth */}
              <div className="text-right shrink-0 flex flex-col items-end">
                <span className="text-xs md:text-sm font-extrabold text-text-primary font-poppins leading-none">
                  {action.value}
                </span>
                <span className="text-[9px] font-extrabold text-brand-900 flex items-center gap-0.5 mt-1 bg-brand-50 border border-brand-100/50 px-1 rounded-md">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  {action.growth}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
