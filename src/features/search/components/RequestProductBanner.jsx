import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function RequestProductBanner({ onRequestClick }) {
  return (
    <div className="w-full bg-[#ECFDF5] border border-emerald-100/60 rounded-3xl p-5 shadow-sm text-left flex flex-col relative select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      <div className="pr-12">
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary leading-tight">
          Didn't find what you need?
        </h4>
        <p className="text-[10px] md:text-xs text-text-secondary mt-1.5 leading-relaxed">
          Can't find your product or brand? Request it and nearby shops will update you when it's available.
        </p>
      </div>

      {/* Basket vector graphic illustration */}
      <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 64 64" className="w-full h-full text-brand-900">
          <path d="M12,28 Q12,24 16,24 L48,24 Q52,24 52,28 L48,52 Q47,56 43,56 L21,56 Q17,56 16,52 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="2.5" />
          <path d="M22,24 Q22,8 32,8 Q42,8 42,24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="36" r="3" fill="#F59E0B" />
          <circle cx="40" cy="38" r="2.5" fill="#EF4444" />
          <rect x="30" y="32" width="4" height="12" fill="#10B981" rx="1" />
        </svg>
      </div>

      <button
        onClick={onRequestClick}
        className="w-full bg-white hover:bg-neutral-50 text-brand-900 font-poppins font-bold text-xs py-2.5 px-4 rounded-full border border-neutral-200/50 shadow-sm mt-5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
      >
        <HelpCircle className="w-4 h-4 text-brand-900" />
        <span>Request a Product</span>
      </button>
    </div>
  );
}
