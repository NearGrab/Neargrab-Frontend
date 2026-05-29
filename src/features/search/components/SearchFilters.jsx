import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function SearchFilters({
  filters,
  updateFilter,
  toggleBrand,
  togglePackSize,
  resetFilters,
  clearAllFilters,
  activeTags,
  removeTag,
  onClose
}) {
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [customDistanceActive, setCustomDistanceActive] = useState(!!filters.customDistance);
  const [localCustomDist, setLocalCustomDist] = useState(filters.customDistance || '');

  // Local state for Price Range sliders to avoid laggy performance during slides
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

  const handlePriceApply = () => {
    updateFilter('minPrice', localMinPrice);
    updateFilter('maxPrice', localMaxPrice);
  };

  const handleCustomDistChange = (val) => {
    setLocalCustomDist(val);
    updateFilter('customDistance', val);
  };

  return (
    <div id="search-filters-sidebar" className="w-full bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm text-left select-none">
      
      {/* Title Header with Clear Action */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-text-muted hover:text-text-primary rounded-full p-1 hover:bg-neutral-100 transition-colors mr-1 cursor-pointer shrink-0"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
          <h3 className="font-poppins font-bold text-base text-text-primary">Filters</h3>
        </div>
        {activeTags.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-brand-900 hover:text-brand-800 transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filter capsules pills */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 py-4 border-b border-neutral-100">
          {activeTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 hover:bg-brand-100/80 text-brand-900 border border-brand-100 rounded-full text-[11px] font-bold transition-all"
            >
              <span>{tag.label}</span>
              <button
                onClick={() => removeTag(tag)}
                className="hover:bg-brand-200/50 rounded-full p-0.5 transition-colors cursor-pointer"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* DISTANCE SECTION */}
      <div className="py-5 border-b border-neutral-100">
        <h4 className="font-poppins font-bold text-xs text-text-primary tracking-wide uppercase mb-3">
          Distance
        </h4>
        <div className="flex flex-col gap-2.5">
          {[
            { label: 'Within 1 km', count: 21 },
            { label: 'Within 3 km', count: 46 },
            { label: 'Within 5 km', count: 78 },
            { label: 'Within 10 km', count: 128 }
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-center justify-between text-xs font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="distance-radio"
                  checked={filters.distance === item.label && !customDistanceActive}
                  onChange={() => {
                    setCustomDistanceActive(false);
                    updateFilter('distance', item.label);
                    updateFilter('customDistance', '');
                  }}
                  className="w-4 h-4 text-brand-900 border-neutral-300 focus:ring-brand-900"
                />
                <span>{item.label}</span>
              </div>
              <span className="text-text-muted">({item.count})</span>
            </label>
          ))}

          {/* Custom distance picker */}
          <div className="flex flex-col gap-2 mt-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={customDistanceActive}
                onChange={(e) => {
                  setCustomDistanceActive(e.target.checked);
                  if (!e.target.checked) {
                    setLocalCustomDist('');
                    updateFilter('customDistance', '');
                  }
                }}
                className="w-4 h-4 text-brand-900 border-neutral-300 rounded focus:ring-brand-900"
              />
              <span>Custom distance</span>
            </label>

            {customDistanceActive && (
              <div className="flex items-center gap-2 pl-6">
                <input
                  type="number"
                  placeholder="Enter km"
                  value={localCustomDist}
                  onChange={(e) => handleCustomDistChange(e.target.value)}
                  className="w-28 px-3 py-1.5 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
                <span className="text-xs text-text-muted font-bold">km</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRICE RANGE SECTION */}
      <div className="py-5 border-b border-neutral-100">
        <h4 className="font-poppins font-bold text-xs text-text-primary tracking-wide uppercase mb-3">
          Price Range
        </h4>
        
        {/* Visual Double-Handle Slider Bar Simulation */}
        <div className="px-1.5 py-2 relative">
          <div className="h-1.5 bg-neutral-100 rounded-full w-full relative">
            {/* Colored Range overlay */}
            <div 
              className="absolute h-full bg-brand-900 rounded-full"
              style={{
                left: `${(localMinPrice / 1000) * 100}%`,
                right: `${100 - (localMaxPrice / 1000) * 100}%`
              }}
            ></div>
          </div>
          <div className="relative mt-4 flex items-center justify-between gap-3">
            {/* Input range limits controls */}
            <input
              type="range"
              min="0"
              max="1000"
              value={localMinPrice}
              onChange={(e) => {
                const val = Math.min(parseInt(e.target.value, 10), localMaxPrice - 10);
                setLocalMinPrice(val);
                updateFilter('minPrice', val);
              }}
              className="absolute w-full top-[-22px] left-0 pointer-events-none opacity-0 h-1"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={localMaxPrice}
              onChange={(e) => {
                const val = Math.max(parseInt(e.target.value, 10), localMinPrice + 10);
                setLocalMaxPrice(val);
                updateFilter('maxPrice', val);
              }}
              className="absolute w-full top-[-22px] left-0 pointer-events-none opacity-0 h-1"
            />
          </div>
        </div>

        {/* Input box numbers side by side */}
        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="relative flex-grow">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-muted">₹</span>
            <input
              type="number"
              value={localMinPrice}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setLocalMinPrice(val);
              }}
              onBlur={handlePriceApply}
              className="w-full bg-white border border-neutral-200 rounded-xl pl-6 pr-2 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-500 font-semibold"
            />
          </div>
          <div className="text-text-muted font-bold">-</div>
          <div className="relative flex-grow">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-muted">₹</span>
            <input
              type="number"
              value={localMaxPrice}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setLocalMaxPrice(val);
              }}
              onBlur={handlePriceApply}
              className="w-full bg-white border border-neutral-200 rounded-xl pl-6 pr-2 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-500 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* BRAND CHECKBOXES */}
      <div className="py-5 border-b border-neutral-100">
        <h4 className="font-poppins font-bold text-xs text-text-primary tracking-wide uppercase mb-3">
          Brand
        </h4>
        <div className="flex flex-col gap-2.5">
          {[
            { name: 'Fortune', count: 36 },
            { name: 'Saffola', count: 21 },
            { name: 'Gemini', count: 18 },
            { name: 'Dhara', count: 14 },
            { name: 'Nature Fresh', count: 12 }
          ].map((b) => (
            <label
              key={b.name}
              className="flex items-center justify-between text-xs font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b.name)}
                  onChange={() => toggleBrand(b.name)}
                  className="w-4 h-4 text-brand-900 border-neutral-300 rounded focus:ring-brand-900"
                />
                <span>{b.name}</span>
              </div>
              <span className="text-text-muted">({b.count})</span>
            </label>
          ))}

          {/* Reveal details toggle */}
          {showMoreBrands && (
            <div className="flex flex-col gap-2.5 pt-1 transition-all duration-300">
              {[
                { name: 'Sundrop', count: 8 },
                { name: 'Gold Winner', count: 6 },
                { name: 'Dalda', count: 4 }
              ].map((b) => (
                <label
                  key={b.name}
                  className="flex items-center justify-between text-xs font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(b.name)}
                      onChange={() => toggleBrand(b.name)}
                      className="w-4 h-4 text-brand-900 border-neutral-300 rounded focus:ring-brand-900"
                    />
                    <span>{b.name}</span>
                  </div>
                  <span className="text-text-muted">({b.count})</span>
                </label>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowMoreBrands(!showMoreBrands)}
            className="flex items-center gap-1 text-[11px] font-bold text-brand-900 hover:text-brand-800 transition-colors mt-1 text-left cursor-pointer shrink-0"
          >
            {showMoreBrands ? (
              <>
                <span>View less</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>View more</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* PACK SIZE CHECKBOXES */}
      <div className="py-5 border-b border-neutral-100">
        <h4 className="font-poppins font-bold text-xs text-text-primary tracking-wide uppercase mb-3">
          Pack Size
        </h4>
        <div className="flex flex-col gap-2.5">
          {[
            { name: '500 ml', count: 12 },
            { name: '1 Litre', count: 64, checked: true },
            { name: '2 Litre', count: 28 },
            { name: '5 Litre', count: 8 }
          ].map((item) => (
            <label
              key={item.name}
              className="flex items-center justify-between text-xs font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.packSizes.includes(item.name)}
                  onChange={() => togglePackSize(item.name)}
                  className="w-4 h-4 text-brand-900 border-neutral-300 rounded focus:ring-brand-900"
                />
                <span>{item.name}</span>
              </div>
              <span className="text-text-muted">({item.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* AVAILABILITY CHECKBOX */}
      <div className="py-5 pb-6">
        <h4 className="font-poppins font-bold text-xs text-text-primary tracking-wide uppercase mb-3">
          Availability
        </h4>
        <label className="flex items-center justify-between text-xs font-semibold text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
              className="w-4 h-4 text-brand-900 border-neutral-300 rounded focus:ring-brand-900"
            />
            <span>In Stock Only</span>
          </div>
          <span className="text-text-muted">(116)</span>
        </label>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-neutral-100">
        <button
          onClick={() => {
            handlePriceApply();
            if (onClose) onClose();
          }}
          className="w-full bg-brand-900 hover:bg-brand-800 text-white font-poppins font-bold text-xs py-3 rounded-full shadow-md shadow-brand-900/10 transition-all cursor-pointer text-center"
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            resetFilters();
            if (onClose) onClose();
          }}
          className="w-full bg-transparent hover:bg-neutral-50 text-text-secondary border border-neutral-200/80 font-poppins font-bold text-xs py-3 rounded-full transition-all cursor-pointer text-center"
        >
          Reset
        </button>
      </div>

    </div>
  );
}
