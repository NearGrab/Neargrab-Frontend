import React, { useEffect } from 'react';
import { ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import ShopkeeperLayout from '../layout/ShopkeeperLayout';
import Button from '../../../shared/components/ui/Button';
import { useShopkeeperDashboardStore } from '../../../store/useShopkeeperDashboardStore';

// Workspace components
import DashboardStats from '../components/dashboard/DashboardStats';
import PerformanceOverview from '../components/dashboard/PerformanceOverview';
import TopActionsPanel from '../components/dashboard/TopActionsPanel';
import QuickActions from '../components/dashboard/QuickActions';
import RecentReviews from '../components/dashboard/RecentReviews';
import OutOfStockAlerts from '../components/dashboard/OutOfStockAlerts';

// Right sidebar widgets
import ShopProfileCard from '../components/dashboard/ShopProfileCard';
import QRCodeCard from '../components/dashboard/QRCodeCard';
import GrowthTipsCard from '../components/dashboard/GrowthTipsCard';

export default function ShopkeeperDashboardPage() {
  const { fetchDashboardData, isLoading, error, shopProfile } = useShopkeeperDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleViewProfile = () => {
    if (shopProfile?.username) {
      window.open(`/shops/${shopProfile.username}`, '_blank');
    } else {
      window.open('/explore', '_blank');
    }
  };

  // Compile right sidebar column widgets
  const rightSidebar = (
    <div className="flex flex-col gap-6">
      <ShopProfileCard />
      <QRCodeCard />
      <GrowthTipsCard />
    </div>
  );

  if (isLoading && !shopProfile) {
    return (
      <ShopkeeperLayout rightSidebar={rightSidebar}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
          <span className="font-poppins font-bold text-sm text-text-secondary">Loading dashboard analytics...</span>
        </div>
      </ShopkeeperLayout>
    );
  }

  if (error && !shopProfile) {
    return (
      <ShopkeeperLayout rightSidebar={rightSidebar}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6 text-center max-w-md mx-auto">
          <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-full flex items-center justify-center text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-poppins font-bold text-lg text-text-primary">Failed to load Dashboard</h2>
            <p className="text-xs text-text-secondary mt-1">{error}</p>
          </div>
          <button
            onClick={() => fetchDashboardData()}
            className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs font-poppins transition-all shadow-sm"
          >
            Retry Loading
          </button>
        </div>
      </ShopkeeperLayout>
    );
  }

  return (
    <ShopkeeperLayout rightSidebar={rightSidebar}>
      <div className="flex flex-col gap-6 w-full text-left font-inter">
        
        {/* 1. Welcome Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="text-left">
            <h1 className="font-poppins font-bold text-lg md:text-2xl text-text-primary flex items-center gap-1.5 leading-tight">
              Welcome back, {shopProfile?.name || 'Shopkeeper'}! 👋
            </h1>
            <p className="text-[11px] md:text-xs text-text-muted mt-1 font-medium">
              Here's what's happening with your shop today.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProfile}
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            className="self-start sm:self-center font-bold text-[11px] h-9 md:h-10 cursor-pointer shadow-3xs"
          >
            View Shop Profile
          </Button>
        </div>

        {/* 2. Stats Section */}
        <section className="w-full">
          <DashboardStats />
        </section>

        {/* 3. Performance & Top Actions Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
          <div className="lg:col-span-2">
            <PerformanceOverview />
          </div>
          <div className="lg:col-span-1">
            <TopActionsPanel />
          </div>
        </section>

        {/* 4. Quick Actions Shortcuts */}
        <section className="w-full">
          <QuickActions />
        </section>

        {/* 5. Feedback Reviews & Inventory Alarms */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          <RecentReviews />
          <OutOfStockAlerts />
        </section>

      </div>
    </ShopkeeperLayout>
  );
}
