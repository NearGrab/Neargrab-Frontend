import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductPagination({
  totalProducts = 0,
  currentPage = 1,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange
}) {
  const totalPages = Math.max(1, Math.ceil(totalProducts / rowsPerPage));

  // Determine offsets for showing description text
  const startOffset = totalProducts === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endOffset = Math.min(currentPage * rowsPerPage, totalProducts);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Compile showing list of page buttons beautifully
  const renderPageButtons = () => {
    const buttons = [];
    
    // Always render page 1
    buttons.push(1);

    if (currentPage > 3) {
      buttons.push('...');
    }

    // Render neighbors around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!buttons.includes(i)) {
        buttons.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      buttons.push('...');
    }

    // Always render final page (if > 1)
    if (totalPages > 1 && !buttons.includes(totalPages)) {
      buttons.push(totalPages);
    }

    return buttons.map((btn, idx) => {
      if (btn === '...') {
        return (
          <span key={`dots-${idx}`} className="px-2.5 py-1 text-xs text-text-muted font-bold select-none">
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${btn}`}
          type="button"
          onClick={() => onPageChange(btn)}
          className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold font-poppins transition-colors cursor-pointer shadow-3xs ${
            currentPage === btn
              ? 'bg-brand-900 text-white font-extrabold shadow-sm'
              : 'bg-white border border-neutral-200/60 hover:bg-neutral-50 hover:border-neutral-300 text-text-secondary'
          }`}
        >
          {btn}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-1 text-left font-inter select-none">
      
      {/* 1. Showing results text label */}
      <span className="text-[10px] md:text-xs font-bold text-text-secondary">
        Showing <span className="font-extrabold">{startOffset}</span> to{' '}
        <span className="font-extrabold">{endOffset}</span> of{' '}
        <span className="font-extrabold">{totalProducts}</span> products
      </span>

      {/* 2. Controls and Rows Limit selectors */}
      <div className="flex items-center gap-4 flex-wrap sm:ml-auto">
        
        {/* Pages navigation list */}
        <div className="flex items-center gap-1">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-neutral-200/60 hover:bg-neutral-50 hover:border-neutral-300 text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer shadow-3xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {renderPageButtons()}

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-neutral-200/60 hover:bg-neutral-50 hover:border-neutral-300 text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer shadow-3xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rows Limit selector */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
          <span className="text-[10px] md:text-xs font-bold">Rows per page:</span>
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
              className="appearance-none bg-white border border-neutral-200/60 hover:border-neutral-300 rounded-lg pl-2.5 pr-6 py-1 text-xs font-extrabold focus:outline-hidden cursor-pointer shadow-3xs"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <div className="absolute top-1/2 right-1.5 -translate-y-1/2 pointer-events-none text-text-muted text-[8px]">
              ▼
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
