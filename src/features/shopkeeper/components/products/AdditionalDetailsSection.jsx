import React from 'react';
import { Calendar } from 'lucide-react';

export default function AdditionalDetailsSection({
  hsnCode,
  expiryDate,
  minimumOrderQty,
  returnable,
  needsRefrigeration,
  onChangeField
}) {
  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      
      {/* Step Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
        <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-poppins font-bold text-xs flex items-center justify-center shadow-3xs shrink-0">
          5
        </span>
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Additional Details
        </h3>
      </div>

      {/* Grid for HSN, Expiry, Min Order Qty, and Returnable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        
        {/* HSN Code */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            HSN Code <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={hsnCode}
            onChange={(e) => onChangeField('hsnCode', e.target.value)}
            placeholder="e.g., 0401"
            className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
          />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Expiry Date <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => onChangeField('expiryDate', e.target.value)}
              className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs text-text-secondary"
            />
          </div>
        </div>

        {/* Min Order Qty */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Min. Order Qty <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <input
            type="number"
            min="1"
            value={minimumOrderQty}
            onChange={(e) => onChangeField('minimumOrderQty', e.target.value)}
            placeholder="e.g., 1"
            className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
          />
        </div>

        {/* Returnable Option */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Returnable
          </label>
          <div className="relative">
            <select
              value={returnable}
              onChange={(e) => onChangeField('returnable', e.target.value)}
              className="w-full appearance-none text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 pr-8 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Conditional">Conditional</option>
            </select>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
              ▼
            </div>
          </div>
          <span className="text-[8px] text-text-muted mt-0.5 block leading-none">
            Is this product returnable?
          </span>
        </div>

      </div>

      {/* Refrigeration Checkbox */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="needsRefrigeration"
          checked={needsRefrigeration}
          onChange={(e) => onChangeField('needsRefrigeration', e.target.checked)}
          className="w-4 h-4 rounded-md border-neutral-300 text-brand-900 focus:ring-brand-900/40 cursor-pointer shadow-3xs"
        />
        <label
          htmlFor="needsRefrigeration"
          className="text-[10px] md:text-xs font-bold font-poppins text-text-secondary select-none cursor-pointer flex items-center gap-1"
        >
          <span>❄️</span>
          <span>This product needs refrigeration</span>
        </label>
      </div>

    </div>
  );
}
