import React, { useState } from 'react';
import { MapPin, Search, Bell, ChevronDown, LogOut, User, Settings, Home, ShoppingCart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-neutral-100 shadow-sm shadow-neutral-100/30">
      <div className="max-w-[115rem] mx-auto px-4 md:px-8 py-3">
        
        {/* DESKTOP HEADER LAYOUT (>= md Breakpoint) */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {/* Left Side: Brand Logo & Interactive Location Selector */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/explore" className="flex items-center gap-2">
              <img src="/nobg-Logo.png" alt="Neargrab Logo" className="w-10 h-10 object-contain" />
              <span className="font-poppins font-bold text-lg text-brand-900 tracking-tight">Neargrab</span>
            </Link>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-full border border-neutral-200/50 hover:bg-neutral-100 transition-colors cursor-pointer group">
              <div className="w-7 h-7 bg-brand-50 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-brand-900" />
              </div>
              <div className="text-left leading-none pr-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-text-primary group-hover:text-brand-900 transition-colors">
                    {user.location.city}, {user.location.state}
                  </span>
                  <ChevronDown className="w-3 h-3 text-text-muted group-hover:text-brand-900 transition-colors" />
                </div>
                <span className="text-[10px] text-text-muted font-medium">{user.location.radius}</span>
              </div>
            </div>
          </div>

          {/* Center: Wide Search Bar */}
          <div className="flex items-center gap-3 w-full max-w-3xl flex-grow">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, shops or categories..."
                className="w-full bg-neutral-50 border border-neutral-200/70 rounded-full pl-11 pr-4 py-2.5 text-sm placeholder-text-muted text-text-primary focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-inter"
              />
            </div>
          </div>

          {/* Right Side: Notification Bell, Live Chat, and User Profile Menu */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Notifications Trigger */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200/40 hover:bg-neutral-100 flex items-center justify-center text-text-secondary cursor-pointer transition-colors group"
            >
              <Bell className="w-5 h-5 text-text-secondary group-hover:text-brand-900 transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white scale-90">
                3
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => alert("Cart panel will be introduced soon! (Mock action preview)")}
              className="relative w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200/40 hover:bg-neutral-100 flex items-center justify-center text-text-secondary cursor-pointer transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-text-secondary group-hover:text-brand-900 transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white scale-90">
                2
              </span>
            </button>

            {/* Vertical Divider */}
            <div className="w-px h-6 bg-neutral-200"></div>

            {/* User Profile avatar */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2.5 pl-1 cursor-pointer hover:opacity-90 transition-opacity group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-brand-100/50 shadow-sm"
                />
                <div className="text-left leading-none pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-text-primary group-hover:text-brand-900 transition-colors">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                </div>
              </div>

              {/* Dynamic Auth Profile Tooltip Menu Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-12 w-44 bg-white border border-neutral-100 rounded-2xl shadow-xl p-2 z-50 text-left">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-text-primary hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <User className="w-4 h-4 shrink-0 text-text-secondary" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => {
                          setShowDropdown(false);
                          alert("Settings view will be integrated soon! (High fidelity mockup preview)");
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs font-bold text-text-primary hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <Settings className="w-4 h-4 shrink-0 text-text-secondary" />
                        <span>Settings</span>
                      </Link>
                      <div className="my-1 border-t border-neutral-100"></div>
                      <button
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
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
                        setShowDropdown(false);
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
              <img src="/nobg-Logo.png" alt="Neargrab Logo" className="w-9 h-9 object-contain" />
              <span className="font-poppins font-bold text-base text-brand-900 tracking-tight">Neargrab</span>
            </Link>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 rounded-full border border-neutral-200/50 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0 max-w-[50%]">
              <MapPin className="w-3.5 h-3.5 text-brand-900 shrink-0" />
              <span className="text-[11px] font-bold text-text-primary truncate">
                {user.location.city}
              </span>
              <ChevronDown className="w-3 h-3 text-text-muted shrink-0" />
            </div>
          </div>

          {/* Row 3: Mobile Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, stores, categories..."
              className="w-full bg-neutral-50 border border-neutral-200/70 rounded-xl pl-9 pr-3 py-2 text-xs placeholder-text-muted text-text-primary focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 font-inter"
            />
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

        {/* 2. Notifications tab */}
        <Link
          to="/notifications"
          className={`flex flex-col items-center gap-1 px-3 py-1 transition-all select-none relative ${
            location.pathname === '/notifications'
              ? 'text-brand-900 font-bold scale-105'
              : 'text-text-secondary hover:text-brand-900'
          }`}
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${location.pathname === '/notifications' ? 'text-brand-900 fill-brand-900/10' : 'text-text-secondary'}`} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
              3
            </span>
          </div>
          <span className="text-[10px] font-poppins tracking-wide">Alerts</span>
        </Link>

        {/* 3. Profile tab */}
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

        {/* 4. Cart tab */}
        <button
          onClick={() => alert("Cart panel will be introduced soon! (Mock action preview)")}
          className="flex flex-col items-center gap-1 px-3 py-1 transition-all select-none text-text-secondary hover:text-brand-900 cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5 text-text-secondary" />
          <span className="text-[10px] font-poppins tracking-wide">Cart</span>
        </button>
      </nav>
    </header>
  );
}
