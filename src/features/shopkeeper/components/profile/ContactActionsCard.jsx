import React from 'react';
import { MessageSquare, PhoneCall, Compass } from 'lucide-react';

export default function ContactActionsCard({ shopInfo = {}, onAction }) {
  const {
    phone = '+91 98765 43210',
    whatsapp = '+91 98765 43210',
    distance = '0.8 km away'
  } = shopInfo;

  const handleAction = (type) => {
    if (onAction) {
      onAction(type);
    }
    if (type === 'whatsapp') {
      window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    } else if (type === 'call') {
      window.open(`tel:${phone}`, '_self');
    } else if (type === 'directions') {
      if (!onAction) {
        alert('Launching Google Maps directions to Navsari storefront...');
      }
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-4 shadow-3xs text-left font-inter flex flex-col gap-3 select-none">
      
      {/* 1. Chat on WhatsApp */}
      <button
        type="button"
        onClick={() => handleAction('whatsapp')}
        className="w-full border border-neutral-150/70 hover:border-brand-900/30 hover:bg-[#F0FDF4]/30 rounded-xl p-3 flex items-start gap-3 transition-all duration-300 text-left cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 text-brand-900 shrink-0 shadow-3xs">
          <MessageSquare className="w-4 h-4 text-brand-900 fill-brand-900/10" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] md:text-xs font-bold text-text-primary block font-poppins">
            Chat on WhatsApp
          </span>
          <span className="text-[9px] text-text-muted font-bold block mt-0.5">
            Usually replies in 10 mins
          </span>
        </div>
      </button>

      {/* 2. Call Shop */}
      <button
        type="button"
        onClick={() => handleAction('call')}
        className="w-full border border-neutral-150/70 hover:border-brand-900/30 hover:bg-[#F0FDF4]/30 rounded-xl p-3 flex items-start gap-3 transition-all duration-300 text-left cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 text-brand-900 shrink-0 shadow-3xs">
          <PhoneCall className="w-4 h-4 text-brand-900" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] md:text-xs font-bold text-text-primary block font-poppins">
            Call Shop
          </span>
          <span className="text-[9px] text-text-muted font-bold block mt-0.5">
            {phone}
          </span>
        </div>
      </button>

      {/* 3. Get Directions */}
      <button
        type="button"
        onClick={() => handleAction('directions')}
        className="w-full border border-neutral-150/70 hover:border-brand-900/30 hover:bg-[#F0FDF4]/30 rounded-xl p-3 flex items-start gap-3 transition-all duration-300 text-left cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-[#12634B]/10 text-brand-900 shrink-0 shadow-3xs">
          <Compass className="w-4 h-4 text-brand-900" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] md:text-xs font-bold text-text-primary block font-poppins">
            Get Directions
          </span>
          <span className="text-[9px] text-text-muted font-bold block mt-0.5">
            {distance}
          </span>
        </div>
      </button>

    </div>
  );
}
