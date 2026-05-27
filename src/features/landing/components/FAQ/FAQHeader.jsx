import React from 'react';
import { Search, X } from 'lucide-react';
import content from '../../data/content.json';

export default function FAQHeader({ searchQuery, setSearchQuery }) {
  const { faqs } = content;

  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72rem] h-[25rem] bg-gradient-to-b from-brand-100/40 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Tagline */}
        <span className="inline-block text-brand-600 text-xs font-bold tracking-widest uppercase mb-3 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-100">
          {faqs.tagline}
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-poppins font-bold text-brand-900 tracking-tight mb-4 leading-tight">
          {faqs.heading}
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {faqs.description}
        </p>

        {/* Search Input Container */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 h-5 text-text-muted group-focus-within:text-brand-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white border border-neutral-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-text-primary placeholder-text-muted transition-all text-sm md:text-base group-hover:border-neutral-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-brand-600 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
