import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  MessageSquare,
  Star,
  BarChart3,
  Store,
  QrCode,
  Megaphone,
  Users,
  Settings,
  ShieldCheck,
  ChevronRight,
  ArrowLeftRight,
  X
} from 'lucide-react';
import { dashboardMockData } from '../data/dashboardMockData';
import { useShopkeeperDashboardStore } from '../../../store/useShopkeeperDashboardStore';

export default function ShopkeeperSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { shopProfile, fetchDashboardData, setQRModalOpen, setReviewsModalOpen } = useShopkeeperDashboardStore();
  const { navigation } = dashboardMockData;

  useEffect(() => {
    if (!shopProfile) {
      fetchDashboardData();
    }
  }, [shopProfile, fetchDashboardData]);

  // Fallback to mock profile if API hasn't loaded yet
  const profile = shopProfile || dashboardMockData.shopProfile;

  // Map icon names to Lucide icons
  const iconMap = {
    Dashboard: LayoutDashboard,
    Products: Package,
    AddProduct: PlusCircle,
    Orders: MessageSquare,
    Reviews: Star,
    Analytics: BarChart3,
    ShopProfile: Store,
    QRCode: QrCode,
    Promotions: Megaphone,
    Followers: Users,
    Settings: Settings
  };

  const handleCustomerSwitch = () => {
    navigate('/explore');
  };

  return (
    <div className="w-full flex flex-col h-full bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm text-left gap-5 relative">
      
      {/* Mobile Drawer Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-100 text-text-muted lg:hidden cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* 1. Verified Store Card Header */}
      <div className="border border-neutral-150 rounded-2xl overflow-hidden shadow-2xs group">
        {/* Banner */}
        <div className="h-16 w-full relative bg-neutral-100">
          <img
            src={profile.coverImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'}
            alt="Cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Logo and store description */}
        <div className="px-4 pb-4 pt-0 relative flex flex-col">
          <div className="w-12 h-12 rounded-xl border-2 border-white bg-white overflow-hidden shadow-xs flex items-center justify-center -mt-6 mb-2">
            <img src={profile.logo || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'} alt="Logo" className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-1">
            <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary truncate max-w-[170px]">
              {profile.name}
            </h3>
            {profile.isVerified && (
              <ShieldCheck className="w-4 h-4 text-brand-900 shrink-0 fill-brand-100/50" />
            )}
          </div>
          <span className="text-[10px] text-text-muted font-semibold mt-0.5">
            @{profile.username}
          </span>
        </div>
      </div>

      {/* 2. Navigation Menu */}
      <nav className="flex flex-col gap-1 overflow-y-auto scrollbar-none flex-grow max-h-[420px] lg:max-h-none">
        {navigation.map((item) => {
          const IconComponent = iconMap[item.icon] || LayoutDashboard;
          const isQRItem = item.icon === 'QRCode';

          if (isQRItem) {
            return (
              <button
                key={item.title}
                onClick={(e) => {
                  e.preventDefault();
                  setQRModalOpen(true);
                  if (onClose) onClose(); // Close drawer
                }}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-poppins text-text-secondary hover:bg-neutral-50 hover:text-text-primary border-none bg-transparent cursor-pointer text-left w-full transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-4 h-4 shrink-0 text-text-muted" />
                  <span>{item.title}</span>
                </div>
              </button>
            );
          }

          const isReviewsItem = item.icon === 'Reviews';

          if (isReviewsItem) {
            return (
              <button
                key={item.title}
                onClick={(e) => {
                  e.preventDefault();
                  setReviewsModalOpen(true);
                  if (onClose) onClose(); // Close drawer
                }}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-poppins text-text-secondary hover:bg-neutral-50 hover:text-text-primary border-none bg-transparent cursor-pointer text-left w-full transition-all duration-300"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4 shrink-0 text-text-muted" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-neutral-100 text-text-muted">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          }

          const isActive = location.pathname === item.path || (item.path === '/shopkeeper/dashboard' && location.pathname === '/shopkeeper/dashboard');

          return (
            <NavLink
              key={item.title}
              to={isActive ? '#' : item.path}
              onClick={(e) => {
                if (isActive) e.preventDefault(); // Stay if active
                if (onClose) onClose(); // Close drawer
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold font-poppins transition-all duration-300 ${
                isActive
                  ? 'bg-[#E6F4EA] text-brand-900 shadow-3xs'
                  : 'text-text-secondary hover:bg-neutral-50 hover:text-text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-900 stroke-[2.5px]' : 'text-text-muted'}`} />
                <span>{item.title}</span>
              </div>

              {/* Badge Counter */}
              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    item.badge === 'New'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200/50 animate-pulse'
                      : isActive
                      ? 'bg-brand-900/10 text-brand-900'
                      : 'bg-neutral-100 text-text-muted'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* 3. Customer Switch CTA Card */}
      <div
        onClick={handleCustomerSwitch}
        className="border border-brand-100/50 bg-[#E6F4EA]/40 hover:bg-[#E6F4EA]/70 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-98 group/switch"
      >
        <div className="flex items-start gap-2.5 text-left min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 shrink-0 shadow-2xs border border-brand-100/50">
            <ArrowLeftRight className="w-4 h-4 text-brand-900" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-brand-900 font-poppins block leading-none mb-1">
              Switch to Customer View
            </span>
            <span className="text-[9px] text-brand-800 leading-tight block line-clamp-2">
              You can still view other shops' products like a customer.
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-brand-900 shrink-0 transition-transform group-hover/switch:translate-x-1" />
      </div>

    </div>
  );
}
