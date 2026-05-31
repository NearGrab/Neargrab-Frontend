import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentMethodsCard({ paymentMethods = {} }) {
  const {
    upi = true,
    googlePay = true,
    phonePe = true,
    paytm = true,
    cashOnDelivery = true
  } = paymentMethods;

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-4 shadow-3xs text-left font-inter flex flex-col gap-3.5 select-none">
      
      {/* Header */}
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
        Accepted Payments
      </h3>

      {/* Methods Row list */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        {/* UPI */}
        {upi && (
          <div className="border border-neutral-200/80 rounded-lg px-2.5 py-1.5 bg-neutral-50 shrink-0 font-poppins font-extrabold text-[9px] text-blue-700 tracking-wider shadow-3xs">
            BHIM UPI
          </div>
        )}

        {/* GPay */}
        {googlePay && (
          <div className="border border-neutral-200/80 rounded-lg px-2.5 py-1 bg-white shrink-0 shadow-3xs flex items-center justify-center h-8">
            <span className="font-poppins font-extrabold text-[10px] text-text-primary">
              <span className="text-blue-600">G</span>
              <span className="text-red-500">P</span>
              <span className="text-amber-500">a</span>
              <span className="text-emerald-600">y</span>
            </span>
          </div>
        )}

        {/* PhonePe */}
        {phonePe && (
          <div className="border border-neutral-200/80 rounded-lg px-2.5 py-1 bg-purple-50 shrink-0 font-poppins font-extrabold text-[9px] text-purple-700 shadow-3xs flex items-center h-8">
            PhonePe
          </div>
        )}

        {/* Paytm */}
        {paytm && (
          <div className="border border-neutral-200/80 rounded-lg px-2.5 py-1 bg-white shrink-0 shadow-3xs flex items-center justify-center h-8">
            <span className="font-poppins font-extrabold text-[9px] text-sky-600 tracking-tighter">
              paytm
            </span>
          </div>
        )}
      </div>

      {/* Cash on Delivery option footer */}
      {cashOnDelivery && (
        <div className="flex items-center gap-2 border-t border-neutral-100/60 pt-3 text-[10px] font-bold text-text-secondary">
          <CreditCard className="w-3.5 h-3.5 text-text-muted" />
          <span>Cash on Delivery available</span>
        </div>
      )}

    </div>
  );
}
