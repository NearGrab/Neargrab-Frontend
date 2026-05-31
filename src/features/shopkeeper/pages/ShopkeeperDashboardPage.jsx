import React from 'react';
import { ExternalLink } from 'lucide-react';
import ShopkeeperLayout from '../layout/ShopkeeperLayout';
import Button from '../../../shared/components/ui/Button';

// Workspace components
import DashboardStats from '../components/dashboard/DashboardStats';
import PerformanceOverview from '../components/dashboard/PerformanceOverview';
import TopActionsPanel from '../components/dashboard/TopActionsPanel';
import QuickActions from '../components/dashboard/QuickActions';
import RecentReviews from '../components/dashboard/RecentReviews';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';

// Right sidebar widgets
import ShopProfileCard from '../components/dashboard/ShopProfileCard';
import QRCodeCard from '../components/dashboard/QRCodeCard';
import GrowthTipsCard from '../components/dashboard/GrowthTipsCard';

export default function ShopkeeperDashboardPage() {
  
  const handleViewProfile = () => {
    window.open('/explore', '_blank');
  };

  // Compile right sidebar column widgets
  const rightSidebar = (
    <div className="flex flex-col gap-6">
      <ShopProfileCard />
      <QRCodeCard />
      <GrowthTipsCard />
    </div>
  );

  return (
    <ShopkeeperLayout rightSidebar={rightSidebar}>
      <div className="flex flex-col gap-6 w-full text-left font-inter">
        
        {/* 1. Welcome Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="text-left">
            <h1 className="font-poppins font-bold text-lg md:text-2xl text-text-primary flex items-center gap-1.5 leading-tight">
              Welcome back, Patel! 👋
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
          <LowStockAlerts />
        </section>

      </div>
    </ShopkeeperLayout>
  );
}
