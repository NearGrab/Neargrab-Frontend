import React from 'react';
import { Pencil, EyeOff, Plus, Check, Heart, Star, ShieldCheck } from 'lucide-react';
import StockToggle from '../../shopkeeper/components/products/StockToggle';

export default function ShopProductsGrid({
  products = [],
  shopInfo = {},
  isManageMode = false,
  onEditProduct,
  onToggleStock,
  onViewAll
}) {
  
  const handleAction = (type, prod) => {
    if (type === 'edit') {
      if (onEditProduct) onEditProduct(prod.id);
      else alert(`Editing "${prod.name}"...`);
    } else if (type === 'add') {
      alert(`"${prod.name}" successfully added to cart!`);
    }
  };

  const shopName = shopInfo?.name || 'Local Store';
  const isVerified = shopInfo?.isVerified ?? false;
  const rating = shopInfo?.rating !== undefined ? shopInfo.rating.toFixed(1) : '0.0';
  const reviewCount = shopInfo?.reviewCount || 0;

  return (
    <div className="w-full text-left font-inter flex flex-col gap-4 bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-1 select-none">
        <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
          Shop Listings
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[10px] md:text-xs font-bold text-brand-900 hover:underline cursor-pointer"
        >
          View all products
        </button>
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((prod) => {
          const discountPercent = prod.mrp && prod.mrp > prod.price
            ? Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)
            : 0;

          return (
            <div
              key={prod.id}
              className="border border-neutral-150 rounded-2xl p-4 flex flex-col text-left shadow-3xs bg-white relative hover:shadow-2xs transition-shadow group"
            >
              
              {/* Status top badge */}
              <div className="flex items-center justify-between gap-2 mb-3 select-none w-full">
                <span
                  className={`font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    prod.stockAvailable
                      ? 'bg-[#E6F4EA] text-brand-900 border border-[#12634B]/10'
                      : 'bg-neutral-100 text-text-secondary border border-neutral-200/50'
                  }`}
                >
                  {prod.stockAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
                {!isManageMode && (
                  <button type="button" className="text-text-muted hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Thumbnail Image Container */}
              <div className="w-full h-32 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-150/40 relative overflow-hidden mb-3">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="max-h-full max-w-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Shop Info details */}
              <div className="flex flex-col text-left mb-2 flex-grow min-w-0">
                <span className="font-poppins font-bold text-xs md:text-sm text-text-primary truncate">
                  {prod.name}
                </span>
                
                {/* Shop Name & Verified checkmark */}
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-text-secondary font-bold truncate">
                    {shopName}
                  </span>
                  {isVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                  )}
                </div>

                {/* Rating & reviews */}
                <div className="flex items-center gap-1 mt-0.5 text-[10px] font-bold text-text-secondary">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-amber-900">{rating}</span>
                  <span className="text-text-muted font-medium">({reviewCount})</span>
                </div>
              </div>

              {/* Price section */}
              <div className="flex items-baseline gap-1.5 pt-2 border-t border-neutral-100/60 mb-2 select-none flex-wrap">
                <span className="text-sm md:text-base font-extrabold text-text-primary font-poppins">
                  ₹{prod.price}
                </span>
                {prod.mrp && prod.mrp > prod.price && (
                  <>
                    <span className="text-[10px] text-text-muted font-bold line-through">
                      ₹{prod.mrp}
                    </span>
                    <span className="text-[8px] font-extrabold text-brand-900 bg-[#E6F4EA] border border-[#12634B]/10 px-1 py-0.2 rounded-sm whitespace-nowrap">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
                {prod.unit && (
                  <span className="text-[9px] text-text-muted font-bold ml-auto shrink-0 uppercase tracking-wide">
                    per {prod.unit}
                  </span>
                )}
              </div>

              {/* Description */}
              {prod.description && (
                <p className="text-[10px] text-text-secondary leading-normal mb-2.5 line-clamp-2">
                  {prod.description}
                </p>
              )}

              {/* Tags */}
              {prod.tags && prod.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {prod.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 text-text-secondary font-bold text-[9px] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stock visibility alert at bottom of the card */}
              <div
                className={`flex items-center gap-2 p-2 rounded-xl text-[9px] font-bold border mb-3 select-none transition-colors ${
                  prod.stockAvailable
                    ? 'bg-[#E6F4EA]/50 text-brand-900 border-[#12634B]/10'
                    : 'bg-red-50 text-red-700 border-red-200/50'
                }`}
              >
                <span>{prod.stockAvailable ? '✅' : '❌'}</span>
                <span className="leading-tight">
                  {prod.stockAvailable
                    ? 'Product will be visible to customers in your selected area.'
                    : 'Product will be hidden from customers automatically.'}
                </span>
              </div>

              {/* Action buttons footer */}
              <div className="pt-2.5 border-t border-neutral-100/30">
                {isManageMode ? (
                  // Shopkeeper Admin quick-actions list
                  <div className="flex flex-col gap-2 select-none">
                    {/* Stock switcher */}
                    <div className="scale-85 origin-left">
                      <StockToggle
                        checked={prod.stockAvailable}
                        onChange={() => onToggleStock(prod.id)}
                      />
                    </div>
                    {/* Pencil Edit action button */}
                    <button
                      type="button"
                      onClick={() => handleAction('edit', prod)}
                      className="w-full flex items-center justify-center gap-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-text-secondary hover:text-text-primary py-1.5 rounded-xl text-[10px] font-bold transition-all duration-300 cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit Details</span>
                    </button>
                  </div>
                ) : (
                  // Customer standard checkout button
                  <button
                    type="button"
                    onClick={() => handleAction('add', prod)}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#E6F4EA] border border-[#12634B]/10 hover:bg-[#12634B]/10 text-brand-900 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-3xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
