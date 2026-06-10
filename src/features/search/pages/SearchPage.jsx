import React, { useEffect, useState } from 'react';
import Navbar from '../../../shared/components/layout/Navbar';
import SearchFilters from '../components/SearchFilters';
import SortBar from '../components/SortBar';
import SearchMap from '../components/SearchMap';
import SearchResults from '../components/SearchResults';
import PopularSearches from '../components/PopularSearches';
import TopRatedStores from '../components/TopRatedStores';
import RequestProductBanner from '../components/RequestProductBanner';
import RequestProductModal from '../components/RequestProductModal';

import { useSearchParams } from 'react-router-dom';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { searchService } from '../services/searchService';
import { useLocationStore } from '../../../store/useLocationStore';

export default function SearchPage() {
  const { location } = useLocationStore();
  const {
    filters,
    updateFilter,
    toggleBrand,
    togglePackSize,
    resetFilters,
    clearAllFilters,
    activeTags,
    removeTag
  } = useSearchFilters();

  const [searchData, setSearchData] = useState({ products: [], totalCount: 0, storesCount: 0 });
  const [loading, setLoading] = useState(true);
  const [topStores, setTopStores] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  
  // Tabs quick state sub-categories
  const [activeTab, setActiveTab] = useState('All');

  // Request Modal and Mobile Drawer states synced with URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobileFiltersOpen = searchParams.get('mobileFilters') === 'true';
  const setIsMobileFiltersOpen = (open) => {
    const nextParams = new URLSearchParams(searchParams);
    if (open) {
      nextParams.set('mobileFilters', 'true');
    } else {
      nextParams.delete('mobileFilters');
    }
    setSearchParams(nextParams);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load search products whenever filters or tabs change
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadSearchData = async () => {
      setLoading(true);
      try {
        let radiusKm;
        if (filters.customDistance) {
          radiusKm = parseFloat(filters.customDistance);
        } else if (filters.distance) {
          radiusKm = parseInt(filters.distance.replace(/[^0-9]/g, ''), 10);
        } else {
          radiusKm = location?.radius ? parseInt(location.radius.replace(/[^0-9]/g, ''), 10) : 10;
        }

        const data = await searchService.searchProducts({
          ...filters,
          categoryTab: activeTab,
          city: location?.city,
          latitude: location?.coordinates?.lat,
          longitude: location?.coordinates?.lng,
          radiusKm
        });
        setSearchData(data);

        // Track search event on success
        if (filters.query) {
          searchService.logSearchEvent({
            query: filters.query,
            city: location?.city,
            latitude: location?.coordinates?.lat,
            longitude: location?.coordinates?.lng,
            radiusKm,
            filters: { ...filters, categoryTab: activeTab },
            resultCount: data.products.length
          });
        }
      } catch (err) {
        console.error('Failed to query search results', err);
      } finally {
        setLoading(false);
      }
    };

    loadSearchData();
  }, [filters, activeTab, location]);

  // Load static sidebar content
  useEffect(() => {
    const loadSidebarData = async () => {
      try {
        const stores = await searchService.getTopRatedStores(location?.city);
        setTopStores(stores);
        const tags = searchService.getPopularSearches();
        setPopularTags(tags);
      } catch (err) {
        console.error('Failed to load sidebar content', err);
      }
    };
    loadSidebarData();
  }, [location]);

  const handlePopularTagClick = (tag) => {
    updateFilter('query', tag);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Global layout Header */}
      <Navbar />

      {/* Main Grid Wrapper */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-8 mb-20">
        
        {/* 3-Column Search Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Filters Sidebar (Spans 2 cols on desktop) */}
          <aside className="lg:col-span-2 w-full sticky top-24 z-10 hidden lg:block">
            <SearchFilters
              filters={filters}
              updateFilter={updateFilter}
              toggleBrand={toggleBrand}
              togglePackSize={togglePackSize}
              resetFilters={resetFilters}
              clearAllFilters={clearAllFilters}
              activeTags={activeTags}
              removeTag={removeTag}
            />
          </aside>

          {/* Column 2: Center Results Grid (Spans 7 cols on desktop) */}
          <section className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* Sort controller and subcategory capsules */}
            <SortBar
              query={filters.query}
              totalCount={searchData.totalCount}
              storesCount={searchData.storesCount}
              sortBy={filters.sortBy || 'Relevance'}
              onSortChange={(val) => updateFilter('sortBy', val)}
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />

            {/* Product card renders */}
            <SearchResults
              products={searchData.products}
              loading={loading}
              resetFilters={resetFilters}
              meta={searchData.meta}
              onPageChange={(page) => updateFilter('page', page)}
            />
          </section>

          {/* Column 3: Map widgets, popular searches, request items (Spans 3 cols on desktop) */}
          <aside className="lg:col-span-3 flex flex-col gap-6 w-full">
            
            {/* 1. Map radius boundary widget */}
            <SearchMap />

            {/* 2. Popular tags widget */}
            <PopularSearches 
              tags={popularTags} 
              onTagClick={handlePopularTagClick} 
            />

            {/* 3. Top rated stores card listings */}
            <TopRatedStores 
              stores={topStores} 
            />

            {/* 4. Request item illustrated feedback box */}
            <RequestProductBanner 
              onRequestClick={() => setIsModalOpen(true)} 
            />

          </aside>

        </div>
      </main>

      {/* AMAZON/FLIPKART STYLE MOBILE SLIDING DRAWER BACKDROP */}
      {isMobileFiltersOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity lg:hidden duration-300"
          onClick={() => setIsMobileFiltersOpen(false)}
        ></div>
      )}

      {/* AMAZON/FLIPKART STYLE MOBILE SLIDING DRAWER CONTAINER */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
          <SearchFilters
            filters={filters}
            updateFilter={updateFilter}
            toggleBrand={toggleBrand}
            togglePackSize={togglePackSize}
            resetFilters={resetFilters}
            clearAllFilters={clearAllFilters}
            activeTags={activeTags}
            removeTag={removeTag}
            onClose={() => setIsMobileFiltersOpen(false)}
          />
        </div>
      </div>

      {/* REQUEST PRODUCT MODAL FORM POPUP */}
      <RequestProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
