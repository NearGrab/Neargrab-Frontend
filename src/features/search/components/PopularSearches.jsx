import React from 'react';

export default function PopularSearches({ tags, onTagClick }) {
  return (
    <div className="w-full bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm text-left select-none">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-50">
        <h3 className="font-poppins font-bold text-sm text-text-primary">
          Popular searches
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/50 rounded-lg text-xs font-semibold text-text-secondary transition-colors cursor-pointer shrink-0"
          >
            {tag}
          </button>
        ))}
      </div>
      <button
        onClick={() => alert("Popular search configurations are fully updated with nearby queries!")}
        className="w-full text-center text-xs font-bold text-brand-900 hover:text-brand-800 transition-colors mt-4 block cursor-pointer"
      >
        View all
      </button>
    </div>
  );
}
