import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SortBar({
  query,
  totalCount,
  storesCount,
  sortBy,
  onSortChange,
  activeTab,
  onTabChange
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortOptions = [
    'Relevance',
    'Price: Low to High',
    'Price: High to Low',
    'Distance',
    'Top Rated'
  ];

  const categoryTabs = [
    'All',
    '1 Litre',
    '2 Litre',
    '500 ml',
    '5 Litre',
    'Refined',
    'Cold Pressed'
  ];

  return (
    <div className="w-full flex flex-col gap-4 text-left select-none">
      
      {/* Upper Row: Search Title Header, Sub-counters & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-poppins font-bold text-xl md:text-2xl text-text-primary">
            Search results for <span className="text-brand-900 font-extrabold">"{query || 'Sunflower Oil'}"</span>
          </h2>
          <p className="text-xs md:text-sm text-text-secondary mt-1 font-semibold">
            {totalCount} products from {storesCount} stores
          </p>
        </div>

        {/* Sort Select Dropdown */}
        <div className="relative self-start sm:self-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-bold">Sort by</span>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-4 py-2 border border-neutral-200 rounded-full hover:bg-neutral-50 text-xs font-bold text-text-secondary transition-all cursor-pointer bg-white min-w-40 justify-between"
            >
              <span>{sortBy}</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-100 rounded-2xl shadow-xl p-2 z-30 text-left">
              <div className="flex flex-col gap-0.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onSortChange(opt);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                      sortBy === opt 
                        ? 'bg-brand-50 text-brand-900' 
                        : 'text-text-primary hover:bg-neutral-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Underneath: Category/Size Horizontal Tabs Capsules */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categoryTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#E6F4EA] text-[#0B3B2C] border-[#12634B]/20 font-bold scale-102'
                  : 'bg-white text-text-secondary border-neutral-200/80 hover:bg-neutral-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

    </div>
  );
}
