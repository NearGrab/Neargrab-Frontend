import React, { useMemo } from 'react';
import { units } from '../../data/units';

export default function PricingSection({
  price,
  mrp,
  unit,
  onChangeField
}) {

  // Auto-calculate the savings discount percent in real-time
  const discountPercent = useMemo(() => {
    const p = parseFloat(price);
    const m = parseFloat(mrp);
    if (p && m && m > p) {
      return Math.round(((m - p) / m) * 100);
    }
    return 0;
  }, [price, mrp]);

  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      
      {/* Step Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
        <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-poppins font-bold text-xs flex items-center justify-center shadow-3xs shrink-0">
          3
        </span>
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Pricing
        </h3>
      </div>

      {/* Grid Inputs for Price, MRP, and Unit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        
        {/* Price */}
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between">
            <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
              Price <span className="text-red-500 font-bold">*</span>
            </label>
            {discountPercent > 0 && (
              <span className="bg-[#E6F4EA] text-brand-900 font-extrabold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wide animate-pulse">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <div className="relative">
            <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-xs font-bold text-text-secondary">
              ₹
            </span>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => onChangeField('price', e.target.value)}
              placeholder="0.00"
              className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-8 pr-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
            />
          </div>
        </div>

        {/* MRP */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            MRP <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-xs font-bold text-text-secondary">
              ₹
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={mrp}
              onChange={(e) => onChangeField('mrp', e.target.value)}
              placeholder="0.00"
              className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-8 pr-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
            />
          </div>
        </div>

        {/* Unit */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Unit <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={unit}
              onChange={(e) => onChangeField('unit', e.target.value)}
              className="w-full appearance-none text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 pr-8 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs"
            >
              {units.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
              ▼
            </div>
          </div>
          <span className="text-[9px] text-text-muted mt-0.5 block leading-none">
            e.g., 1L, 500g, 1 piece
          </span>
        </div>

      </div>

    </div>
  );
}
