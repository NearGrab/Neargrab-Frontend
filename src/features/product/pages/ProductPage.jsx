import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';
import ProductImages from '../components/ProductImages';
import ProductInfo from '../components/ProductInfo';
import AvailableAtStores from '../components/AvailableAtStores';
import SimilarProducts from '../components/SimilarProducts';
import SoldByCard from '../components/SoldByCard';
import AddressCard from '../components/AddressCard';
import ReviewCard from '../../../shared/components/ReviewCard';
import Button from '../../../shared/components/ui/Button';
import { productService } from '../services/productService';
import { useLocationStore } from '../../../store/useLocationStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { ChevronRight, ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { location: userLoc } = useLocationStore();
  const { isAuthenticated } = useAuthStore();

  const [product, setProduct] = useState(null);
  const [stores, setStores] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Smooth scroll back to top upon product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadProductData = async () => {
      setLoading(true);
      try {
        const idToFetch = productId || 'prod-fortune-1l';
        const prodData = await productService.getProductDetails(idToFetch);
        
        const radiusKm = userLoc?.radius ? parseInt(userLoc.radius.replace(/[^0-9]/g, '')) : 10;
        const locationParams = {
          city: userLoc?.city,
          latitude: userLoc?.coordinates?.lat,
          longitude: userLoc?.coordinates?.lng,
          radiusKm
        };
        const storeData = await productService.getAvailableStores(idToFetch, locationParams);
        const reviewData = await productService.getTopReviews(idToFetch);

        setProduct(prodData);
        setStores(storeData);
        setReviews(reviewData);

        if (prodData) {
          productService.trackProductView(idToFetch, prodData.soldBy?.id);
          productService.trackProductClick(idToFetch);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [productId, userLoc]);

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      if (confirm('You must be logged in to save products to your wishlist. Would you like to log in now?')) {
        navigate('/login', { state: { from: window.location.pathname } });
      }
      return;
    }

    try {
      if (product.isSaved) {
        await productService.unsaveProduct(product.id);
        setProduct(prev => ({ ...prev, isSaved: false }));
      } else {
        await productService.saveProduct(product.id);
        setProduct(prev => ({ ...prev, isSaved: true }));
      }
    } catch (err) {
      console.error('Failed to toggle wishlist status:', err);
    }
  };

  const handleReportClick = async () => {
    const message = prompt('Please describe what information is incorrect or missing (e.g. Price, Description, Images):');
    if (!message || !message.trim()) return;

    try {
      await productService.createProductFeedback(product.id, {
        type: 'PRODUCT_REPORT',
        subject: 'Incorrect Product Info',
        message
      });
      alert('Thank you for your feedback! We will review and update this listing shortly.');
    } catch (err) {
      console.error('Failed to submit product feedback:', err);
      alert('Failed to submit report. Please try again later.');
    }
  };

  const handleOpenReviews = () => {
    alert('Full customer reviews and testimonials panel coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand-900/10 border-t-brand-900 rounded-full animate-spin"></div>
            <span className="text-sm font-poppins font-bold text-text-secondary animate-pulse">Loading product specifications...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-20 gap-4 text-center">
          <h2 className="font-poppins font-extrabold text-2xl text-text-primary">Product Not Found</h2>
          <p className="text-sm text-text-secondary font-inter">The requested product could not be located in our nearby database.</p>
          <Link to="/search" className="px-6 py-2.5 bg-brand-900 text-white rounded-full font-bold text-xs shadow-md">
            Back to Search
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { soldBy } = product;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Dynamic Navigation Header */}
      <Navbar />

      {/* Main Grid Content Wrapper */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-4 sm:py-6 mb-20">
        
        {/* Dynamic Breadcrumbs Nav */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold font-inter text-text-secondary mb-4 sm:mb-6 select-none bg-white py-2 px-4 rounded-xl border border-neutral-100 w-fit">
          <Link to="/explore" className="hover:text-brand-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-text-muted shrink-0" />
          <Link to="/search" className="hover:text-brand-900 transition-colors">Search</Link>
          <ChevronRight className="w-3 h-3 text-text-muted shrink-0" />
          <span className="text-text-muted truncate max-w-[150px] sm:max-w-none">
            {product.specs?.[2] || 'Grocery'}
          </span>
          <ChevronRight className="w-3 h-3 text-text-muted shrink-0" />
          <span className="text-brand-900 truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        {/* Back Link on Mobile */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-poppins font-bold text-xs text-text-secondary hover:text-brand-900 mb-4 cursor-pointer select-none md:hidden"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" />
          <span>Back to Search Results</span>
        </button>

        {/* 3-Column Visual Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT CONTENT AREA: Gallery + Spec Details + Store Inventory COMPARATOR (Spans 8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8 w-full">
            
            {/* Gallery + Product Titles Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Product Gallery Card: Boxed with light gray border (Spans 5 Cols on desktop) */}
              <div className="md:col-span-5 w-full bg-white border border-neutral-100 rounded-3xl p-4 sm:p-5 shadow-sm">
                <ProductImages 
                  images={product.images} 
                  productName={product.name} 
                  discount={product.discount} 
                  isSaved={product.isSaved}
                  onSaveToggle={handleSaveToggle}
                />
              </div>

              {/* Product Information: Flows naturally on the page canvas (Spans 7 Cols on desktop) */}
              <div className="md:col-span-7 w-full pl-0 md:pl-2 flex flex-col gap-6 justify-between">
                <ProductInfo product={product} onReportClick={handleReportClick} />

                {/* Mobile SoldBy Widget: Displayed immediately below product description on mobile screens */}
                <div className="block lg:hidden w-full mt-4">
                  <SoldByCard soldBy={soldBy} />
                </div>
              </div>
            </div>


            {/* Similar Products carousel list */}
            <SimilarProducts 
              productId={product.id}
              brand={product.brand} 
              category={product.category} 
            />

          </div>

          {/* RIGHT SIDEBAR LAYOUT: SoldBy Card + Address Card + List Product Card (Spans 4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full sticky top-24 z-10">
            
            {/* 1. SOLD BY SHOP PROFILE CARD (Desktop only) */}
            <div className="hidden lg:block w-full">
              <SoldByCard soldBy={soldBy} />
            </div>

            {/* 2. PHYSICAL ADDRESS & SVG MINI ROUTE MAP CARD */}
            <AddressCard address={soldBy.address} />

            {/* 3. LIST YOUR PRODUCT CTA CONVERSION CARD */}
            <div className="w-full max-w-[380px] mx-auto lg:max-w-none bg-[#0B3B2C] text-white p-5 rounded-3xl relative overflow-hidden shadow-md border border-brand-800 flex justify-between min-h-[9rem] text-left">
              {/* Subtle decorative circles */}
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-brand-500/20 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="flex flex-col justify-between flex-grow z-10">
                <div>
                  <h3 className="font-poppins font-bold text-sm text-white leading-tight">
                    Have this product? List it on Neargrab
                  </h3>
                  <p className="text-brand-100 text-[10px] sm:text-xs leading-relaxed mt-1 font-inter max-w-[85%]">
                    Get more visibility and attract nearby customers.
                  </p>
                </div>
                
                <Button 
                  onClick={() => alert('Merchant onboard program details coming soon!')}
                  variant="secondary"
                  size="sm"
                  className="!bg-white !text-[#0B3B2C] !px-4.5 !py-1.8 hover:!bg-brand-50 mt-3 w-fit"
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  List Your Product
                </Button>
              </div>

              {/* Graphic Shopkeeper Illustration SVG */}
              <div className="w-18 h-18 shrink-0 self-end -mb-3 opacity-90 z-0">
                <svg className="w-full h-full text-brand-500/40" viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="24" width="48" height="32" rx="4" fill="currentColor" opacity="0.25" />
                  <path d="M4 24L32 8L60 24H4Z" fill="#FBBF24" />
                  <rect x="24" y="38" width="16" height="18" fill="#0B3B2C" />
                </svg>
              </div>
            </div>

            {/* 4. TOP REVIEWS LISTING WIDGET */}
            <div className="w-full max-w-[380px] mx-auto lg:max-w-none bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-poppins font-extrabold text-text-muted text-[11px] uppercase tracking-wider">
                  Top reviews
                </h3>
                <button
                  onClick={handleOpenReviews}
                  className="text-[10px] font-bold text-brand-900 hover:text-brand-800 hover:underline cursor-pointer transition-all"
                >
                  View all reviews
                </button>
              </div>

              {/* Stack of review cards */}
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
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Global layout Footer */}
      <Footer />
    </div>
  );
}
