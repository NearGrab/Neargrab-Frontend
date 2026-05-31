import React from 'react';
import { ShieldCheck, Star, Clock, MapPin, Store, Calendar, Award } from 'lucide-react';
import Button from '../../../../shared/components/ui/Button';

export default function ShopProfileSummaryCard({
  shopInfo = {},
  isManageMode = true,
  onEditClick,
  onFollowClick
}) {
  
  const {
    name = 'Patel General Store',
    username = 'patelgeneralstore',
    logo = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
    isVerified = true,
    rating = 4.6,
    reviewCount = 128,
    distance = '0.8 km away',
    openStatus = 'Open Open until 10:00 PM',
    followersCount = '15.2K',
    followingCount = '24',
    category = 'Grocery Store • Kirana Store',
    shopId = 'PGS12345',
    yearsOnPlatform = 9,
    location = 'Navsari, Gujarat - 396445'
  } = shopInfo;

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs text-left font-inter flex flex-col relative overflow-hidden group">
      
      {/* 1. Verified top indicator banner */}
      {isVerified && (
        <div className="absolute top-0 left-0 right-0 bg-[#E6F4EA] border-b border-[#12634B]/10 py-1.5 px-4 flex items-center justify-center gap-1 text-[9px] md:text-[10px] font-extrabold text-brand-900 select-none">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-900 fill-brand-900/10" />
          <span>✓ VERIFIED NEARGRAB STOREFRONT</span>
        </div>
      )}

      {/* Spacing for verified banner */}
      <div className="pt-6" />

      {/* 2. Logo & Basic Identifiers */}
      <div className="flex flex-col items-center text-center pb-4 border-b border-neutral-100 select-none">
        {/* Rounded Logo */}
        <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden bg-white shadow-3xs flex items-center justify-center mb-3">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title Name */}
        <h2 className="font-poppins font-extrabold text-base md:text-lg text-text-primary leading-tight">
          {name}
        </h2>
        
        {/* Username */}
        <span className="text-[10px] md:text-xs font-bold text-text-muted mt-1 leading-none">
          @{username}
        </span>

        {/* Ratings Review Count row */}
        <div className="flex items-center gap-1 mt-2.5 bg-amber-50/50 border border-amber-100 px-3 py-1 rounded-full text-xs font-extrabold text-text-primary font-poppins">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
          <span>{rating}</span>
          <span className="text-text-muted text-[10px] font-bold">({reviewCount} reviews)</span>
        </div>
      </div>

      {/* 3. Metrics details list */}
      <div className="flex flex-col gap-3.5 py-4 border-b border-neutral-100 text-xs font-bold text-text-secondary select-none">
        
        {/* Category list */}
        <div className="flex items-center gap-2.5">
          <Store className="w-4 h-4 text-text-muted shrink-0" />
          <span>{category}</span>
        </div>

        {/* Shop ID */}
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-text-muted shrink-0" />
          <span>Shop ID: <span className="font-extrabold text-text-primary font-poppins">{shopId}</span></span>
        </div>

        {/* Platform Experience */}
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-text-muted shrink-0" />
          <span>Since 2015 • <span className="font-extrabold text-brand-900 font-poppins">{yearsOnPlatform} Years</span> on Neargrab</span>
        </div>

        {/* Open Status / distance */}
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-text-muted shrink-0" />
          <div className="flex flex-col">
            <span className="text-brand-900 font-extrabold uppercase text-[9px] tracking-wide">
              {openStatus}
            </span>
            <span className="text-[10px] text-text-muted mt-0.5">{distance}</span>
          </div>
        </div>

        {/* Location coordinates */}
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
          <span className="leading-normal">{location}</span>
        </div>

      </div>

      {/* 4. Action Button and Followers metrics footer */}
      <div className="pt-4 flex flex-col items-center">
        
        {/* Followers / Following indicators */}
        <div className="flex items-center justify-center gap-2.5 text-xs text-text-secondary mb-4 select-none">
          <span>
            <span className="font-extrabold text-text-primary font-poppins">{followersCount}</span> Followers
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
          <span>
            Following <span className="font-extrabold text-text-primary font-poppins">{followingCount}</span>
          </span>
        </div>

        {/* Main interactive button */}
        {isManageMode ? (
          // Shopkeeper Edit Profile Button
          <Button
            variant="primary"
            size="sm"
            onClick={onEditClick}
            className="w-full font-bold text-xs h-10 cursor-pointer shadow-3xs"
          >
            Edit Shop Profile
          </Button>
        ) : (
          // Public user follow button
          <Button
            variant="primary"
            size="sm"
            onClick={onFollowClick}
            className="w-full font-bold text-xs h-10 cursor-pointer shadow-3xs"
          >
            Follow
          </Button>
        )}

      </div>

    </div>
  );
}
