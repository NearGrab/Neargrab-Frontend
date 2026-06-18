import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';
import ProductDirectionsMap from '../components/ProductDirectionsMap';
import ProductReviewsBreakdown from '../components/ProductReviewsBreakdown';
import ProductShopHeaderCard from '../components/ProductShopHeaderCard';
import FeedbackCollector from '../components/FeedbackCollector';
import ReviewProductModal from '../components/ReviewProductModal';
import ReviewCard from '../../../shared/components/ReviewCard';
import Button from '../../../shared/components/ui/Button';
import { productService } from '../services/productService';
import { shopProfileService } from '../../shop/services/shopProfileService';
import { ChevronLeft, Star, Store, ShieldCheck, Info } from 'lucide-react';

export default function ProductMapPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get('shopId');
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [initialReviewRating, setInitialReviewRating] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadPageData = async () => {
      setLoading(true);
      try {
        const idToFetch = productId || 'prod-fortune-1l';
        const prodData = await productService.getProductDetails(idToFetch);
        const mapReviews = await productService.getMapReviews(idToFetch);
        const storeData = await productService.getAvailableStores(idToFetch);

        setProduct(prodData);
        setReviews(mapReviews);
        setStores(storeData);
      } catch (err) {
        console.error('Failed to load product map details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, [productId]);

  const mainStore = product ? {
    id: product.soldBy?.id,
    name: product.soldBy?.name,
    verified: product.soldBy?.verified,
    distance: product.soldBy?.distance,
    price: product.price,
    rating: product.soldBy?.rating,
    reviewsCount: product.soldBy?.reviewsCount,
    address: product.soldBy?.address,
    image: product.soldBy?.image,
    googleMapsUrl: product.soldBy?.googleMapsUrl
  } : null;

  const activeStore = (shopId === product?.soldBy?.id)
    ? mainStore
    : (stores.find(s => s.id === shopId) || (shopId ? null : mainStore) || stores[0] || mainStore);

  const handleDirectionsClick = async () => {
    if (!activeStore) return;
    
    // Non-blocking trackLead event
    shopProfileService.trackLead(activeStore.id, 'MAP_OPEN', 'PRODUCT_MAP');
    
    if (activeStore.googleMapsUrl) {
      window.open(activeStore.googleMapsUrl, '_blank', 'noopener,noreferrer');
    } else {
      const query = encodeURIComponent(`${activeStore.name}, ${activeStore.address}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand-900/10 border-t-brand-900 rounded-full animate-spin"></div>
            <span className="text-sm font-poppins font-bold text-text-secondary animate-pulse">Loading shop coordinates...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product || !activeStore) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-20 gap-4 text-center">
          <h2 className="font-poppins font-extrabold text-2xl text-text-primary">Shop Details Not Found</h2>
          <p className="text-sm text-text-secondary font-inter">The selected store carrying this product is not available nearby.</p>
          <Link to="/search" className="px-6 py-2.5 bg-brand-900 text-white rounded-full font-bold text-xs shadow-md">
            Back to Search
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Global navbar header */}
      <Navbar />

      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-4 sm:py-6 mb-16">
        
        {/* BACK TO PRODUCT NAVIGATION TRIGGER */}
        <div className="flex items-center mb-6">
          <Link
            to={`/product/${productId}`}
            className="flex items-center gap-1 font-poppins font-extrabold text-xs sm:text-sm text-text-secondary hover:text-brand-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3px] text-text-secondary hover:text-brand-900" />
            <span>Back to product</span>
          </Link>
        </div>

        {/* 2-COLUMN MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT AREA: Product Summary Header + Large Route Map + Store Card */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-7 w-full">
            
            {/* 1. PRODUCT SUMMARY HEADER CARD */}
            <ProductShopHeaderCard product={product} />

            {/* 2. DIRECTIONS MAP BLOCK */}
            <ProductDirectionsMap 
              storeName={activeStore.name} 
              distance={`${activeStore.distance} km`} 
              address={activeStore.address} 
              onDirectionsClick={handleDirectionsClick}
            />

            {/* 3. STORE SPECIFICATIONS BOTTOM PROFILE CARD */}
            <div className="bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col sm:flex-row gap-5 items-center justify-between">
              
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <img 
                  src={activeStore.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'} 
                  alt={activeStore.name} 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-neutral-200 shadow-sm shrink-0"
                />
                
                <div className="leading-tight">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <h2 className="text-sm sm:text-base font-extrabold text-text-primary">{activeStore.name}</h2>
                    {activeStore.verified && (
                      <span className="w-3.5 h-3.5 bg-[#0B3B2C] text-white rounded-full flex items-center justify-center scale-75 shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs text-text-muted font-bold mt-1">
                    Grocery, Daily Needs, Household
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary font-medium font-inter mt-1.5 max-w-[340px]">
                    {activeStore.address}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-2.5 text-[10px] sm:text-xs font-bold text-text-secondary font-inter">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                      <span className="text-text-primary">{activeStore.rating || 4.5}</span>
                      <span className="text-text-muted font-normal">({activeStore.reviewsCount || 128} reviews)</span>
                    </div>
                    <span className="text-text-muted font-normal">•</span>
                    <div>
                      <span className="text-text-primary">2K+</span> <span className="text-text-muted font-normal">Happy customers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action trigger button */}
              <Button
                onClick={() => {
                  if (activeStore.id) {
                    navigate(`/shops/${activeStore.id}`);
                  }
                }}
                variant="outline"
                size="sm"
                className="!py-2.5 !px-5 mt-4 sm:mt-0 w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5"
                leftIcon={<Store className="w-4 h-4 text-text-secondary" />}
              >
                Check Store Profile
              </Button>

            </div>

          </div>

          {/* RIGHT COLUMN SIDEBAR: Breakdown Card + Reviews list + Rating stars */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full sticky top-24 z-10">
            
            {/* 1. REVIEWS ANALYSIS BREAKDOWN */}
            <ProductReviewsBreakdown 
              rating={product.rating} 
              reviewsCount={product.reviewsCount} 
              storeName={activeStore.name} 
            />

            {/* 2. REUSABLE THUMBNAIL-RICH RECENT REVIEWS FEED */}
            <div className="bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-poppins font-extrabold text-text-muted text-[11px] uppercase tracking-wider">
                  Recent reviews
                </h3>
              </div>

              {/* Stack of customized reviews items with thumbnail graphics */}
              <div className="flex flex-col gap-3.5">
                {reviews.map((rev) => (
                  <ReviewCard
                    key={rev.id}
                    avatar={rev.avatar}
                    user={rev.user}
                    time={rev.time}
                    rating={rev.rating}
                    comment={rev.comment}
                    verifiedPurchase={rev.verifiedPurchase}
                    thumbnail={rev.thumbnail}
                  />
                ))}
              </div>

              {/* View all reviews outliner */}
              <button
                onClick={() => alert('Full reviews listing database panel coming soon!')}
                className="w-full py-2.5 border border-neutral-200 hover:bg-neutral-50 text-text-primary rounded-full font-poppins font-bold text-xs cursor-pointer select-none transition-colors mt-2 text-center font-inter"
              >
                View all reviews
              </button>
            </div>

            {/* 3. FEEDBACK STAR SELECTOR COLLECTION */}
            <FeedbackCollector 
              onOpenReviewModal={(rating) => {
                setInitialReviewRating(rating);
                setIsReviewModalOpen(true);
              }} 
            />

          </div>

        </div>

      </main>

      {/* 4. PRIVACY METRICS AND REVIEW LIMIT FOOTER CARD */}
      <div className="w-full bg-white border-t border-neutral-200 py-3.5 px-4 select-none mb-0">
        <div className="max-w-[115rem] mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[9px] sm:text-[10px] font-bold text-text-secondary font-inter">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>We show only real experiences from actual customers.</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-text-muted" />
            <span>Review limit: You can add 3 reviews today.</span>
          </div>
        </div>
      </div>

      {/* Dynamic Review Submission Modal Dialog */}
      <ReviewProductModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
        initialRating={initialReviewRating}
        onSubmitSuccess={(newReview) => {
          setReviews((prev) => [newReview, ...prev]);
        }}
      />

      {/* Layout footer component */}
      <Footer />
    </div>
  );
}
