import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/layout/Navbar';
import { Info, Package, MessageSquare, Camera, Bell } from 'lucide-react';

// Zustand store
import useShopProfileStore from '../../../store/useShopProfileStore';

// Left Side Components
import ShopProfileSidebar from '../components/ShopProfileSidebar';
import ContactActionsCard from '../../shopkeeper/components/profile/ContactActionsCard';
import SocialLinksCard from '../../shopkeeper/components/profile/SocialLinksCard';

// Shared Storefront Components
import ShopProfileHeader from '../components/ShopProfileHeader';
import ShopOverviewSection from '../components/ShopOverviewSection';
import ShopProductsGrid from '../components/ShopProductsGrid';
import ShopReviewsManager from '../components/ShopReviewsManager';
import ShopPhotosGallery from '../components/ShopPhotosGallery';
import ShopUpdatesManager from '../components/ShopUpdatesManager';

// Right Side Components
import ShopAnalyticsSummary from '../components/ShopAnalyticsSummary';
import ShopTimingsCard from '../../shopkeeper/components/profile/ShopTimingsCard';
import PaymentMethodsCard from '../../shopkeeper/components/profile/PaymentMethodsCard';
import LatestShopUpdatesCard from '../../shopkeeper/components/profile/LatestShopUpdatesCard';

// Modal Editor
import EditShopProfileModal from '../../shopkeeper/components/profile/EditShopProfileModal';

