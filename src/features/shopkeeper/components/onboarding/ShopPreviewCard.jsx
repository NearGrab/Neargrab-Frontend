import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Heart, Plus, ShoppingBag, Eye, Phone, MessageSquare } from 'lucide-react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';

export default function ShopPreviewCard() {
  // Read all onboarding state reactively
  const { shopDetails, address, contact, businessInfo, photos } = useShopOnboardingStore();

  // Compute live values or fallbacks
  const shopName = shopDetails.name || 'Patel General Store';
  const shopUsername = shopDetails.username ? `@${shopDetails.username}` : '@your-shop-name';
  const categoryStr = shopDetails.category || 'Grocery Store';
  const typeStr = shopDetails.type || 'Kirana Store';
  
  // Choose logo and cover preview safely using state + useEffect
  const [previews, setPreviews] = React.useState({
    logo: '',
    front: ''
  });

  React.useEffect(() => {
    const urlsToRevoke = [];

    const getUrl = (val) => {
      if (!val) return '';
      if (val instanceof File) {
        const url = URL.createObjectURL(val);
        urlsToRevoke.push(url);
        return url;
      }
      return val;
    };

    setPreviews({
      logo: getUrl(photos.logo || shopDetails.logo),
      front: getUrl(photos.front)
    });

    return () => {
      urlsToRevoke.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photos.logo, shopDetails.logo, photos.front]);

  const logoSrc = previews.logo;
  const coverSrc = previews.front || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';

  // Compute open hours and response times
  const responseTimeText = 'Usually responds in 10 mins';
  const timingsText = contact.openingTime && contact.closingTime
    ? `Open now • Closes ${contact.closingTime}`
    : 'Open now • Closes 10:00 PM';

  // Calculate distance based on radius option
  const distanceStr = address.radius === '250m' ? '0.2 km' : address.radius === '500m' ? '0.5 km' : address.radius === '1km' ? '0.8 km' : address.radius === '2km' ? '1.5 km' : '2.4 km';

  // Fallback description
  const descriptionText = shopDetails.description || 'Your one-stop shop for daily essentials, grocery, household items and more.';

  // Selectable tags or default badges
  const tagsList = businessInfo.tags.length > 0
    ? businessInfo.tags
    : ['Quality Products', 'Fair Prices', 'Friendly Service'];

  // Verification status
  const isVerified = !!businessInfo.panNumber || !!businessInfo.gstNumber || !!photos.front;

  return (
    <div className="w-full bg-[#FAFAFA] border border-neutral-200/60 rounded-3xl p-5 shadow-sm text-left sticky top-24">
      {/* Title & Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-brand-900 font-poppins">Preview</h3>
        <p className="text-[10px] text-text-secondary">This is how your shop profile will look</p>
      </div>

      {/* Customer Shop Card Frame */}
      <div className="w-full bg-white border border-neutral-150/80 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        
        {/* Cover Photo */}
        <div className="w-full h-32 relative bg-neutral-100">
          <img
            src={coverSrc}
            alt="Shop Cover"
            className="w-full h-full object-cover"
          />
          {/* Heart Wishlist Mock */}
          <button className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer">
            <Heart className="w-4 h-4 text-text-muted hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Profile Logo overlapping cover */}
        <div className="px-5 pb-5 relative">
          <div className="absolute -top-10 left-5 w-20 h-20 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
            {logoSrc ? (
              <img src={logoSrc} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#E6F4EA] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-brand-900" />
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="h-11" />

          {/* Shop Name & Username */}
          <div className="flex flex-col text-left mb-2">
            <h4 className="font-poppins font-bold text-text-primary text-base md:text-lg tracking-tight leading-tight">
              {shopName}
            </h4>
            <span className="text-[10px] md:text-xs text-text-muted font-medium mt-0.5">
              {shopUsername}
            </span>
          </div>

          {/* Ratings & Verification Badge */}
          <div className="flex items-center gap-2 flex-wrap mb-3.5">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-extrabold text-amber-900">4.6</span>
              <span className="text-[9px] text-amber-700 font-medium">(128)</span>
            </div>

            {isVerified && (
              <div className="flex items-center gap-1 bg-[#E6F4EA] border border-[#12634B]/10 px-2.5 py-0.5 rounded-full shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-900" />
                <span className="text-[9px] font-extrabold text-brand-900">Verified Shop</span>
              </div>
            )}
          </div>

          {/* Distance & Timing metrics */}
          <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-3.5 mb-3.5 text-[11px] font-semibold text-text-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="truncate">{distanceStr} away</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
              <span className="truncate text-brand-900">{address.street || address.city || 'Navsari'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span>{timingsText}</span>
            </div>
          </div>

          {/* Primary category list */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-900 mb-3 font-poppins">
            <span>{categoryStr}</span>
            <span className="text-text-muted">•</span>
            <span>{typeStr}</span>
          </div>

          {/* Description */}
          <p className="text-[11px] text-text-secondary leading-relaxed mb-4 text-left line-clamp-3">
            {descriptionText}
          </p>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tagsList.map((tag) => (
              <span
                key={tag}
                className="bg-neutral-50 border border-neutral-200/50 text-text-secondary text-[9px] font-bold px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Communication triggers (Phone/WhatsApp) if entered */}
          {contact.phone && (
            <div className="flex gap-2 mb-5">
              <a
                href={`tel:${contact.phone}`}
                className="flex-grow flex items-center justify-center gap-1.5 bg-[#E6F4EA] border border-brand-100 hover:bg-brand-50 text-brand-900 rounded-xl py-2 font-poppins font-bold text-[10px] transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Shop</span>
              </a>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow flex items-center justify-center gap-1.5 bg-[#DCFCE7] border border-green-200 hover:bg-[#bbf7d0] text-green-800 rounded-xl py-2 font-poppins font-bold text-[10px] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          )}

          {/* Top Products segment */}
          <div className="border-t border-neutral-100 pt-4 text-left">
            <h5 className="font-poppins font-bold text-text-primary text-[11px] mb-2.5 uppercase tracking-wider leading-none">
              Top Products
            </h5>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="flex flex-col gap-1">
                  <div className="w-full aspect-square bg-neutral-50 border border-neutral-100 rounded-lg flex items-center justify-center p-1.5 relative overflow-hidden group/product">
                    {/* Mock Icon */}
                    <div className="w-5 h-5 bg-neutral-200 rounded-sm animate-pulse" />
                  </div>
                  <div className="h-1.5 w-10 bg-neutral-150 rounded-full mx-auto" />
                  <div className="h-1 w-6 bg-neutral-100 rounded-full mx-auto mt-0.5" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
