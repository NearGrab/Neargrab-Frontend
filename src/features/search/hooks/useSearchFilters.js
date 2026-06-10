import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_FILTERS = {
  distance: 'Within 3 km',
  customDistance: '',
  minPrice: 0,
  maxPrice: 200,
  brands: [],
  packSizes: ['1 Litre'],
  inStockOnly: true,
  page: 1
};

/**
 * Custom hook to handle high-fidelity product search filter states
 * synced with the react-router URL search parameters.
 */
export function useSearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filter state from search parameters or fallback to visual mockup defaults
  const [filters, setFilters] = useState(() => {
    const qBrands = searchParams.get('brands');
    const qSizes = searchParams.get('packSizes');
    
    return {
      query: searchParams.get('q') || '',
      distance: searchParams.get('distance') || DEFAULT_FILTERS.distance,
      customDistance: searchParams.get('customDistance') || DEFAULT_FILTERS.customDistance,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice'), 10) : DEFAULT_FILTERS.minPrice,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice'), 10) : DEFAULT_FILTERS.maxPrice,
      brands: qBrands ? qBrands.split(',').filter(Boolean) : DEFAULT_FILTERS.brands,
      packSizes: qSizes ? qSizes.split(',').filter(Boolean) : DEFAULT_FILTERS.packSizes,
      inStockOnly: searchParams.get('inStockOnly') ? searchParams.get('inStockOnly') === 'true' : DEFAULT_FILTERS.inStockOnly,
      page: searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1
    };
  });

  // Keep internal filter state synchronized when URL queries change (e.g. from global Navbar search)
  useEffect(() => {
    const qBrands = searchParams.get('brands');
    const qSizes = searchParams.get('packSizes');

    setFilters({
      query: searchParams.get('q') || '',
      distance: searchParams.get('distance') || DEFAULT_FILTERS.distance,
      customDistance: searchParams.get('customDistance') || DEFAULT_FILTERS.customDistance,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice'), 10) : DEFAULT_FILTERS.minPrice,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice'), 10) : DEFAULT_FILTERS.maxPrice,
      brands: qBrands ? qBrands.split(',').filter(Boolean) : DEFAULT_FILTERS.brands,
      packSizes: qSizes ? qSizes.split(',').filter(Boolean) : DEFAULT_FILTERS.packSizes,
      inStockOnly: searchParams.get('inStockOnly') ? searchParams.get('inStockOnly') === 'true' : DEFAULT_FILTERS.inStockOnly,
      page: searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1
    });
  }, [searchParams]);

  // Push updated filter state back to search parameter URLs
  const applyFiltersToUrl = (newFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.query) params.set('q', newFilters.query);
    if (newFilters.distance !== DEFAULT_FILTERS.distance) params.set('distance', newFilters.distance);
    if (newFilters.customDistance) params.set('customDistance', newFilters.customDistance);
    if (newFilters.minPrice !== DEFAULT_FILTERS.minPrice) params.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice !== DEFAULT_FILTERS.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString());
    if (newFilters.brands.length > 0) params.set('brands', newFilters.brands.join(','));
    if (newFilters.packSizes.length > 0) params.set('packSizes', newFilters.packSizes.join(','));
    if (newFilters.inStockOnly !== DEFAULT_FILTERS.inStockOnly) params.set('inStockOnly', newFilters.inStockOnly.toString());
    if (newFilters.page && newFilters.page !== 1) params.set('page', newFilters.page.toString());

    setSearchParams(params);
  };

  const updateFilter = (key, value) => {
    const nextFilters = { 
      ...filters, 
      [key]: value,
      ...(key !== 'page' ? { page: 1 } : {})
    };
    setFilters(nextFilters);
    applyFiltersToUrl(nextFilters);
  };

  const toggleBrand = (brandName) => {
    const isSelected = filters.brands.includes(brandName);
    const nextBrands = isSelected
      ? filters.brands.filter(b => b !== brandName)
      : [...filters.brands, brandName];
    updateFilter('brands', nextBrands);
  };

  const togglePackSize = (sizeName) => {
    const isSelected = filters.packSizes.includes(sizeName);
    const nextSizes = isSelected
      ? filters.packSizes.filter(s => s !== sizeName)
      : [...filters.packSizes, sizeName];
    updateFilter('packSizes', nextSizes);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    applyFiltersToUrl(DEFAULT_FILTERS);
  };

  const clearAllFilters = () => {
    const cleared = {
      query: filters.query, // preserve search text
      distance: 'Within 10 km', // clear boundaries
      customDistance: '',
      minPrice: 0,
      maxPrice: 1000,
      brands: [],
      packSizes: [],
      inStockOnly: false,
      page: 1
    };
    setFilters(cleared);
    applyFiltersToUrl(cleared);
  };

  // Compile visual filter capsules representing applied active configurations
  const activeTags = [];
  if (filters.distance && filters.distance !== 'Within 10 km') {
    activeTags.push({ id: 'distance', label: filters.distance });
  }
  if (filters.customDistance) {
    activeTags.push({ id: 'customDistance', label: `${filters.customDistance} km` });
  }
  if (filters.minPrice > 0 || filters.maxPrice < 1000) {
    activeTags.push({ id: 'price', label: `₹${filters.minPrice} - ₹${filters.maxPrice}` });
  }
  filters.brands.forEach(b => {
    activeTags.push({ id: `brand-${b}`, label: b, value: b, type: 'brand' });
  });
  filters.packSizes.forEach(s => {
    activeTags.push({ id: `size-${s}`, label: s, value: s, type: 'size' });
  });
  if (filters.inStockOnly) {
    activeTags.push({ id: 'stock', label: 'In Stock Only' });
  }

  const removeTag = (tag) => {
    if (tag.id === 'distance') {
      updateFilter('distance', 'Within 10 km');
    } else if (tag.id === 'customDistance') {
      updateFilter('customDistance', '');
    } else if (tag.id === 'price') {
      updateFilter('minPrice', 0);
      updateFilter('maxPrice', 1000);
    } else if (tag.type === 'brand') {
      const nextBrands = filters.brands.filter(b => b !== tag.value);
      updateFilter('brands', nextBrands);
    } else if (tag.type === 'size') {
      const nextSizes = filters.packSizes.filter(s => s !== tag.value);
      updateFilter('packSizes', nextSizes);
    } else if (tag.id === 'stock') {
      updateFilter('inStockOnly', false);
    }
  };

  return {
    filters,
    updateFilter,
    toggleBrand,
    togglePackSize,
    resetFilters,
    clearAllFilters,
    activeTags,
    removeTag
  };
}
