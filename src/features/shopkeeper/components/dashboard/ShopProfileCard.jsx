import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function ShopProfileCard() {
  const navigate = useNavigate();
  const { shopProfile } = useShopkeeperDashboardStore();

  const handleEditProfile = () => {
    navigate('/shopkeeper/profile');
  };

  if (!shopProfile) return null;

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Your Shop Profile
        </h4>
        <span className="bg-[#E6F4EA] text-brand-900 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Preview
        </span>
      </div>

      {/* Profile Card Frame */}
      <div className="border border-neutral-150 rounded-xl overflow-hidden shadow-3xs">
        
        {/* Cover Photo */}
        <div className="w-full h-24 relative bg-neutral-100">
          <img
            src={shopProfile.coverImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info panel overlapping cover */}
        <div className="px-4 pb-4 relative">
          {/* Logo overlapping */}
          <div className="absolute -top-7 left-4 w-14 h-14 rounded-xl border-2 border-white bg-white shadow-sm overflow-hidden flex items-center justify-center">
            <img src={shopProfile.logo || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150'} alt="Logo" className="w-full h-full object-cover" />
          </div>

          {/* Spacer */}
          <div className="h-8.5" />

          {/* Shop Name & Username */}
          <div className="flex flex-col text-left mb-2">
            <div className="flex items-center gap-1">
              <h5 className="font-poppins font-bold text-sm text-text-primary truncate">
                {shopProfile.name}
              </h5>
              {shopProfile.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-brand-900 shrink-0" />
              )}
            </div>
            <span className="text-[10px] text-text-muted font-bold mt-0.5">
              @{shopProfile.username}
            </span>
          </div>

          {/* Ratings & Verification Tag */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="text-[9px] font-extrabold text-amber-900">{shopProfile.rating || '0.0'}</span>
              <span className="text-[8px] text-amber-700">({shopProfile.reviewCount || 0})</span>
            </div>
            
            {shopProfile.isVerified && (
              <div className="flex items-center gap-1 bg-[#E6F4EA] border border-[#12634B]/10 px-2 py-0.5 rounded-full shrink-0">
                <ShieldCheck className="w-3 h-3 text-brand-900" />
                <span className="text-[8px] font-extrabold text-brand-900">Verified Shop</span>
              </div>
            )}
          </div>

          {/* Address & Timings */}
          <div className="flex flex-col gap-1.5 pt-3 border-t border-neutral-100 mb-3 text-[10px] font-bold text-text-secondary leading-none">
            {shopProfile.distance && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                <span>{shopProfile.distance}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span>{shopProfile.openingHours || 'Configured'}</span>
            </div>
          </div>

          {/* Edit Profile Action Trigger */}
          <button
            type="button"
            onClick={handleEditProfile}
            className="w-full flex items-center justify-center gap-1.5 border border-neutral-200/80 hover:bg-neutral-50 text-text-secondary font-bold text-xs py-2 rounded-xl transition-all cursor-pointer shadow-3xs"
          >
            <Edit2 className="w-3 h-3 text-text-muted" />
            <span>Edit Profile</span>
          </button>

        </div>
      </div>
    </div>
  );
}
