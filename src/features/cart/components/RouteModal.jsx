import React from 'react';
import { Navigation, ArrowRight, Home, MapPin, Store } from 'lucide-react';
import { Button } from '../../../shared/components/ui';

export default function RouteModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Styles for vector line movement */}
      <style>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .route-path-flow {
          stroke-dasharray: 6, 6;
          animation: flowDash 1.5s linear infinite;
        }
      `}</style>

      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-neutral-200/50 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-left mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-900 font-poppins font-bold text-[10px] rounded-full uppercase tracking-wider mb-2.5 shadow-sm shadow-brand-900/5">
            <Navigation className="w-3.5 h-3.5 text-brand-700 animate-pulse" />
            Optimized Route sequence
          </span>
          <h3 className="font-poppins font-black text-lg md:text-xl text-text-primary">
            Visit Sequence 🗺
          </h3>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed font-medium">
            Pick up your items in this optimized order to minimize distance (total: 1.2 km).
          </p>
        </div>

        {/* SVG Route Diagram */}
        <div className="bg-neutral-50 border border-neutral-200/40 rounded-2xl p-5 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Ambient lighting effect */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl" />

          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-[10px] text-text-muted font-bold font-poppins tracking-wider uppercase">START: Navsari</span>
            <span className="text-[10px] text-brand-900 font-extrabold font-poppins bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-md">
              1.2 KM TOTAL
            </span>
          </div>

          <div className="relative w-full flex items-center justify-between py-6 px-4">
            {/* SVG Connecting Route Path */}
            <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none" style={{ zIndex: 0 }}>
              <path 
                d="M 40 8 H 360" 
                stroke="#E2E8F0" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
              <path 
                d="M 40 8 H 360" 
                stroke="#10B981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="route-path-flow"
              />
            </svg>

            {/* Stop 1: Start Location */}
            <div className="flex flex-col items-center gap-2 z-10 relative">
              <div className="w-10 h-10 bg-brand-900 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-md border-2 border-white transform hover:scale-105 transition-transform">
                <Home className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold text-text-primary font-poppins">Home</span>
            </div>

            {/* Stop 2: Patel General */}
            <div className="flex flex-col items-center gap-2 z-10 relative">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-md border-2 border-white transform hover:scale-105 transition-transform">
                1
              </div>
              <span className="text-[10px] font-bold text-text-primary font-poppins">Patel Gen.</span>
              <span className="text-[9px] text-text-muted mt-0.5 font-medium">0.3 km</span>
            </div>

            {/* Stop 3: Shree Provision */}
            <div className="flex flex-col items-center gap-2 z-10 relative">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-md border-2 border-white transform hover:scale-105 transition-transform">
                2
              </div>
              <span className="text-[10px] font-bold text-text-primary font-poppins">Shree Prov.</span>
              <span className="text-[9px] text-text-muted mt-0.5 font-medium">0.4 km</span>
            </div>

            {/* Stop 4: Jain Kirana */}
            <div className="flex flex-col items-center gap-2 z-10 relative">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-md border-2 border-white transform hover:scale-105 transition-transform">
                3
              </div>
              <span className="text-[10px] font-bold text-text-primary font-poppins">Jain Kirana</span>
              <span className="text-[9px] text-text-muted mt-0.5 font-medium">0.5 km</span>
            </div>
          </div>
        </div>

        {/* Detailed steps list with Custom Stepper Icons */}
        <div className="space-y-4 mb-6 text-left">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 p-3.5 bg-neutral-50/50 border border-neutral-100 rounded-2xl hover:border-brand-100 hover:bg-brand-50/10 transition-colors">
            <div className="w-7 h-7 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-brand-100/50">
              1
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">First stop: Patel General Store</span>
              <span className="block text-[11px] text-text-secondary mt-0.5 leading-normal font-medium">
                0.3 km away. Pick up 2 products (Aashirvaad Atta, Fortune Sunlite Oil).
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5 p-3.5 bg-neutral-50/50 border border-neutral-100 rounded-2xl hover:border-brand-100 hover:bg-brand-50/10 transition-colors">
            <div className="w-7 h-7 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-brand-100/50">
              2
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Second stop: Shree Provision Store</span>
              <span className="block text-[11px] text-text-secondary mt-0.5 leading-normal font-medium">
                0.4 km further. Pick up 1 product (Amul Taaza Milk 1L x 2).
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5 p-3.5 bg-neutral-50/50 border border-neutral-100 rounded-2xl hover:border-brand-100 hover:bg-brand-50/10 transition-colors">
            <div className="w-7 h-7 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-brand-100/50">
              3
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Third stop: Jain Kirana Store</span>
              <span className="block text-[11px] text-text-secondary mt-0.5 leading-normal font-medium">
                0.5 km further. Pick up 1 product (Surf Excel Matic 2kg).
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 font-bold rounded-2xl"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="flex-1 font-bold flex items-center justify-center gap-1.5 shadow-sm rounded-2xl"
            onClick={() => {
              alert('Redirecting to Google Maps with optimized multi-stop route parameters...');
              onClose();
            }}
          >
            <span>Start Navigation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
