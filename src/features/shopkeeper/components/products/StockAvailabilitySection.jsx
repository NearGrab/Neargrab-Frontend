import React from 'react';
import StockToggle from './StockToggle';
import { ShieldAlert } from 'lucide-react';

export default function StockAvailabilitySection({
  stockAvailable,
  onChangeField
}) {
  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      
      {/* Step Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
        <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-poppins font-bold text-xs flex items-center justify-center shadow-3xs shrink-0">
          4
        </span>
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Stock Availability
        </h3>
      </div>

      <p className="text-[10px] md:text-xs text-text-secondary leading-normal -mt-2">
        Show customers if this product is currently available.
      </p>

      {/* Toggle Input Control */}
      <div className="py-1">
        <StockToggle
          checked={stockAvailable}
          onChange={(val) => onChangeField('stockAvailable', val)}
        />
      </div>

      {/* Info status notification */}
      <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50/75 border border-brand-100/40 rounded-xl shadow-3xs">
        <ShieldAlert className="w-4 h-4 text-brand-900 shrink-0 mt-0.5" />
        <span className="text-[10px] font-bold text-brand-900 leading-normal font-poppins">
          Out of stock products will be hidden from customers automatically.
        </span>
      </div>

    </div>
  );
}
