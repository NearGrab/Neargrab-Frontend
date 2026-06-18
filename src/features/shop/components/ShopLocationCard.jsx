import React, { useState } from 'react';
import { Compass, Copy, Check, MapPin } from 'lucide-react';
import { Button } from '../../../shared/components/ui';

export default function ShopLocationCard({ shopInfo = {} }) {
  const {
    location = '',
    name = '',
    googleMapsUrl = ''
  } = shopInfo;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(location);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const finalGoogleMapsUrl = googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location || name)}`;

  const handleOpenMaps = () => {
    window.open(finalGoogleMapsUrl, '_blank');
  };

  return (
    <div className="w-full bg-white border border-neutral-200/50 rounded-3xl p-5 shadow-sm text-left font-inter flex flex-col gap-4">
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
        Storefront Location
      </h3>

      <div className="flex gap-3 items-start border border-neutral-100 rounded-2xl p-3 bg-neutral-50/50">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0">
          <MapPin className="w-4 h-4 text-emerald-700" />
        </div>
        <div className="min-w-0 flex-grow">
          <span className="text-[11px] font-bold text-text-primary block font-poppins">
            Store Address
          </span>
          <p className="text-[10px] text-text-secondary font-medium leading-relaxed mt-0.5 break-words">
            {location || 'No address details provided.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full">
        {/* Copy Address */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 rounded-xl p-2.5 flex items-center justify-center gap-1.5 transition-all text-xs font-bold text-text-secondary cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" />
              <span className="text-emerald-700">Copied Address</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-text-muted" />
              <span>Copy Address</span>
            </>
          )}
        </button>

        {/* Open in Maps */}
        <button
          type="button"
          onClick={handleOpenMaps}
          className="flex-1 bg-brand-900 text-white hover:bg-brand-800 rounded-xl p-2.5 flex items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Open Maps</span>
        </button>
      </div>
    </div>
  );
}
