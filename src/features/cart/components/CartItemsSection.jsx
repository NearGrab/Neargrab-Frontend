import React from 'react';
import { Store, Trash2, ArrowUpRight, Navigation, Sparkles } from 'lucide-react';

export default function CartItemsSection({ items, updateQuantity, removeItem, onViewRoute }) {
  // Group items by shop
  const groupedShops = items.reduce((acc, item) => {
    const shopName = item.store || 'Local Store';
    if (!acc[shopName]) {
      acc[shopName] = {
        name: shopName,
        distance: item.distance || '0.3 km away',
        discountPercent: item.discountPercent || 0,
        items: []
      };
    }
    acc[shopName].items.push(item);
    return acc;
  }, {});

  const shopsArray = Object.values(groupedShops);

  // Helper to calculate shop subtotal details
  const getShopDetails = (shopItems) => {
    const itemsCount = shopItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = shopItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalSubtotal = shopItems.reduce((sum, item) => {
      const origPrice = item.originalPrice || item.price;
      return sum + (origPrice * item.quantity);
    }, 0);
    const savings = originalSubtotal - subtotal;
    return { itemsCount, subtotal, savings };
  };

  return (
    <div className="flex flex-col gap-5 text-left w-full">
      {shopsArray.map((shop, idx) => {
        const { itemsCount, subtotal, savings } = getShopDetails(shop.items);
        // Map discount based on design specs
        let discountMsg = "No offers";
        if (shop.name.includes('Patel')) {
          discountMsg = "5% OFF on this shop";
        } else if (shop.name.includes('Jain')) {
          discountMsg = "10% OFF on this shop";
        }

        return (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-neutral-300/60"
          >
            {/* Store Header Row */}
            <div className="flex items-center justify-between p-5 bg-neutral-50/40 border-b border-neutral-100/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-900 shadow-md shadow-brand-900/5 border border-brand-100/40 transform hover:rotate-3 transition-transform">
                  <Store className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-poppins font-extrabold text-sm md:text-base text-text-primary hover:text-brand-900 transition-colors">
                      {shop.name}
                    </h3>
                    <span className="text-emerald-500 text-xs" title="Verified Local Partner">✔</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-text-secondary mt-0.5 block font-medium">
                    📍 {shop.distance}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] md:text-xs font-bold font-poppins px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all ${
                  discountMsg !== 'No offers'
                    ? 'bg-gradient-to-r from-emerald-50 to-brand-50/50 text-brand-900 border border-brand-200/60 shadow-sm shadow-brand-900/5 animate-pulse'
                    : 'bg-neutral-100 text-text-secondary'
                }`}>
                  {discountMsg !== 'No offers' && <Sparkles className="w-3 h-3 text-brand-700" />}
                  <span>{discountMsg}</span>
                </span>
                <span className="text-text-muted text-xs cursor-pointer">▼</span>
              </div>
            </div>

            {/* Store Items List */}
            <div className="divide-y divide-neutral-100/80 px-5">
              {shop.items.map((item) => {
                const itemTotal = item.price * item.quantity;
                const hasDiscount = item.originalPrice && item.originalPrice > item.price;

                return (
                  <div key={item.id} className="py-5 flex items-center justify-between gap-4 group">
                    {/* Product visual info */}
                    <div className="flex items-center gap-4 flex-grow min-w-0">
                      <div className="w-16 h-16 bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden shrink-0 flex items-center justify-center relative group-hover:border-brand-200 transition-colors">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary truncate group-hover:text-brand-900 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] md:text-xs text-text-secondary mt-1 block font-medium">
                          {item.unit || '1 unit'}
                        </span>
                        {hasDiscount && (
                          <span className="inline-block mt-1.5 bg-brand-50/60 border border-brand-100/30 text-brand-900 text-[9px] md:text-[10px] font-extrabold px-2 py-0.5 rounded-md font-poppins shadow-sm">
                            {item.discountPercent || Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price list */}
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right hidden sm:block w-24">
                        <div className="flex items-baseline justify-end gap-1.5">
                          <span className="font-poppins font-bold text-xs md:text-sm text-text-primary">
                            ₹{item.price}
                          </span>
                          {hasDiscount && (
                            <span className="text-[10px] md:text-xs text-text-muted line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selectors */}
                      <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden bg-white shadow-sm shrink-0 focus-within:ring-2 focus-within:ring-brand-500/20">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-brand-50 hover:text-brand-900 font-bold font-poppins text-xs text-text-secondary cursor-pointer transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="px-3.5 py-1.5 font-poppins font-extrabold text-xs text-text-primary bg-neutral-50/50">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-brand-50 hover:text-brand-900 font-bold font-poppins text-xs text-text-secondary cursor-pointer transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right w-16">
                        <span className="font-poppins font-extrabold text-xs md:text-sm text-text-primary">
                          ₹{itemTotal}
                        </span>
                      </div>

                      {/* Delete item button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-text-muted hover:text-red-500 cursor-pointer p-1.5 rounded-full hover:bg-red-50 hover:scale-105 active:scale-95 transition-all shrink-0"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shop Subtotal Summary Area */}
            <div className="bg-neutral-50/40 p-4 border-t border-neutral-100 flex items-center justify-between text-xs md:text-sm">
              <span className="font-semibold text-text-secondary">
                Shop subtotal ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
              </span>
              <div className="flex items-center gap-3">
                <span className="font-poppins font-extrabold text-text-primary">
                  ₹{subtotal}
                </span>
                {savings > 0 && (
                  <span className="text-xs text-brand-900 font-bold font-poppins bg-brand-50/80 border border-brand-100/60 px-3 py-1 rounded-full shadow-sm">
                    You saved ₹{savings}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Multi-Shop Route Prompt card */}
      {shopsArray.length > 1 && (
        <div className="bg-gradient-to-r from-amber-50/20 to-brand-50/10 border border-amber-200/50 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 bg-amber-100/80 rounded-2xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-amber-200/30">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="block font-poppins font-black text-xs md:text-sm text-text-primary">
                Buying from multiple shops? 🛣
              </span>
              <span className="block text-[11px] md:text-xs text-text-secondary mt-0.5 leading-relaxed font-medium">
                We will help you navigate to all shops in the optimized visit sequence.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewRoute}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-neutral-200 text-text-primary hover:border-brand-500 hover:text-brand-900 font-poppins font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Shop Route</span>
            <ArrowUpRight className="w-4 h-4 text-brand-700" />
          </button>
        </div>
      )}
    </div>
  );
}