export default function ShopProfilePage() {
  const navigate = useNavigate();

  // Load shop profile state store
  const store = useShopProfileStore();

  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    store.fetchProfileData();
  }, []);

  // Tab choices list
  const tabChoices = [
    { id: 'Overview', label: 'Overview', icon: <Info className="w-4 h-4" />, count: null },
    { id: 'Products', label: 'Products', icon: <Package className="w-4 h-4" />, count: store.products.length },
    { id: 'Reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4" />, count: store.reviews.length },
    // { id: 'Photos', label: 'Photos', icon: <Camera className="w-4 h-4" />, count: store.photos.length },
    // { id: 'Updates', label: 'Updates', icon: <Bell className="w-4 h-4" />, count: store.updates.length }
  ];

  const handleSaveProfile = async (formData) => {
    await store.updateShopInfo(formData.shopInfo);
    await store.updateTimings(formData.timings);
    await store.updatePayments(formData.paymentMethods);
    setIsEditModalOpen(false);
    alert('Shop profile successfully updated!');
  };

  const handleEditProductRedirect = (id) => {
    navigate('/shopkeeper/products/add');
  };

  if (store.isLoading) {
    return (
      <div className="bg-[#F9FAFB] min-h-screen text-text-primary font-inter flex flex-col pb-28 relative">
        {/* Navbar */}
        <Navbar />

        {/* Skeleton Grid Loader */}
        <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-10 mb-24 animate-pulse">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full text-left relative">
            
            {/* LEFT COLUMN SKELETON */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <div className="bg-white rounded-3xl border border-neutral-200/50 p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-neutral-200 mb-4"></div>
                <div className="h-5 w-3/4 bg-neutral-200 rounded-md mb-2"></div>
                <div className="h-3.5 w-1/2 bg-neutral-100 rounded-md mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-neutral-100 rounded-full"></div>
                  <div className="h-6 w-16 bg-neutral-100 rounded-full"></div>
                </div>
                <div className="w-full border-t border-neutral-100 pt-4 flex flex-col gap-2">
                  <div className="h-3 w-full bg-neutral-100 rounded-md"></div>
                  <div className="h-3 w-2/3 bg-neutral-100 rounded-md"></div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl border border-neutral-200/50 p-4 hidden lg:flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-11 w-full bg-neutral-100 rounded-2xl" />
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200/50 p-4 flex flex-col gap-3">
                <div className="h-11 w-full bg-neutral-100 rounded-xl" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl" />
              </div>
            </div>

            {/* CENTER COLUMN SKELETON */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="bg-white rounded-3xl border border-neutral-200/50 overflow-hidden flex flex-col p-4 md:p-6 mb-6">
                <div className="w-full h-48 bg-neutral-200 rounded-2xl mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="h-8 w-16 bg-neutral-100 rounded-md"></div>
                    <div className="h-8 w-16 bg-neutral-100 rounded-md"></div>
                    <div className="h-8 w-16 bg-neutral-100 rounded-md"></div>
                  </div>
                  <div className="h-9 w-24 bg-neutral-200 rounded-xl"></div>
                </div>
              </div>

              <div className="flex gap-3 border-b border-neutral-200 pb-2">
                <div className="h-6 w-16 bg-neutral-200 rounded-md"></div>
                <div className="h-6 w-16 bg-neutral-100 rounded-md"></div>
                <div className="h-6 w-16 bg-neutral-100 rounded-md"></div>
                <div className="h-6 w-16 bg-neutral-100 rounded-md"></div>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200/50 p-6 flex flex-col gap-4">
                <div className="h-4 w-1/3 bg-neutral-200 rounded-md mb-2"></div>
                <div className="h-3.5 w-full bg-neutral-100 rounded-md"></div>
                <div className="h-3.5 w-full bg-neutral-100 rounded-md"></div>
                <div className="h-3.5 w-4/5 bg-neutral-100 rounded-md"></div>
              </div>
            </div>

            {/* RIGHT COLUMN SKELETON */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <div className="bg-white rounded-3xl border border-neutral-200/50 p-5 flex flex-col gap-4">
                <div className="h-4 w-1/2 bg-neutral-200 rounded-md"></div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="h-16 bg-neutral-100 rounded-2xl" />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200/50 p-5 flex flex-col gap-3">
                <div className="h-12 w-full bg-neutral-100 rounded-xl" />
                <div className="h-12 w-full bg-neutral-100 rounded-xl" />
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-text-primary font-inter flex flex-col pb-28 relative">
      
      {/* 1. Public client header navigation */}
      <Navbar />

      {/* 2. Main Page Grid container */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-10 mb-24">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full text-left relative">
          
          {/* LEFT COLUMN: Profile summaries (span 3 on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <ShopProfileSidebar
              shopInfo={store.shopInfo}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabChoices={tabChoices}
              isManageMode={true}
              onEditClick={() => setIsEditModalOpen(true)}
            />
            <ContactActionsCard shopInfo={store.shopInfo} />
            {/* <SocialLinksCard socialLinks={store.socialLinks} /> */}
          </div>

          {/* CENTER COLUMN: Tabs view feed (span 6 on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Cover Banner hero */}
            <ShopProfileHeader
              shopInfo={store.shopInfo}
              isManageMode={true}
              onEditClick={() => setIsEditModalOpen(true)}
              onCoverChange={(src) => store.addPhoto(src, 'cover')}
              onViewPhotos={() => setActiveTab('Photos')}
            />

            {/* Navigation tab links bar */}
            <div className="flex items-center gap-1 border-b border-neutral-200 pb-1.5 overflow-x-auto scrollbar-none select-none">
              {tabChoices.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-extrabold font-poppins transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-brand-900 text-brand-900'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md font-poppins ${
                      activeTab === tab.id
                        ? 'bg-[#E6F4EA] text-brand-900'
                        : 'bg-neutral-100 text-text-secondary'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Content view */}
            <div className="w-full">
              {activeTab === 'Overview' && (
                <ShopOverviewSection
                  description={store.shopInfo.description}
                />
              )}

              {activeTab === 'Products' && (
                <ShopProductsGrid
                  products={store.products}
                  shopInfo={store.shopInfo}
                  isManageMode={true}
                  onEditProduct={handleEditProductRedirect}
                  onToggleStock={store.toggleProductStock}
                  onViewAll={() => navigate('/shopkeeper/products')}
                />
              )}

              {activeTab === 'Reviews' && (
                <ShopReviewsManager reviews={store.reviews} />
              )}

              {activeTab === 'Photos' && (
                <ShopPhotosGallery
                  photos={store.photos}
                  isManageMode={true}
                  onUploadPhoto={store.addPhoto}
                  onDeletePhoto={store.deletePhoto}
                  onSetCoverPhoto={(src) => store.updateShopInfo({ coverImage: src })}
                />
              )}

              {activeTab === 'Updates' && (
                <ShopUpdatesManager
                  updates={store.updates}
                  isManageMode={true}
                  onAddUpdate={store.addUpdate}
                />
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Business parameters sidebar (span 3 on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <ShopAnalyticsSummary shopInfo={store.shopInfo} />
            <ShopTimingsCard
              timings={store.timings}
              isManageMode={true}
              onEditTimings={() => setIsEditModalOpen(true)}
            />
            <PaymentMethodsCard paymentMethods={store.paymentMethods} />
            {/* <LatestShopUpdatesCard
              updates={store.updates}
              onViewAll={() => setActiveTab('Updates')}
            /> */}
          </div>

        </div>
      </main>

      {/* 3. Sticky Switch Announcement Bar Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B3B2C] text-white border-t border-[#12634B]/25 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl z-40 select-none">
        <div className="text-left">
          <span className="font-poppins font-bold text-xs sm:text-sm block">
            This is a shopkeeper profile view
          </span>
          <span className="text-[10px] text-brand-100 font-bold block mt-0.5 leading-normal">
            You can still browse other local stores, check products, and buy items exactly like a standard customer.
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate('/shopkeeper/dashboard')}
          className="bg-white hover:bg-neutral-100 text-brand-900 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all duration-300 font-poppins shadow-3xs cursor-pointer shrink-0 active:scale-95 text-center"
        >
          Switch to Shopkeeper Dashboard
        </button>
      </div>

      {/* Profile Form modal editor */}
      <EditShopProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        shopInfo={store.shopInfo}
        timings={store.timings}
        paymentMethods={store.paymentMethods}
        onSave={handleSaveProfile}
      />

    </div>
  );
}
