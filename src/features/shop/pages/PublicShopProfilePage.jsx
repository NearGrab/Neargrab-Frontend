import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';

// Auth and services
import { useAuthStore } from '../../../store/useAuthStore';
import { shopProfileService } from '../services/shopProfileService';

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

// Review modal
import SubmitShopReviewModal from '../components/SubmitShopReviewModal';

export default function PublicShopProfilePage() {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [shopInfo, setShopInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadShopData = async () => {
      setLoading(true);
      try {
        const info = await shopProfileService.getShopProfile(shopId);
        setShopInfo(info);

        const prods = await shopProfileService.getProducts(shopId);
        setProducts(prods);

        const revs = await shopProfileService.getReviews(shopId);
        setReviews(revs);

        const upds = await shopProfileService.getUpdates(shopId);
        setUpdates(upds);
      } catch (err) {
        console.error('Failed to load public shop profile:', err);
      } finally {
        setLoading(false);
      }
    };
    if (shopId) {
      loadShopData();
    }
  }, [shopId]);

  const handleContactAction = async (actionType) => {
    let action = 'DIRECTIONS_OPEN';
    if (actionType === 'call') {
      action = 'CALL_CLICK';
    } else if (actionType === 'whatsapp') {
      action = 'WHATSAPP_CLICK';
    }
    
    // Log the analytics lead action non-blocking
    shopProfileService.trackLead(shopId, action);
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    const result = await shopProfileService.submitReview(shopId, { rating, comment });
    
    // Dynamically insert into reviews list
    const newReview = {
      id: result.id || Date.now(),
      user: result.user?.name || 'You',
      reviewerName: result.user?.name || 'You',
      avatar: result.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
      rating,
      time: 'Just now',
      dateRelative: 'Just now',
      verifiedPurchase: true,
      isVerified: true,
      comment
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate average rating locally
    setShopInfo(prev => {
      if (!prev) return null;
      const count = (prev.reviewCount || 0) + 1;
      const newRating = (((prev.rating || 5) * (prev.reviewCount || 0) + rating) / count).toFixed(1);
      return {
        ...prev,
        reviewCount: count,
        rating: parseFloat(newRating)
      };
    });
  };

  const handleFollowClick = () => {
    if (!isAuthenticated) {
      if (confirm('You must be logged in to follow shops. Would you like to log in now?')) {
        navigate('/login', { state: { from: window.location.pathname } });
      }
      return;
    }
    setIsFollowing(prev => !prev);
  };

  const tabChoices = [
    { id: 'Overview', label: 'Overview', count: null },
    { id: 'Products', label: 'Products', count: products.length },
    { id: 'Reviews', label: 'Reviews', count: reviews.length },
    { id: 'Photos', label: 'Photos', count: shopInfo?.photos?.length || 0 },
    { id: 'Updates', label: 'Updates', count: updates.length }
  ];

  if (loading) {
    return (
      <div className="bg-[#F9FAFB] min-h-screen text-text-primary font-inter flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand-900/10 border-t-brand-900 rounded-full animate-spin"></div>
            <span className="text-sm font-poppins font-bold text-text-secondary animate-pulse">Loading storefront details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!shopInfo) {
    return (
      <div className="bg-[#F9FAFB] min-h-screen text-text-primary font-inter flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-20 gap-4 text-center">
          <h2 className="font-poppins font-extrabold text-2xl text-text-primary">Shop Profile Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-brand-900 text-white rounded-full font-bold text-xs shadow-md cursor-pointer"
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-text-primary font-inter flex flex-col pb-16 justify-between">
      <div>
        <Navbar />

        <main className="w-full px-4 sm:px-6 mt-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full text-left relative">
            
            {/* LEFT COLUMN: Profile summaries */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <ShopProfileSummaryCard
                shopInfo={{
                  ...shopInfo,
                  followersCount: isFollowing ? '15.3K' : '15.2K'
                }}
                isManageMode={false}
                onFollowClick={handleFollowClick}
              />
              <ContactActionsCard 
                shopInfo={shopInfo} 
                onAction={handleContactAction}
              />
              <SocialLinksCard socialLinks={shopInfo.socialLinks} />
            </div>

            {/* CENTER COLUMN: Tabs view feed */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              
              {/* Cover Banner hero */}
              <ShopCoverBanner
                coverImage={shopInfo.coverImage}
                photosCount={shopInfo.photos?.length || 0}
                isManageMode={false}
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
                    description={shopInfo.description}
                  />
                )}

                {activeTab === 'Products' && (
                  <ShopProductsGrid
                    products={products}
                    isManageMode={false}
                    onViewAll={() => setActiveTab('Products')}
                  />
                )}

                {activeTab === 'Reviews' && (
                  <div className="flex flex-col gap-4">
                    {/* Public review writer promotion */}
                    <div className="flex justify-between items-center bg-white border border-neutral-100 p-4 rounded-2xl shadow-3xs">
                      <div className="text-left">
                        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">Share your feedback</h4>
                        <p className="text-[10px] text-text-muted mt-0.5">Been to this shop? Let others know how your experience was!</p>
                      </div>
                      <button
                        onClick={() => {
                          if (!isAuthenticated) {
                            if (confirm('You must be logged in to review this shop. Would you like to log in now?')) {
                              navigate('/login', { state: { from: window.location.pathname } });
                            }
                            return;
                          }
                          setIsReviewModalOpen(true);
                        }}
                        className="px-4 py-2 bg-brand-900 text-white rounded-full font-poppins font-bold text-xs hover:bg-brand-800 transition-colors shadow-3xs cursor-pointer whitespace-nowrap"
                      >
                        Write a Review
                      </button>
                    </div>
                    <ShopReviewsManager reviews={reviews} />
                  </div>
                )}

                {activeTab === 'Photos' && (
                  <ShopPhotosGallery
                    photos={shopInfo.photos || []}
                    isManageMode={false}
                  />
                )}

                {activeTab === 'Updates' && (
                  <ShopUpdatesManager
                    updates={updates}
                    isManageMode={false}
                  />
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: Business parameters sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <ShopTrustCard />
              <ShopTimingsCard
                timings={shopInfo.timings}
                isManageMode={false}
              />
              <PaymentMethodsCard paymentMethods={shopInfo.paymentMethods} />
              <LatestShopUpdatesCard
                updates={updates}
                onViewAll={() => setActiveTab('Updates')}
              />
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* Review Submission Modal Dialog */}
      <SubmitShopReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        shopInfo={shopInfo}
        onSubmitSuccess={handleReviewSubmit}
      />
    </div>
  );
}
