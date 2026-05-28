import React, { useEffect, useState } from 'react';
import { exploreService } from '../services/exploreService';
import ExploreHeader from '../components/ExploreHeader';
import HeroBanner from '../components/HeroBanner';
import CategoriesGrid from '../components/CategoriesGrid';
import ValueProps from '../components/ValueProps';
import NearbyStores from '../components/NearbyStores';
import TopPicks from '../components/TopPicks';
import ExploreSidebar from '../components/ExploreSidebar';
import { Loader2 } from 'lucide-react';

export default function ExplorePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Query explore data asynchronously from the service layer on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        const dashboardData = await exploreService.getExploreDashboardData();
        setData(dashboardData);
      } catch (err) {
        console.error('Failed to resolve explore dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Display highly polished brand loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
        <span className="font-poppins font-semibold text-text-primary text-sm tracking-wide">
          Connecting to Neargrab Neighborhood...
        </span>
      </div>
    );
  }

  // Visual dashboard once data resolved
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Dynamic Header */}
      <ExploreHeader user={data.currentUser} />

      {/* Main Grid Wrapper */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-[5px] md:px-0 py-4 md:py-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main Column: Spans 9 out of 12 columns */}
          <div className="lg:col-span-9 flex flex-col gap-0 w-full overflow-hidden">
            {/* Promo Slider */}
            <HeroBanner banner={data.heroBanner} />
            
            {/* Categories Carousel */}
            <CategoriesGrid categories={data.categories} />
            
            {/* Value Propositions - Hidden on Mobile */}
            <div className="hidden md:block">
              <ValueProps propsData={data.valueProps} />
            </div>
            
            {/* Nearby Store list */}
            <NearbyStores stores={data.stores} />
            
            {/* Top Picks Product list */}
            <TopPicks picks={data.topPicks} />
          </div>

          {/* Right Sidebar Column: Spans 3 out of 12 columns */}
          <aside className="lg:col-span-3 w-full">
            <ExploreSidebar
              offers={data.topOffers}
              listShop={data.listShopCTA}
              reviews={data.realReviews}
            />
          </aside>

        </div>
      </main>
    </div>
  );
}
