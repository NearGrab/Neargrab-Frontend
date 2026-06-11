import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/layout/Navbar';

// Zustand store
import useShopProfileStore from '../../../store/useShopProfileStore';

// Left Side Components
import ShopProfileSummaryCard from '../../shopkeeper/components/profile/ShopProfileSummaryCard';
import ContactActionsCard from '../../shopkeeper/components/profile/ContactActionsCard';
import SocialLinksCard from '../../shopkeeper/components/profile/SocialLinksCard';

// Shared Storefront Components
import ShopCoverBanner from '../components/ShopCoverBanner';
import ShopOverviewSection from '../components/ShopOverviewSection';
import ShopProductsGrid from '../components/ShopProductsGrid';
import ShopReviewsManager from '../components/ShopReviewsManager';
import ShopPhotosGallery from '../components/ShopPhotosGallery';
import ShopUpdatesManager from '../components/ShopUpdatesManager';

// Right Side Components
import ShopTrustCard from '../../shopkeeper/components/profile/ShopTrustCard';
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
    { id: 'Overview', label: 'Overview', count: null },
    { id: 'Products', label: 'Products', count: store.products.length },
    { id: 'Reviews', label: 'Reviews', count: store.reviews.length },
    { id: 'Photos', label: 'Photos', count: store.photos.length },
    { id: 'Updates', label: 'Updates', count: store.updates.length }
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

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-text-primary font-inter flex flex-col pb-28 relative">
      
      {/* 1. Public client header navigation */}
      <Navbar />

      {/* 2. Main Page Grid container */}
      <main className="w-full px-6 mt-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full text-left relative">
          
          {/* LEFT COLUMN: Profile summaries (span 3 on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <ShopProfileSummaryCard
              shopInfo={store.shopInfo}
              isManageMode={true}
              onEditClick={() => setIsEditModalOpen(true)}
            />
            <ContactActionsCard shopInfo={store.shopInfo} />
            <SocialLinksCard socialLinks={store.socialLinks} />
          </div>

          {/* CENTER COLUMN: Tabs view feed (span 6 on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Cover Banner hero */}
            <ShopCoverBanner
              coverImage={store.shopInfo.coverImage}
              photosCount={store.photos.length}
              isManageMode={true}
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
            <ShopTrustCard />
            <ShopTimingsCard
              timings={store.timings}
              isManageMode={true}
              onEditTimings={() => setIsEditModalOpen(true)}
            />
            <PaymentMethodsCard paymentMethods={store.paymentMethods} />
            <LatestShopUpdatesCard
              updates={store.updates}
              onViewAll={() => setActiveTab('Updates')}
            />
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
