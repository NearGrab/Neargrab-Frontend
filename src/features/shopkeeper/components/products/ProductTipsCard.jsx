import React from 'react';
import { Check, Lightbulb } from 'lucide-react';

export default function ProductTipsCard() {
  const tips = [
    'Use clear and well-lit product images',
    'Write a short and helpful description',
    'Keep your product in stock',
    'Add accurate price for better trust'
  ];

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3.5">
        <div className="w-7 h-7 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-brand-100/50 shadow-3xs shrink-0">
          <Lightbulb className="w-4 h-4 text-brand-900" />
        </div>
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Tips to get more views
        </h4>
      </div>

      {/* Advice Checklist Items */}
      <div className="flex flex-col gap-2.5">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 shrink-0 mt-0.5 shadow-3xs">
              <Check className="w-2.5 h-2.5 text-brand-900" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary leading-normal font-inter">
              {tip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
