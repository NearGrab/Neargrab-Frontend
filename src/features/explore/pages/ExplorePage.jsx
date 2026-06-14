import React, { useEffect, useState } from 'react';
import { exploreService } from '../services/exploreService';
import Navbar from '../../../shared/components/layout/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoriesGrid from '../components/CategoriesGrid';
import ValueProps from '../components/ValueProps';
import NearbyStores from '../components/NearbyStores';
import TopPicks from '../components/TopPicks';
import ExploreSidebar from '../components/ExploreSidebar';
import { useAuthStore } from '../../../store/useAuthStore';
import { useLocationStore } from '../../../store/useLocationStore';
import { Loader2 } from 'lucide-react';

export default function ExplorePage() {
  const { user } = useAuthStore();
  const { location } = useLocationStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Query explore data asynchronously from the service layer reactively when location changes
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const radiusKm = location?.radius ? parseInt(location.radius.replace(/[^0-9]/g, '')) : 10;
        const dashboardData = await exploreService.getExploreDashboardData({
          city: location?.city,
          latitude: location?.coordinates?.lat,
          longitude: location?.coordinates?.lng,
          radiusKm
        });
        setData(dashboardData);
      } catch (err) {
        console.error('Failed to resolve explore dashboard data', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location, retryCount]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar user={user} />
        <main className="flex-grow flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md bg-white border border-neutral-100 rounded-3xl p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <Loader2 className="h-7 w-7" />
            </div>
            <h1 className="font-poppins text-xl font-bold text-text-primary">
              We could not load nearby shops yet
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              The backend may still be waking up. Please try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-950"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Visual dashboard once data resolved
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Dynamic Header */}
      <Navbar user={user || data.currentUser} />

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
