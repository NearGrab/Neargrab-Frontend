import React from 'react';
import { Menu, ShieldCheck, Bell, Settings } from 'lucide-react';
import { dashboardMockData } from '../data/dashboardMockData';
import { Link } from 'react-router-dom';

export default function ShopkeeperHeader({ onMenuToggle }) {
  const { shopProfile } = dashboardMockData;

  return (
    <header className="w-full bg-white border border-neutral-100/80 rounded-2xl p-3 px-4 shadow-2xs flex lg:hidden items-center justify-between font-inter text-left">
      
      {/* Drawer Toggle Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-neutral-50 rounded-xl text-text-primary focus:outline-none transition-colors border border-neutral-200/50 cursor-pointer"
          aria-label="Toggle Sidebar Menu"
        >
          <Menu className="w-5 h-5 text-text-primary" />
        </button>

        {/* Brand visual */}
        <div className="flex items-center gap-2">
          <img
            src={shopProfile.logo}
            alt="Logo"
            className="w-7 h-7 rounded-lg object-cover border border-neutral-150 shadow-3xs"
          />
          <div className="flex items-center gap-0.5">
            <span className="font-poppins font-bold text-xs text-text-primary truncate max-w-[120px]">
              {shopProfile.name}
            </span>
            {shopProfile.isVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-brand-900 fill-brand-100/50 shrink-0" />
            )}
          </div>
        </div>
      </div>

      {/* Header Quick Tools (Alerts / Configs) */}
      <div className="flex items-center gap-1.5">
        <Link
          to="/notifications"
          className="p-2 hover:bg-neutral-50 rounded-xl text-text-secondary hover:text-text-primary transition-all relative border border-neutral-200/40"
        >
          <Bell className="w-4 h-4 text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        </Link>
        <Link
          to="/shopkeeper/settings"
          className="p-2 hover:bg-neutral-50 rounded-xl text-text-secondary hover:text-text-primary transition-all border border-neutral-200/40"
        >
          <Settings className="w-4 h-4 text-text-secondary" />
        </Link>
      </div>

    </header>
  );
}
