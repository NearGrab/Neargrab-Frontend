import React from 'react';
import { Check, Lightbulb } from 'lucide-react';
import { productCatalogMockData } from '../../data/productCatalogMockData';

export default function CatalogQuickTips() {
  const { tips } = productCatalogMockData;

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3.5 select-none">
        <div className="w-7 h-7 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-brand-100/50 shadow-3xs shrink-0">
          <Lightbulb className="w-4 h-4 text-brand-900" />
        </div>
        <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Quick Tips
        </h3>
      </div>

      {/* Tips list */}
      <div className="flex flex-col gap-3.5">
        {tips.map((tip) => (
          <div key={tip.id} className="flex items-start gap-2.5 text-left">
            {/* Visual checkbox indicator */}
            <div className="w-4 h-4 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 shrink-0 mt-0.5 shadow-3xs">
              <Check className="w-2.5 h-2.5 text-brand-900" />
            </div>
            
            {/* Advice text details */}
            <div className="min-w-0">
              <span className="text-[10px] md:text-xs font-bold text-text-secondary font-inter block leading-normal">
                {tip.title}
              </span>
              <span className="text-[9px] text-text-muted font-bold block leading-normal mt-0.5">
                {tip.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
