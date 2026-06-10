import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import ProductCard from './ProductCard';

export default function SearchResults({
  products,
  loading,
  resetFilters,
  meta,
  onPageChange
}) {
  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;

  // Generate page numbers dynamically
  const pageNumbers = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 4) {
      pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  const handlePageChange = (page) => {
    if (page === '...') return;
    if (onPageChange) onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-900 rounded-full animate-spin"></div>
        <span className="text-xs font-bold text-text-secondary tracking-wide">
          Filtering local shelves...
        </span>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full bg-white border border-neutral-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center select-none">
        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-text-muted mb-4 border border-neutral-100">
          <Inbox className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="font-poppins font-bold text-base text-text-primary mb-1">
          No matches in your neighborhood
        </h3>
        <p className="text-xs text-text-muted max-w-sm mb-6 leading-relaxed">
          We couldn't find any products in nearby shops matching your filters. Try checking other price/distance bounds or reset filters to explore.
        </p>
        <button
          onClick={resetFilters}
          className="px-6 py-2.5 bg-[#E6F4EA] hover:bg-brand-50 text-[#0B3B2C] border border-brand-100 font-poppins font-bold text-xs rounded-full transition-all cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 select-none">
      
      {/* Dynamic Responsive 4-Column Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>

      {/* Stylized Pagination Bar exactly matching mockup visual */}
      <div className="flex items-center justify-center gap-1.5 py-6">
        {/* Prev Arrow */}
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full border border-neutral-200/70 bg-white flex items-center justify-center text-text-secondary hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-text-secondary" />
        </button>

        {/* Page numbers capsules */}
        {pageNumbers.map((num, idx) => {
          const isActive = currentPage === num;
          const isEllipsis = num === '...';
          
          return (
            <button
              key={idx}
              onClick={() => handlePageChange(num)}
              disabled={isEllipsis}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-[#E6F4EA] text-[#0B3B2C] border border-[#12634B]/20 scale-102 font-extrabold'
                  : isEllipsis
                    ? 'text-text-muted cursor-default pointer-events-none'
                    : 'bg-white border border-neutral-200/70 text-text-secondary hover:bg-neutral-50'
              }`}
            >
              {num}
            </button>
          );
        })}

        {/* Next Arrow */}
        <button
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-full border border-neutral-200/70 bg-white flex items-center justify-center text-text-secondary hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

    </div>
  );
}
