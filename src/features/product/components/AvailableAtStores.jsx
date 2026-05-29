import React, { useState } from 'react';
import { RotateCw, Star, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '../../../shared/components/ui/Badge';
import Button from '../../../shared/components/ui/Button';

export default function AvailableAtStores({ stores = [], productName = 'Product' }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleNavigation = (storeName) => {
    alert(`Map navigation routing and shop detailed pages for "${storeName}" coming soon!`);
  };

  // Dynamic walk duration calculator
  const getWalkTime = (distance) => {
    const mins = Math.round(distance * 12);
    if (mins <= 2) return '2 mins away';
    return `${mins} mins away`;
  };

  // Mock list expansion to simulate dynamic "View more stores" drawer fold
  const visibleStores = isExpanded 
    ? [...stores, 
        {
          id: 'store-extra-1',
          name: 'Metro Cash & Carry',
          verified: true,
          distance: 1.2,
          price: 143,
          originalPrice: 160,
          discount: '11% OFF',
          rating: 4.6,
          reviewsCount: 342,
          inStock: true,
          category: 'Supermarket, Bulk Sales',
          image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: 'store-extra-2',
          name: 'Navsari Organic Bazar',
          verified: false,
          distance: 1.8,
          price: 152,
          originalPrice: 160,
          discount: '5% OFF',
          rating: 4.2,
          reviewsCount: 54,
          inStock: true,
          category: 'Organic, Wellness',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
        }
      ]
    : stores;

  return (
    <div className="w-full bg-white border border-neutral-100/90 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col gap-5 text-left">
      
      {/* Card Header block */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div>
          <h2 className="font-poppins font-extrabold text-text-primary text-base md:text-lg tracking-wide">
            Available at nearby stores
          </h2>
          <span className="text-[10px] text-text-muted font-medium font-inter">
            Updated 15 mins ago
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-50 text-text-secondary cursor-pointer hover:rotate-45 transition-all shadow-sm"
          aria-label="Refresh store inventory"
        >
          <RotateCw className={`w-3.5 h-3.5 text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* DESKTOP COMPARATIVE TABLE (Hidden on mobile < md) */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-left border-collapse font-inter">
          <thead>
            <tr className="border-b border-neutral-100 text-[11px] font-bold text-text-muted uppercase tracking-wider">
              <th className="pb-3 pr-2">Store</th>
              <th className="pb-3 px-2">Distance</th>
              <th className="pb-3 px-2">Price</th>
              <th className="pb-3 px-2">Rating</th>
              <th className="pb-3 px-2">Availability</th>
              <th className="pb-3 pl-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100/80">
            {visibleStores.map((store) => (
              <tr key={store.id} className="hover:bg-neutral-50/40 transition-colors">
                {/* 1. Store Details Column */}
                <td className="py-3.5 pr-2 flex items-center gap-3">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shrink-0 shadow-sm"
                  />
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-text-primary">{store.name}</span>
                      {store.verified && (
                        <span className="w-3.5 h-3.5 bg-[#0B3B2C] text-white rounded-full flex items-center justify-center scale-75 shrink-0">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-text-muted font-medium">{store.category}</span>
                  </div>
                </td>

                {/* 2. Distance Column */}
                <td className="py-3.5 px-2">
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-text-primary">{store.distance} km</span>
                    <span className="text-[9px] text-text-muted font-medium">{getWalkTime(store.distance)}</span>
                  </div>
                </td>

                {/* 3. Price Column */}
                <td className="py-3.5 px-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-extrabold text-orange-600">₹{store.price}</span>
                    {store.originalPrice && (
                      <span className="text-[10px] text-text-muted line-through font-normal">₹{store.originalPrice}</span>
                    )}
                  </div>
                  {store.discount && (
                    <div className="text-[9px] text-emerald-600 font-bold leading-none">{store.discount}</div>
                  )}
                </td>

                {/* 4. Rating Column */}
                <td className="py-3.5 px-2">
                  <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                    <span className="text-text-primary">{store.rating}</span>
                    <span className="text-[9px] text-text-muted font-normal">({store.reviewsCount})</span>
                  </div>
                </td>

                {/* 5. Availability Column */}
                <td className="py-3.5 px-2">
                  <Badge variant={store.inStock ? 'brand' : 'danger'} size="sm" className="!font-bold">
                    {store.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </td>

                {/* 6. Navigation Button Column */}
                <td className="py-3.5 pl-2 text-right">
                  <Button
                    onClick={() => handleNavigation(store.name)}
                    variant="primary"
                    size="sm"
                    className="!py-1.5 !px-3 text-[10px] ml-auto flex items-center gap-1"
                    rightIcon={<ArrowRight className="w-3 h-3 text-white shrink-0" />}
                  >
                    Navigate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST LAYOUT (Shown only on mobile < md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {visibleStores.map((store) => (
          <div 
            key={store.id} 
            className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col gap-3 hover:bg-neutral-50/80 transition-colors"
          >
            {/* Row 1: Store profile and status */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-9 h-9 rounded-xl object-cover border border-neutral-200/80 shrink-0"
                />
                <div className="leading-tight">
                  <div className="flex items-center gap-0.8">
                    <span className="text-[11px] font-bold text-text-primary truncate max-w-[120px]">{store.name}</span>
                    {store.verified && (
                      <span className="w-3.5 h-3.5 bg-[#0B3B2C] text-white rounded-full flex items-center justify-center scale-75 shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-text-muted font-medium">{store.category}</span>
                </div>
              </div>
              
              {/* Mobile Availability */}
              <Badge variant={store.inStock ? 'brand' : 'danger'} size="sm" className="!font-bold shrink-0">
                {store.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>

            {/* Row 2: Distance, walk, ratings and price */}
            <div className="grid grid-cols-3 gap-2 py-1.8 border-y border-neutral-200/40 text-[10px] font-semibold text-text-secondary">
              <div className="flex flex-col text-left leading-tight">
                <span className="text-text-muted text-[8px] uppercase tracking-wide">Distance</span>
                <span className="text-text-primary text-[11px] font-bold mt-0.5">{store.distance} km</span>
                <span className="text-text-muted text-[8px] font-medium leading-none">{getWalkTime(store.distance)}</span>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-text-muted text-[8px] uppercase tracking-wide">Rating</span>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold mt-0.5">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="text-text-primary text-[11px]">{store.rating}</span>
                </div>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-text-muted text-[8px] uppercase tracking-wide">Price</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-orange-600 text-[11px] font-bold">₹{store.price}</span>
                  {store.originalPrice && (
                    <span className="text-text-muted text-[8px] line-through font-normal">₹{store.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Row 3: Action Trigger */}
            <Button
              onClick={() => handleNavigation(store.name)}
              variant="primary"
              size="sm"
              className="w-full !py-2 flex items-center justify-center gap-1"
              rightIcon={<ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />}
            >
              Navigate to Store
            </Button>
          </div>
        ))}
      </div>

      {/* Drawer fold trigger "View more stores" */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full border-t border-neutral-100 pt-4 flex items-center justify-center gap-1.5 text-brand-900 hover:text-brand-800 font-poppins font-bold text-xs cursor-pointer select-none transition-colors"
      >
        <span>{isExpanded ? 'View less stores' : 'View more stores (7)'}</span>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

    </div>
  );
}
