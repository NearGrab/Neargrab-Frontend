import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { productCategories } from '../../data/productCategories';

export default function ProductCatalogFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortByChange
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full text-left font-inter py-3 border-b border-neutral-100/60">
      
      {/* 1. Search Bar Input */}
      <div className="relative flex-grow md:flex-grow-0 md:w-64 min-w-[200px]">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full text-xs font-bold bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-9 pr-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
        />
      </div>

      {/* 2. Category Dropdown Filter */}
      <div className="relative min-w-[140px]">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full appearance-none text-xs font-bold bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-3 pr-8 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs"
        >
          <option value="All Categories">All Categories</option>
          {productCategories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
          ▼
        </div>
      </div>

      {/* 3. Stock Status Dropdown Filter */}
      <div className="relative min-w-[130px]">
        <select
          value={stockFilter}
          onChange={(e) => onStockFilterChange(e.target.value)}
          className="w-full appearance-none text-xs font-bold bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-3 pr-8 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs"
        >
          <option value="All">Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out Of Stock">Out Of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
          ▼
        </div>
      </div>

      {/* 4. Sort Dropdown Options */}
      <div className="relative min-w-[160px] sm:ml-auto">
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full appearance-none text-xs font-bold bg-[#F9FAFB] border border-neutral-200/80 rounded-xl pl-8 pr-8 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs"
        >
          <option value="Newest">Sort by: Newest</option>
          <option value="Oldest">Sort by: Oldest</option>
          <option value="Highest Views">Sort by: Highest Views</option>
          <option value="Lowest Views">Sort by: Lowest Views</option>
          <option value="Price High To Low">Sort by: Price High To Low</option>
          <option value="Price Low To High">Sort by: Price Low To High</option>
        </select>
        <SlidersHorizontal className="absolute top-1/2 left-3.5 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
          ▼
        </div>
      </div>

    </div>
  );
}
