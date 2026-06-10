import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  ShoppingBag, 
  ArrowRight, 
  Lock, 
  BadgeCheck, 
  Coins, 
  Smile, 
  HeartHandshake
} from 'lucide-react';
import { Button } from '../../../shared/components/ui';

export default function OrderSummarySidebar({ items, onCheckoutClick }) {
  const navigate = useNavigate();

  // Dynamic pricing calculations
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const grandTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const originalTotal = items.reduce((sum, item) => {
    const orig = item.originalPrice || item.price;
    return sum + (orig * item.quantity);
  }, 0);

  const totalDiscount = originalTotal - grandTotal;
  
  // Shop count
  const uniqueShops = new Set(items.map(item => item.store)).size;

  // Approximate transit distance logic
  const approxDistance = uniqueShops === 1 ? '0.3 km' : uniqueShops === 2 ? '0.7 km' : '1.2 km';

  return (
    <div className="flex flex-col gap-5 text-left w-full">
      {/* 1. Order Summary Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 transition-all hover:shadow-md">
        <h3 className="font-poppins font-extrabold text-sm md:text-base text-text-primary mb-4 pb-1 border-b border-neutral-100/50">
          Order Summary
        </h3>

        <div className="space-y-3.5 text-xs md:text-sm text-text-secondary font-medium">
          <div className="flex justify-between items-center">
            <span>Total Items</span>
            <span className="font-poppins font-bold text-text-primary">{totalItems}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Items Total</span>
            <span className="font-poppins font-bold text-text-primary">₹{originalTotal}</span>
          </div>

          {totalDiscount > 0 && (
            <>
              <div className="flex justify-between items-center">
                <span>Shop Discounts</span>
                <span className="font-poppins font-bold text-brand-900">- ₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>You Save</span>
                <span className="font-poppins font-bold text-brand-900">- ₹{totalDiscount}</span>
              </div>
            </>
          )}

          <div className="my-4 border-t border-neutral-100/80 pt-4 flex justify-between items-baseline">
            <span className="font-poppins font-extrabold text-sm md:text-base text-text-primary">
              Grand Total
            </span>
            <span className="font-poppins font-black text-lg md:text-xl text-text-primary">
              ₹{grandTotal}
            </span>
          </div>
        </div>

        {totalDiscount > 0 && (
          <div className="mt-4 bg-brand-50/50 border border-brand-100/50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-brand-100 rounded-xl flex items-center justify-center text-brand-900 shrink-0">
              <Smile className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs text-brand-900">
                Great choice!
              </span>
              <span className="block text-[10px] md:text-xs text-text-secondary mt-0.5 leading-normal font-medium">
                You're saving ₹{totalDiscount} with shop offers.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Pickup Information Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 transition-all hover:shadow-md">
        <h3 className="font-poppins font-extrabold text-sm md:text-base text-text-primary mb-4 pb-1 border-b border-neutral-100/50">
          Pickup Information
        </h3>

        <div className="space-y-4">
          {/* Location field */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 bg-neutral-50 border border-neutral-200/30 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-4.5 h-4.5 text-text-secondary" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs text-text-primary">Navsari, Gujarat</span>
              <span className="block text-[10px] md:text-xs text-text-secondary mt-0.5 font-medium">Within 3 km range</span>
            </div>
          </div>

          {/* Shop count field */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 bg-neutral-50 border border-neutral-200/30 rounded-xl flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4.5 h-4.5 text-text-secondary" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs text-text-primary">
                You will pick up from {uniqueShops} {uniqueShops === 1 ? 'shop' : 'shops'}
              </span>
              <span className="block text-[10px] md:text-xs text-text-secondary mt-0.5 leading-normal font-medium">
                Estimated total distance: {approxDistance}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            {/* Proceed to Checkout is commented out as reservation flow is disabled for now */}
            {/*
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold flex items-center justify-center gap-2 py-3 shadow-md shadow-brand-900/10 cursor-pointer"
              onClick={onCheckoutClick}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4.5 h-4.5 shrink-0" />
            </Button>
            */}
            <Button
              variant="primary"
              size="md"
              disabled
              className="w-full font-bold flex items-center justify-center gap-2 py-3 opacity-60 cursor-not-allowed"
            >
              <span>Reservations Disabled</span>
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full font-bold bg-white text-text-secondary border-neutral-200 hover:border-brand-500 hover:text-brand-900 cursor-pointer py-3"
              onClick={() => navigate('/explore')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Why Shop on Neargrab Value Props */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 transition-all hover:shadow-md">
        <h4 className="font-poppins font-extrabold text-xs md:text-sm text-text-primary mb-4">
          Why shop on Neargrab?
        </h4>

        <div className="grid grid-cols-2 gap-4">
          {/* Val 1 */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-neutral-50/50 border border-neutral-100">
            <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 mb-2">
              <BadgeCheck className="w-4.5 h-4.5 text-brand-700" />
            </div>
            <span className="font-poppins font-bold text-[10px] text-text-primary leading-tight">
              Trusted Local Shops
            </span>
          </div>

          {/* Val 2 */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-neutral-50/50 border border-neutral-100">
            <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 mb-2">
              <Coins className="w-4.5 h-4.5 text-brand-700" />
            </div>
            <span className="font-poppins font-bold text-[10px] text-text-primary leading-tight">
              No Delivery Charges
            </span>
          </div>

          {/* Val 3 */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-neutral-50/50 border border-neutral-100">
            <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 mb-2">
              <MapPin className="w-4.5 h-4.5 text-brand-700" />
            </div>
            <span className="font-poppins font-bold text-[10px] text-text-primary leading-tight">
              Nearby & Convenient
            </span>
          </div>

          {/* Val 4 */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-neutral-50/50 border border-neutral-100">
            <div className="w-8 h-8 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 mb-2">
              <HeartHandshake className="w-4.5 h-4.5 text-brand-700" />
            </div>
            <span className="font-poppins font-bold text-[10px] text-text-primary leading-tight">
              Real Reviews Real People
            </span>
          </div>
        </div>

        {/* Security Message */}
        <div className="mt-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl py-2.5 px-4 flex items-center justify-center gap-2 text-emerald-800 text-[10px] font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Your data is safe and secure</span>
        </div>
      </div>
    </div>
  );
}
