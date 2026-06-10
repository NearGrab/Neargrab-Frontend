import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Navigation, Store } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function SoldByCard({ soldBy }) {
  const navigate = useNavigate();
  const { productId } = useParams();

  const handleNavigate = () => {
    navigate(`/product/${productId || 'prod-fortune-1l'}/map?shopId=${soldBy.id}`);
  };

  const handleCheckStore = () => {
    if (soldBy.id) {
      navigate(`/shops/${soldBy.id}`);
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-4">
      <h3 className="font-poppins font-extrabold text-text-muted text-[11px] uppercase tracking-wider">
        Sold by
      </h3>
      
      <div className="flex items-center gap-3">
        <img
          src={soldBy.image}
          alt={soldBy.name}
          className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shadow-sm shrink-0"
        />
        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <span className="text-sm font-extrabold text-text-primary">{soldBy.name}</span>
            {soldBy.verified && (
              <span className="w-3.5 h-3.5 bg-[#0B3B2C] text-white rounded-full flex items-center justify-center scale-75 shrink-0">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
          {/* Rating row */}
          <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500 mt-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
            <span className="text-text-primary">{soldBy.rating}</span>
            <span className="text-[10px] text-text-muted font-normal">({soldBy.reviewsCount})</span>
            <span className="text-text-muted text-[10px] px-1 font-normal">•</span>
            <span className="text-[10px] text-text-secondary font-medium">{soldBy.category}</span>
          </div>
        </div>
      </div>

      {/* Timing, Delivery Metadatas block */}
      <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-neutral-100 text-[10px] font-semibold text-text-secondary font-inter">
        <div className="flex flex-col text-left leading-tight">
          <span className="text-text-muted text-[8px] uppercase tracking-wide">Status</span>
          <span className="text-emerald-600 font-extrabold mt-0.8">{soldBy.status}</span>
          <span className="text-[8px] text-text-muted font-medium leading-none mt-0.5">{soldBy.timings}</span>
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-text-muted text-[8px] uppercase tracking-wide">Est. distance</span>
          <span className="text-text-primary font-bold mt-0.8">{soldBy.distance} km away</span>
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-text-muted text-[8px] uppercase tracking-wide">Delivery</span>
          <span className="text-text-secondary font-bold mt-0.8">{soldBy.delivery}</span>
        </div>
      </div>

      {/* Reusable premium action buttons utilizing Button.jsx primitive */}
      <div className="grid grid-cols-2 gap-3.5 mt-1 select-none">
        <Button
          onClick={handleNavigate}
          variant="primary"
          size="sm"
          className="!py-2.5 flex items-center justify-center gap-1.5"
          leftIcon={<Navigation className="w-3.5 h-3.5 text-white" />}
        >
          Navigate to Shop
        </Button>
        
        <Button
          onClick={handleCheckStore}
          variant="outline"
          size="sm"
          className="!py-2.5 flex items-center justify-center gap-1.5"
          leftIcon={<Store className="w-3.5 h-3.5 text-text-secondary" />}
        >
          Check Store
        </Button>
      </div>
    </div>
  );
}
