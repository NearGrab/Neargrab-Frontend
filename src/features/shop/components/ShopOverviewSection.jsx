import React from 'react';
import Badge from '../../../shared/components/ui/Badge';

export default function ShopOverviewSection({ description, trustTags = [] }) {
  
  // Default values matching Patel General Store if none are loaded
  const displayDescription = description || 'Your one-stop shop for daily essentials! We provide best quality groceries, household items, personal care, snacks and much more at the best prices. Your trust is our priority.';
  
  const displayTags = trustTags.length > 0 ? trustTags : [
    'Quality Products',
    'Fair Prices',
    'Trusted by Locals',
    'Friendly Service'
  ];

  return (
    <div className="w-full text-left font-inter flex flex-col gap-4 bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs">
      
      {/* Title */}
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
        About Patel General Store
      </h3>

      {/* Description text */}
      <p className="text-xs md:text-sm font-bold text-text-secondary leading-relaxed font-inter">
        {displayDescription}
      </p>

      {/* Trust Tags chips list */}
      <div className="flex flex-wrap gap-2 pt-2 select-none">
        {displayTags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-[#E6F4EA] border border-[#12634B]/10 text-brand-900 font-extrabold text-[10px] md:text-xs px-3 py-1 rounded-full shadow-3xs"
          >
            ✓ {tag}
          </span>
        ))}
      </div>

    </div>
  );
}
