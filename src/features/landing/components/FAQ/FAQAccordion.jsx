import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Highlight keyword helper function
function highlightText(text, search) {
  if (!search) return text;
  const parts = text.split(new RegExp(`(${search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <mark key={i} className="bg-accent-100 text-brand-900 font-medium px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function FAQAccordionItem({ item, searchQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-brand-500 shadow-lg shadow-brand-900/5'
          : 'border-neutral-200 hover:border-brand-600 hover:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Clickable Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
      >
        <span className="font-poppins font-semibold text-text-primary text-base md:text-lg leading-snug">
          {highlightText(item.question, searchQuery)}
        </span>
        <div
          className={`w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center shrink-0 border border-neutral-100 transition-colors duration-300 ${
            isOpen ? 'bg-brand-50 border-brand-100' : ''
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-brand-600' : 'text-text-muted'
            }`}
          />
        </div>
      </button>

      {/* Modern CSS Grid transition for height auto */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 md:px-6 md:pb-6 text-text-secondary text-sm md:text-base leading-relaxed border-t border-neutral-100 pt-4 bg-neutral-50/50">
            {highlightText(item.answer, searchQuery)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items, searchQuery }) {
  if (items.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-12 px-6 bg-white border border-neutral-200 rounded-3xl">
        <p className="text-text-secondary font-medium mb-2">No matching questions found.</p>
        <p className="text-text-muted text-sm">Try searching for different keywords or categories.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 px-4 mb-20">
      {items.map((item, idx) => (
        <FAQAccordionItem key={idx} item={item} searchQuery={searchQuery} />
      ))}
    </div>
  );
}
