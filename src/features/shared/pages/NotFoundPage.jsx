import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Store, 
  Star, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert 
} from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';
import tempExploreData from '../../explore/data/temp.json';

// High-quality mockup product card carousel data
const trendingSearches = [
  {
    id: 1,
    name: "Wireless Earbuds",
    badge: "In Demand",
    badgeType: "brand",
    storesInfo: "From 8+ shops near you",
    rating: 4.6,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    actionText: "View Shops"
  },
  {
    id: 2,
    name: "Study Lamps",
    badge: "Trending",
    badgeType: "brand",
    storesInfo: "From 6+ shops near you",
    rating: 4.5,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
    actionText: "View Shops"
  },
  {
    id: 3,
    name: "Sarees Collection",
    badge: "Popular",
    badgeType: "amber",
    storesInfo: "From 5+ shops near you",
    rating: 4.7,
    reviewsCount: 82,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    actionText: "View Shops"
  },
  {
    id: 4,
    name: "Gaming Mouse",
    badge: "In Demand",
    badgeType: "brand",
    storesInfo: "From 7+ shops near you",
    rating: 4.4,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80",
    actionText: "View Shops"
  },
  {
    id: 5,
    name: "Grocery Essentials",
    badge: "Essential",
    badgeType: "brand",
    storesInfo: "From 10+ shops near you",
    rating: 4.6,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    actionText: "View Shops"
  },
  {
    id: 6,
    name: "Local Provision Store",
    badge: "Top Rated",
    badgeType: "amber",
    storesInfo: "0.3 km away",
    rating: 4.8,
    reviewsCount: 120,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80",
    actionText: "View Shop"
  }
];

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const scrollRef = useRef(null);
  
  // Dynamic location / user resolution
  const currentUser = user || tempExploreData.currentUser;
  
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-inter selection:bg-brand-500 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Navbar user={currentUser} />

      {/* 2. Secondary Sub-Navbar Tabs */}
      <div className="w-full bg-white border-b border-neutral-100 hidden md:block">
        <div className="max-w-[115rem] mx-auto px-8 flex items-center justify-center gap-12 py-3.5 text-sm font-semibold text-text-secondary">
          <Link to="/" className="text-brand-900 border-b-2 border-brand-900 pb-1 px-1 transition-all cursor-pointer">
            Home
          </Link>
          <Link to="/explore" className="hover:text-brand-900 pb-1 px-1 transition-all cursor-pointer">
            Explore
          </Link>
          <Link to="/explore" className="hover:text-brand-900 pb-1 px-1 transition-all cursor-pointer">
            Reviews
          </Link>
          <Link to="/explore" className="hover:text-brand-900 pb-1 px-1 transition-all cursor-pointer">
            Shops
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col gap-12 md:gap-20">
        
        {/* 3. Hero Section (2-Column Grid on Desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          
          {/* Left Column: High Fidelity Vector Illustration */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-lg md:max-w-xl aspect-square bg-white rounded-[2.5rem] border border-neutral-200/50 shadow-xl overflow-hidden p-6 group hover:shadow-2xl transition-all duration-300">
              <img 
                src="/404-illustration.png" 
                alt="Neargrab 404 Illustration" 
                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Error Details and Action triggers */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Spark / Accent badges */}
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100 mb-6 text-amber-800 font-semibold text-xs animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Street Not Found</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-poppins font-bold text-brand-900 leading-tight tracking-tight mb-4 relative">
              Couldn't Find What<br />You're Looking For
              <span className="absolute -top-3 -right-6 text-amber-400 font-normal text-3xl hidden md:inline">✨</span>
            </h1>

            <p className="text-text-secondary text-base md:text-lg mb-6 max-w-xl leading-relaxed">
              This product, shop, or page may no longer exist or it hasn't reached your neighborhood yet.
            </p>

            {/* User Location Indicator */}
            <div className="flex items-center gap-2 mb-8 bg-neutral-100/50 border border-neutral-200/50 px-4 py-2.5 rounded-2xl">
              <MapPin className="w-4 h-4 text-brand-900" />
              <span className="text-xs font-semibold text-text-primary">
                You're in <span className="font-bold text-brand-900">{currentUser.location.city}, {currentUser.location.state}</span>
              </span>
              <button className="text-xs font-bold text-brand-500 hover:underline cursor-pointer ml-1">
                Change location
              </button>
            </div>

            <p className="text-text-secondary text-sm font-semibold mb-5">
              Try exploring nearby alternatives or discover trending local products.
            </p>

            {/* CTAs Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
              <button 
                onClick={() => navigate('/explore')}
                className="bg-brand-900 text-white px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-800 transition-all cursor-pointer shadow-md shadow-brand-900/10 active:scale-98"
              >
                <Search className="w-4.5 h-4.5" />
                <span>Explore Nearby Products</span>
              </button>

              <button 
                onClick={() => navigate('/explore')}
                className="bg-white border-2 border-neutral-200 text-text-secondary px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <Search className="w-4.5 h-4.5 text-text-secondary" />
                <span>Search Again</span>
              </button>
            </div>

            <Link 
              to="/" 
              className="text-brand-900 font-bold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all group py-2"
            >
              <span>Return Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </section>

        {/* 4. Product Carousel Section ("People nearby are searching for") */}
        <section className="flex flex-col gap-6 relative">
          
          {/* Header Row */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-brand-900" />
              </div>
              <h2 className="text-xl md:text-2xl font-poppins font-bold text-text-primary">
                People nearby are searching for
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/explore" className="text-brand-500 hover:text-brand-900 text-sm font-bold transition-colors">
                View all
              </Link>
              {/* Carousel controls */}
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => handleScroll('left')}
                  className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-text-secondary hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => handleScroll('right')}
                  className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-text-secondary hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontally scrolling list container */}
          <div 
            ref={scrollRef}
            className="w-full flex gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingSearches.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate('/explore')}
                className="w-[280px] min-w-[280px] bg-white rounded-3xl border border-neutral-100 p-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col snap-start"
              >
                {/* Image & Badge overlay */}
                <div className="relative w-full h-44 bg-neutral-50 rounded-2xl overflow-hidden mb-3.5">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" 
                  />
                  <span className={`absolute top-2.5 left-2.5 px-3 py-1 text-[10px] font-extrabold rounded-full tracking-wide shadow-sm border ${
                    item.badgeType === 'brand' 
                      ? 'bg-brand-50 text-brand-900 border-brand-100/50' 
                      : 'bg-amber-50 text-amber-900 border-amber-100/50'
                  }`}>
                    {item.badge}
                  </span>
                </div>

                {/* Card Text Content */}
                <div className="flex-grow flex flex-col text-left px-1">
                  <h3 className="font-poppins font-bold text-text-primary text-base mb-1 group-hover:text-brand-900 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs text-text-secondary font-medium mb-3">
                    {item.storesInfo}
                  </p>

                  {/* Rating Line */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-text-primary">
                      {item.rating}
                    </span>
                    <span className="text-xs text-text-muted">
                      ({item.reviewsCount})
                    </span>
                  </div>

                  {/* View Action Link */}
                  <div className="mt-auto pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-900 group-hover:underline flex items-center gap-1">
                      {item.actionText}
                    </span>
                    <ChevronRight className="w-4 h-4 text-brand-900 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 5. Bottom Quick Notice Banner Box */}
        <section className="bg-brand-50/50 border border-brand-100/70 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-brand-100/30">
              <MapPin className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-brand-900 text-base mb-1">
                Inventory changes quickly in local stores.
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Follow your favorite shops to get notified when products are in stock.
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/explore')}
            className="w-full md:w-auto bg-white border border-brand-900/20 hover:border-brand-900/50 text-brand-900 px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-50/30 transition-all cursor-pointer shrink-0 active:scale-98"
          >
            <Store className="w-4.5 h-4.5" />
            <span>Explore Shops</span>
          </button>
        </section>

      </main>

      {/* Spacer container to offset the overlap of footer's CTA card */}
      <div className="h-28 md:h-36"></div>

      {/* 6. Integrated Footer component */}
      <Footer />
    </div>
  );
}
