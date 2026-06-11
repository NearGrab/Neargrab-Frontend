import React, { useMemo } from 'react';
import { Heart, Star, ShieldCheck, MapPin } from 'lucide-react';
import { dashboardMockData } from '../../data/dashboardMockData';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function ProductPreviewCard({ formData = {} }) {
  const { shopProfile } = useShopkeeperDashboardStore();
  const profile = shopProfile || dashboardMockData.shopProfile;

  // Extract variables with default fallbacks matching the mockup
  const {
    productName = '',
    description = '',
    tags = [],
    price = '',
    mrp = '',
    unit = '1 Piece',
    stockAvailable = true,
    images = []
  } = formData;

  // Find the primary image or use a beautiful placeholder
  const activeImage = useMemo(() => {
    const primary = images.find((img) => img.isPrimary);
    if (primary) return primary.src;
    if (images.length > 0) return images[0].src;
    // High-fidelity fallback placeholder (looks like a clean product silhouette)
    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'; // Patel store default image
  }, [images]);

  // Calculate discount percentage
  const discountPercent = useMemo(() => {
    const p = parseFloat(price);
    const m = parseFloat(mrp);
    if (p && m && m > p) {
      return Math.round(((m - p) / m) * 100);
    }
    return 0;
  }, [price, mrp]);

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Label and Subheading */}
      <div className="flex flex-col text-left mb-3">
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Preview
        </h4>
        <span className="text-[10px] text-text-muted">
          This is how your product will appear to customers.
        </span>
      </div>

      {/* Frame of Card */}
      <div className="border border-neutral-150 rounded-2xl overflow-hidden shadow-3xs bg-white relative p-3 text-left">
        
        {/* Badges on top of image */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Stock status badge */}
          <span
            className={`font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              stockAvailable
                ? 'bg-[#E6F4EA] text-brand-900 border border-[#12634B]/10'
                : 'bg-neutral-100 text-text-secondary border border-neutral-200/50'
            }`}
          >
            {stockAvailable ? 'In Stock' : 'Out of Stock'}
          </span>

          {/* Heart wishlist toggle */}
          <button type="button" className="text-text-muted hover:text-red-500 transition-colors cursor-pointer">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Image Container */}
        <div className="w-full h-44 bg-neutral-50/50 rounded-xl overflow-hidden flex items-center justify-center border border-neutral-150/40 relative shadow-3xs mb-3">
          <img
            src={activeImage}
            alt={productName || 'Product Preview'}
            className="max-h-full max-w-full object-contain p-2 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Meta details */}
        <div className="flex flex-col text-left mb-2">
          {/* Product Name */}
          <h5 className="font-poppins font-bold text-sm text-text-primary truncate">
            {productName || 'Amul Taaza Milk 1L'}
          </h5>

          {/* Shop profile connection */}
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] text-text-secondary font-bold truncate">
              {profile.name}
            </span>
            {profile.isVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-brand-900 shrink-0" />
            )}
          </div>

          {/* Rating, reviews, and distance */}
          <div className="flex items-center gap-2 mt-1 flex-wrap text-[10px] font-bold text-text-secondary">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-amber-900">{profile.rating || '0.0'}</span>
              <span className="text-text-muted font-medium">({profile.reviewCount || 0})</span>
            </div>
            {profile.distance && (
              <>
                <span>•</span>
                <div className="flex items-center gap-0.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  <span>{profile.distance}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pricing tag block */}
        <div className="flex items-baseline gap-2 pt-2 border-t border-neutral-100/60 mb-2.5">
          <span className="text-base font-extrabold text-text-primary font-poppins">
            ₹{price || '70'}
          </span>
          {mrp && parseFloat(mrp) > parseFloat(price) && (
            <>
              <span className="text-[10px] text-text-muted font-bold line-through">
                MRP ₹{mrp}
              </span>
              <span className="text-[9px] font-extrabold text-brand-900 bg-[#E6F4EA] border border-[#12634B]/10 px-1.5 py-0.5 rounded-sm">
                {discountPercent}% OFF
              </span>
            </>
          )}
          <span className="text-[9px] text-text-muted font-bold ml-auto shrink-0 uppercase tracking-wide">
            per {unit}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-[10px] text-text-secondary leading-normal mb-3 line-clamp-2">
          {description || 'Fresh and pure toned milk from Amul. Great for daily use.'}
        </p>

        {/* Custom Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag}
                className="bg-neutral-100 text-text-secondary font-bold text-[9px] px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <>
              <span className="bg-neutral-100 text-text-secondary font-bold text-[9px] px-2.5 py-0.5 rounded-full">
                Dairy
              </span>
              <span className="bg-neutral-100 text-text-secondary font-bold text-[9px] px-2.5 py-0.5 rounded-full">
                Milk
              </span>
              <span className="bg-neutral-100 text-text-secondary font-bold text-[9px] px-2.5 py-0.5 rounded-full">
                Daily Essential
              </span>
            </>
          )}
        </div>

        {/* Out-of-Stock customer visibility card notice */}
        <div
          className={`flex items-center gap-2 p-2 rounded-xl text-[9px] font-bold border mt-3 transition-colors ${
            stockAvailable
              ? 'bg-[#E6F4EA]/50 text-brand-900 border-[#12634B]/10'
              : 'bg-red-50 text-red-700 border-red-200/50'
          }`}
        >
          <span>{stockAvailable ? '✅' : '❌'}</span>
          <span className="leading-tight">
            {stockAvailable
              ? 'Product will be visible to customers in your selected area.'
              : 'Product will be hidden from customers automatically.'}
          </span>
        </div>

      </div>
    </div>
  );
}
