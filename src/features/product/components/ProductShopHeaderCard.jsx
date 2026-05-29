import React from 'react';
import Badge from '../../../shared/components/ui/Badge';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function ProductShopHeaderCard({ product }) {
  const { soldBy } = product;

  return (
    <div className="bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col sm:flex-row gap-5 items-start">
      {/* Product Picture Wrapper */}
      <img 
        src={product.images?.[0] || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80'} 
        alt={product.name} 
        className="w-30 h-30 sm:w-40 sm:h-40 rounded-2xl object-cover border border-neutral-100 shrink-0 self-center sm:self-start bg-neutral-50"
      />

      <div className="flex-grow w-full flex flex-col gap-3">
        <div className="flex flex-col gap-1 text-left">
          {/* Shop origin tag */}
          <Badge variant="brand" size="sm" className="w-fit !font-bold">
            Product from this shop
          </Badge>
          
          {/* Product and Shop titles */}
          <h1 className="font-poppins font-extrabold text-base sm:text-xl text-text-primary tracking-tight mt-1 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs sm:text-sm font-extrabold text-text-secondary">{soldBy.name}</span>
            {soldBy.verified && (
              <span className="w-3.5 h-3.5 bg-[#0B3B2C] text-white rounded-full flex items-center justify-center scale-75 shrink-0">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Coordinates and Timings details row */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-bold text-text-secondary font-inter">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-text-muted" />
            <span>{soldBy.distance} km away</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-text-muted" />
            <span>Open till {soldBy.timings?.split(' - ')[1] || '10:00 PM'}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.8 h-1.8 rounded-full bg-emerald-500" />
            <span className="text-emerald-700">In Stock</span>
          </div>
        </div>

        {/* Green verified stocking banner strip */}
        <div className="w-full bg-[#E6F4EA] border border-[#12634B]/10 p-3 rounded-2xl flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#0B3B2C] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] sm:text-xs font-extrabold text-[#0B3B2C]">Verified in stock 12 mins ago</span>
            <span className="text-[8px] sm:text-[9px] text-[#0B3B2C]/75 font-semibold">Information provided by the shop</span>
          </div>
        </div>
      </div>
    </div>
  );
}
