import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Bookmark, 
  MapPin, 
  ShoppingBag, 
  ArrowRight, 
  Sliders, 
  ChevronDown, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { useCartStore } from '../../../store/useCartStore';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';

// Subcomponents
import CartItemsSection from '../components/CartItemsSection';
import OrderSummarySidebar from '../components/OrderSummarySidebar';
import ClearCartModal from '../components/ClearCartModal';
import RouteModal from '../components/RouteModal';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, addItem } = useCartStore();

  const [loading, setLoading] = useState(true);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleClearCart = () => {
    localStorage.setItem('neargrab_cart_cleared', 'true');
    clearCart();
  };

  const handleSaveForLater = () => {
    alert('All items in your cart have been saved for later in your bookmarks tab!');
  };

  const handleCheckoutClick = () => {
    // Checkout is currently disabled in the frontend
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
        <span className="font-poppins font-semibold text-text-primary text-sm tracking-wide animate-pulse">
          Loading Shopping Cart...
        </span>
      </div>
    );
  }

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueShopsCount = new Set(items.map(item => item.store)).size;

  const categories = [
    'Grocery',
    'Dairy',
    'Snacks',
    'Personal Care',
    'Household',
    'Electronics',
    'Hardware',
    'Stationery'
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Navbar />

      {/* 2. Categories Sub-navigation bar */}
      <div className="w-full bg-white border-b border-neutral-100/60 shadow-sm shadow-neutral-100/5 py-1.5 hidden md:block">
        <div className="max-w-[115rem] mx-auto px-4 md:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border border-neutral-200/50 hover:bg-neutral-100 rounded-xl font-poppins font-bold text-text-primary cursor-pointer transition-colors">
              <span>☰ Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
            </button>
            
            <div className="flex items-center gap-3.5 text-text-secondary font-medium font-poppins">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(cat)}`)}
                  className="hover:text-brand-900 transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
              <span className="text-text-muted cursor-pointer hover:text-brand-900 flex items-center gap-0.5">
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/explore')}
            className="px-4 py-2 bg-emerald-50 text-brand-900 border border-emerald-100/40 rounded-full font-poppins font-bold flex items-center gap-1.5 hover:bg-emerald-100/60 transition-colors cursor-pointer"
          >
            <span>Support Local</span>
            <span>🍃</span>
          </button>
        </div>
      </div>

      {/* 3. Main Workspace Cart Layout */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-8 mb-24 text-left">
        
        {items.length === 0 ? (
          /* Empty State fallback */
          <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-12 text-center max-w-lg mx-auto mt-12 transition-all hover:shadow-md">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-900 mx-auto mb-5 shadow-sm shadow-brand-900/5">
              <ShoppingBag className="w-10 h-10 text-brand-700" />
            </div>
            <h2 className="font-poppins font-extrabold text-lg md:text-xl text-text-primary">
              Your Cart is Empty 🍃
            </h2>
            <p className="text-xs md:text-sm text-text-secondary mt-2.5 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added any products from neighborhood shops to your basket yet.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  // Restore ability to load pre-populate demo items
                  localStorage.removeItem('neargrab_cart_cleared');
                  navigate('/explore');
                }}
                className="px-8 py-3 bg-brand-900 hover:bg-brand-800 text-white rounded-full font-poppins font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer shadow-md shadow-brand-900/10 transition-all hover:scale-105"
              >
                <span>Explore Nearby Shops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Cart Grid Layout */
          <div className="flex flex-col gap-6">
            
            {/* Header Title Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/50">
              <div>
                <h1 className="font-poppins font-black text-2xl md:text-3xl text-text-primary flex items-baseline gap-2">
                  My Cart
                  <span className="text-sm md:text-base font-semibold text-text-secondary">
                    ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
                  </span>
                </h1>
                <span className="text-xs text-text-secondary font-medium block mt-1">
                  Items from {uniqueShopsCount} {uniqueShopsCount === 1 ? 'shop' : 'shops'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsClearModalOpen(true)}
                  className="px-4 py-2 border border-neutral-200 text-text-secondary hover:text-red-500 hover:border-red-200 font-poppins font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer bg-white transition-colors"
                >
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <span>Clear Cart</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveForLater}
                  className="px-4 py-2 border border-neutral-200 text-text-secondary hover:text-brand-900 hover:border-brand-300 font-poppins font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer bg-white transition-colors"
                >
                  <Bookmark className="w-4 h-4 shrink-0" />
                  <span>Save all for later</span>
                </button>
              </div>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN (Store group cards list) */}
              <div className="lg:col-span-8 flex flex-col gap-5 w-full">
                {/* No Delivery Fee Urgency Banner card */}
                <div className="bg-white rounded-3xl border border-neutral-200/50 p-4 shadow-sm flex items-center justify-between gap-4 overflow-hidden relative transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-900 shrink-0">
                      🛵
                    </div>
                    <div>
                      <span className="block font-poppins font-extrabold text-xs md:text-sm text-text-primary">
                        No delivery fee. Buy nearby and save more.
                      </span>
                      <span className="block text-[10px] md:text-xs text-text-secondary mt-0.5 font-medium leading-relaxed">
                        Select your preferred shops and visit to pick up your items.
                      </span>
                    </div>
                  </div>

                  {/* Shop illustration details */}
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <div className="w-px h-10 bg-neutral-100" />
                    <div className="w-16 h-12 flex items-center justify-center text-3xl shrink-0">
                      🏪
                    </div>
                  </div>
                </div>

                {/* Main Shops grouping cards */}
                <CartItemsSection
                  items={items}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  onViewRoute={() => setIsRouteModalOpen(true)}
                />
              </div>

              {/* RIGHT COLUMN (Order Summary checkouts) */}
              <div className="lg:col-span-4 flex flex-col gap-5 w-full">
                <OrderSummarySidebar
                  items={items}
                  onCheckoutClick={handleCheckoutClick}
                />
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Spacer container to offset the overlap of footer's CTA card */}
      <div className="h-28 md:h-36"></div>

      {/* 4. Global Footer Component */}
      <Footer />

      {/* Confirms & Routing Modals */}
      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
      />

      <RouteModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
      />
    </div>
  );
}
