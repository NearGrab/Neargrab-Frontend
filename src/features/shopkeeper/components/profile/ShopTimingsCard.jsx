import React from 'react';
import { Clock, Calendar, Pencil } from 'lucide-react';
import Button from '../../../../shared/components/ui/Button';

export default function ShopTimingsCard({
  timings = {},
  isManageMode = true,
  onEditTimings
}) {
  const {
    isOpenNow = true,
    displayHours = '08:00 AM - 10:00 PM',
    schedule = [],
    openAll7Days = true
  } = timings;

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-4 shadow-3xs text-left font-inter flex flex-col gap-3.5 select-none">
      
      {/* Header */}
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
        Shop Timings
      </h3>

      {/* Status Row */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 text-brand-900 shrink-0 shadow-3xs">
          <Clock className="w-4 h-4 text-brand-900" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] md:text-xs font-extrabold text-brand-900 block uppercase tracking-wide">
            {isOpenNow ? 'Open Open Now • Closes 10:00 PM' : 'Closed Now • Opens 08:00 AM'}
          </span>
          <span className="text-[10px] text-text-secondary font-bold block mt-0.5">
            {displayHours}
          </span>
        </div>
      </div>

      {/* Calendar Week List */}
      <div className="flex items-start gap-2.5 pt-1">
        <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 text-brand-900 shrink-0 shadow-3xs">
          <Calendar className="w-4 h-4 text-brand-900" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] md:text-xs font-bold text-text-primary block leading-normal pr-1">
            {openAll7Days ? 'Open all 7 days' : 'Mon - Sat (Sunday Closed)'}
          </span>
          <span className="text-[8px] text-text-muted font-bold block mt-0.5 uppercase tracking-wide">
            Daily Delivery Schedule
          </span>
        </div>
      </div>

      {/* Edit Timings (Shopkeeper Admin only) */}
      {isManageMode && onEditTimings && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditTimings}
            leftIcon={<Pencil className="w-3 h-3 text-text-muted" />}
            className="w-full font-bold text-[10px] md:text-xs h-8 cursor-pointer shadow-3xs bg-white hover:bg-neutral-50"
          >
            Edit Timings
          </Button>
        </div>
      )}

    </div>
  );
}
