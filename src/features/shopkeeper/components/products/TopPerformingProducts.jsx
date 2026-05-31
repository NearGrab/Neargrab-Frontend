import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { productCatalogMockData } from '../../data/productCatalogMockData';

export default function TopPerformingProducts() {
  const { topPerformers } = productCatalogMockData;

  const handleViewAll = () => {
    alert('Displaying full analytics reports for top viewed products...');
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 select-none">
        <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Top Performing Products
        </h3>
        <button
          type="button"
          onClick={handleViewAll}
          className="text-[10px] md:text-xs font-bold text-brand-900 hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Performers list */}
      <div className="flex flex-col gap-3">
        {topPerformers.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border border-neutral-150/40 hover:border-neutral-200 rounded-xl p-2 bg-neutral-50/20 shadow-3xs group transition-colors"
          >
            {/* Rank circular index */}
            <span className="w-5 h-5 rounded-full border border-neutral-250 font-poppins font-extrabold text-[10px] text-text-secondary flex items-center justify-center shrink-0">
              {item.rank}
            </span>

            {/* Thumbnail picture */}
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-neutral-200 bg-white shrink-0 flex items-center justify-center shadow-3xs">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-full max-w-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title details */}
            <div className="min-w-0 flex-grow text-left">
              <span className="font-poppins font-bold text-[11px] md:text-xs text-text-primary block truncate">
                {item.name}
              </span>
              <span className="text-[9px] text-text-muted font-bold block mt-0.5 leading-none">
                Views: <span className="text-text-secondary font-extrabold font-poppins">{item.views.toLocaleString()}</span>
              </span>
            </div>

            {/* Trend tag */}
            <div className="flex items-center gap-0.5 bg-[#E6F4EA] border border-[#12634B]/10 text-brand-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">
              <ArrowUpRight className="w-2.5 h-2.5 text-brand-900 stroke-[2.5px]" />
              <span>{item.growth}%</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
