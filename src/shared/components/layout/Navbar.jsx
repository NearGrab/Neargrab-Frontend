import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Bell, ChevronDown, LogOut, User, Settings, Home, ShoppingCart, Sliders, X, Store } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { useLocationStore } from '../../../store/useLocationStore';
import { useCartStore } from '../../../store/useCartStore';
import { useNotificationStore } from '../../../store/useNotificationStore';
import { searchService } from '../../../features/search/services/searchService';
import CitySelectionModal from './CitySelectionModal';
import InitialsAvatar from '../ui/InitialsAvatar';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  
  // Custom store reactive integrations
  const { user, logout, isAuthenticated } = useAuthStore();
  const { location: userLoc, setRadius } = useLocationStore();
  const { totalQuantity: cartCount } = useCartStore();
  const { unreadCount } = useNotificationStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isCityModalOpen, setIsCityModalOpen] = useState(!userLoc.city);

  useEffect(() => {
    if (!userLoc.city) {
      setIsCityModalOpen(true);
    }
  }, [userLoc.city]);

  const containerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const locationRef = useRef(null);

  // Parse actual active filter count from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  let activeFilterCount = 0;
  if (queryParams.get('distance') && queryParams.get('distance') !== 'Within 3 km') activeFilterCount++;
  if (queryParams.get('customDistance')) activeFilterCount++;
  if (queryParams.get('minPrice') && queryParams.get('minPrice') !== '0') activeFilterCount++;
  if (queryParams.get('maxPrice') && queryParams.get('maxPrice') !== '1000') activeFilterCount++;
  if (queryParams.get('brands')) activeFilterCount += queryParams.get('brands').split(',').filter(Boolean).length;
  if (queryParams.get('packSizes')) activeFilterCount += queryParams.get('packSizes').split(',').filter(Boolean).length;
  if (queryParams.get('inStockOnly') === 'true') activeFilterCount++;
  
  // Set default count to 2 if no queries exist yet (as seen in initial mockup)
  if (activeFilterCount === 0 && location.pathname === '/search') {
    activeFilterCount = 2; 
  } else if (activeFilterCount === 0) {
    activeFilterCount = 2; // Default brand standard
  }

  // Bind initial search input query when location path is search
  useEffect(() => {
    if (location.pathname === '/search') {
      const q = queryParams.get('q') || '';
      setSearchQuery(q);
    }
  }, [location.search, location.pathname]);

  // Debounced query autocomplete suggestions fetch
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        const list = await searchService.getSuggestions(searchQuery);
        setSuggestions(list);
      } else {
        setSuggestions([]);
      }
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Handle outside clicks to close suggestion drawers
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedDesktop = containerRef.current && containerRef.current.contains(event.target);
      const clickedMobile = mobileContainerRef.current && mobileContainerRef.current.contains(event.target);
      
      if (!clickedDesktop && !clickedMobile) {
        setShowSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerSearch = (queryStr) => {
    const finalQ = queryStr || searchQuery;
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    
    if (finalQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(finalQ.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        const selected = suggestions[activeSuggestionIndex];
        setSearchQuery(selected);
        triggerSearch(selected);
      } else {
        triggerSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const activeRadiusOptions = [
    'Within 1 km',
    'Within 3 km',
    'Within 5 km',
    'Within 10 km'
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-neutral-100 shadow-sm shadow-neutral-100/30">
      <div className="max-w-[115rem] mx-auto px-4 md:px-8 py-3">
        
        {/* DESKTOP HEADER LAYOUT (>= md Breakpoint) */}
        <div className="hidden md:flex items-center justify-between gap-6">
          
          {/* Left Side: Brand Logo & Interactive Location Selector */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/explore" className="flex items-center gap-2">
              <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="w-10 h-10 object-contain" />
              <span className="font-poppins font-bold text-lg text-brand-900 tracking-tight">Neargrab</span>
            </Link>
            
            {/* Interactive Location Selector Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-full border border-neutral-200/50 hover:bg-neutral-100 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 bg-brand-50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-brand-900" />
                </div>
                <div className="text-left leading-none pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-text-primary group-hover:text-brand-900 transition-colors">
                      {userLoc.city || 'Select City'}, {userLoc.state}
                    </span>
                    <ChevronDown className="w-3 h-3 text-text-muted group-hover:text-brand-900 transition-colors" />
                  </div>
                  <span className="text-[10px] text-text-muted font-medium">Gujarat</span>
                </div>
              </button>
            </div>
          </div>

          {/* Center: Wide Search Bar with Filters Button */}
          <div ref={containerRef} className="flex items-center gap-3 w-full max-w-3xl flex-grow relative">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search for products, shops or categories..."
                className="w-full bg-neutral-50 border border-neutral-200/70 rounded-full pl-11 pr-10 py-2.5 text-sm placeholder-text-muted text-text-primary focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-inter"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                    if (location.pathname === '/search') {
                      navigate('/search');
                    }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Premium Suggestion Dropdown Panel */}
            {showSuggestions && (searchQuery.trim().length >= 1 || suggestions.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl max-h-80 overflow-y-auto p-2.5 z-50 text-left">
                {suggestions.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(item);
                          triggerSearch(item);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                          idx === activeSuggestionIndex 
                            ? 'bg-brand-50 text-brand-900 font-bold' 
                            : 'text-text-primary hover:bg-neutral-50'
                        }`}
                      >
                        <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        <span className="truncate">{item}</span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim().length >= 2 ? (
                  <div className="px-4 py-3 text-center text-xs text-text-muted font-medium">
                    No exact matching products found
                  </div>
                ) : (
                  <div className="px-4 py-2.5 text-xs text-text-muted font-medium">
                    Type 2 or more letters (e.g. <span className="text-brand-900 font-bold">sun</span>) for oil suggestions
                  </div>
                )}
              </div>
            )}

            {/* Visual Sliders Filters Button inside/next to the Search bar - Exclusively shown on Search Page */}
            {isSearchPage && (
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(location.search);
                  newParams.set('mobileFilters', 'true');
                  navigate(`/search?${newParams.toString()}`);
                }}
                className="w-10 h-10 rounded-full border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-text-secondary cursor-pointer shrink-0 relative bg-white transition-colors"
                aria-label="Filter products"
              >
                <Sliders className="w-4.5 h-4.5 text-text-secondary" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Right Side: Notification Bell, Live Chat, and User Profile Menu */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Notifications Trigger */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200/40 hover:bg-neutral-100 flex items-center justify-center text-text-secondary cursor-pointer transition-colors group"
            >
              <Bell className="w-5 h-5 text-text-secondary group-hover:text-brand-900 transition-colors" />
              {isAuthenticated && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white scale-90">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => navigate('/cart')}
              className="relative w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200/40 hover:bg-neutral-100 flex items-center justify-center text-text-secondary cursor-pointer transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-text-secondary group-hover:text-brand-900 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white scale-90">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Vertical Divider */}
            <div className="w-px h-6 bg-neutral-200"></div>

            {/* User Profile avatar */}
            <div className="relative">
              <div
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2.5 pl-1 cursor-pointer hover:opacity-90 transition-opacity group"
              >
                <InitialsAvatar
                  avatarUrl={user?.avatar}
                  name={user?.name || user?.username || "Guest"}
                  className="w-9 h-9 border-2 border-brand-100/50 shadow-sm text-xs"
                />
                <div className="text-left leading-none pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-text-primary group-hover:text-brand-900 transition-colors">
                      {user?.name || "Guest"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                </div>
              </div>

              {/* Dynamic Auth Profile Tooltip Menu Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-12 w-44 bg-white border border-neutral-100 rounded-2xl shadow-xl p-2 z-50 text-left">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-text-primary hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <User className="w-4 h-4 shrink-0 text-text-secondary" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => {
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-text-primary hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <Settings className="w-4 h-4 shrink-0 text-text-secondary" />
                        <span>Settings</span>
                      </Link>
                      {user?.role?.toUpperCase() === "SHOPKEEPER" && (
                        <Link
                          to="/shopkeeper/dashboard"
                          onClick={() => setShowProfileDropdown(false)}
                          className="w-full text-left px-3.5 py-2 text-xs font-bold text-text-primary hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Store className="w-4 h-4 shrink-0 text-text-secondary" />
                          <span>Switch to Shopkeeper</span>
                        </Link>
                      )}
                      <div className="my-1 border-t border-neutral-100"></div>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileDropdown(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 shrink-0 text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-bold text-brand-900 hover:bg-brand-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 shrink-0 text-brand-500" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE STACKED HEADER LAYOUT (< md Breakpoint) - Flipkart Inspired */}
        <div className="flex flex-col gap-3 md:hidden">
          {/* Row 1: Logo & Elevated Compact Location Selector */}
          <div className="flex items-center justify-between w-full">
            <Link to="/explore" className="flex items-center gap-1.5">
              <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="w-9 h-9 object-contain" />
              <span className="font-poppins font-bold text-base text-brand-900 tracking-tight">Neargrab</span>
            </Link>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 rounded-full border border-neutral-200/50 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0 max-w-[130px]"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                <span className="text-[11px] font-bold text-text-primary truncate">
                  {userLoc.city || 'Select City'}
                </span>
                <ChevronDown className="w-3 h-3 text-text-muted shrink-0" />
              </button>

              {/* Mobile Notification Trigger */}
              <button
                onClick={() => navigate('/notifications')}
                className="relative w-8.5 h-8.5 rounded-full bg-neutral-50 border border-neutral-200/40 hover:bg-neutral-100 flex items-center justify-center text-text-secondary cursor-pointer transition-colors group shrink-0"
              >
                <Bell className="w-4 h-4 text-text-secondary group-hover:text-brand-900 transition-colors" />
                {isAuthenticated && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Row 3: Mobile Search Input with suggestions */}
          <div ref={mobileContainerRef} className="flex items-center gap-2 w-full">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') triggerSearch();
                }}
                placeholder="Search products, stores, categories..."
                className="w-full bg-neutral-50 border border-neutral-200/70 rounded-xl pl-9 pr-8 py-2 text-xs placeholder-text-muted text-text-primary focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 font-inter"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Mobile Suggestion Dropdown Panel */}
              {showSuggestions && (searchQuery.trim().length >= 1 || suggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-100 rounded-xl shadow-lg max-h-56 overflow-y-auto p-2 z-50 text-left">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item);
                        triggerSearch(item);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[11px] font-medium text-text-primary hover:bg-neutral-50 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-text-muted shrink-0" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Sliders Filter Button (Only shown on search page next to input) */}
            {isSearchPage && (
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(location.search);
                  newParams.set('mobileFilters', 'true');
                  navigate(`/search?${newParams.toString()}`);
                }}
                className="w-9 h-9 rounded-xl border border-neutral-200/80 hover:bg-neutral-50 flex items-center justify-center text-text-secondary cursor-pointer shrink-0 relative bg-neutral-50 transition-colors"
                aria-label="Mobile filters"
              >
                <Sliders className="w-4 h-4 text-text-secondary" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] flex items-center justify-around md:hidden">
        {/* 1. Home tab */}
        <Link
          to="/explore"
          className={`flex flex-col items-center gap-1 px-3 py-1 transition-all select-none ${
            location.pathname === '/explore'
              ? 'text-brand-900 font-bold scale-105'
              : 'text-text-secondary hover:text-brand-900'
          }`}
        >
          <Home className={`w-5 h-5 ${location.pathname === '/explore' ? 'text-brand-900 fill-brand-900/10' : 'text-text-secondary'}`} />
          <span className="text-[10px] font-poppins tracking-wide">Home</span>
        </Link>

        {/* 2. Cart tab */}
        <Link
          to="/cart"
          className={`flex flex-col items-center gap-1 px-3 py-1 transition-all select-none relative ${
            location.pathname === '/cart'
              ? 'text-brand-900 font-bold scale-105'
              : 'text-text-secondary hover:text-brand-900'
          }`}
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${location.pathname === '/cart' ? 'text-brand-900 fill-brand-900/10' : 'text-text-secondary'}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-poppins tracking-wide">Cart</span>
        </Link>

        {/* 3. Search tab (New search link for Mobile bottom nav) */}
        <Link
          to="/search"
          className={`flex flex-col items-center gap-1 px-3 py-1 transition-all select-none relative ${
            location.pathname === '/search'
              ? 'text-brand-900 font-bold scale-105'
              : 'text-text-secondary hover:text-brand-900'
          }`}
        >
          <Search className={`w-5 h-5 ${location.pathname === '/search' ? 'text-brand-900' : 'text-text-secondary'}`} />
          <span className="text-[10px] font-poppins tracking-wide">Search</span>
        </Link>

        {/* Shopkeeper Dashboard tab (only if role is SHOPKEEPER) */}
        {isAuthenticated && user?.role?.toUpperCase() === 'SHOPKEEPER' && (
          <Link
            to="/shopkeeper/dashboard"
            className={`flex flex-col items-center gap-1 px-3 py-1 transition-all select-none ${
              location.pathname.startsWith('/shopkeeper')
                ? 'text-brand-900 font-bold scale-105'
                : 'text-text-secondary hover:text-brand-900'
            }`}
          >
            <Store className={`w-5 h-5 ${location.pathname.startsWith('/shopkeeper') ? 'text-brand-900 fill-brand-900/10' : 'text-text-secondary'}`} />
            <span className="text-[10px] font-poppins tracking-wide">Shop</span>
          </Link>
        )}

        {/* 4. Profile tab */}
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 px-3 py-1 transition-all select-none ${
            location.pathname === '/profile'
              ? 'text-brand-900 font-bold scale-105'
              : 'text-text-secondary hover:text-brand-900'
          }`}
        >
          <User className={`w-5 h-5 ${location.pathname === '/profile' ? 'text-brand-900 fill-brand-900/10' : 'text-text-secondary'}`} />
          <span className="text-[10px] font-poppins tracking-wide">Profile</span>
        </Link>
      </nav>
      <CitySelectionModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        forceSelect={!userLoc.city}
      />
    </header>
  );
}
