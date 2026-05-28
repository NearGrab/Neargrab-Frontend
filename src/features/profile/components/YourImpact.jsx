import React from 'react';
import { Leaf, Store, Heart, MapPin } from 'lucide-react';

export default function YourImpact({ impact }) {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 md:p-6 text-left relative overflow-hidden group hover:shadow-md transition-shadow">
      {/* Subtle background decoration */}
      <div className="absolute right-0 bottom-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-3.5">
        <h3 className="font-poppins font-bold text-base md:text-lg text-text-primary">
          Your Impact
        </h3>
        <Leaf className="w-4 h-4 text-emerald-600 animate-pulse" />
      </div>

      <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6 font-medium">
        By shopping local and reviewing honestly, you help your community grow stronger.
      </p>

      {/* Three circular node impact counters horizontal grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center p-2 bg-neutral-50 rounded-2xl border border-neutral-200/30">
          <Store className="w-4 h-4 text-brand-900 mb-2" />
          <span className="block font-poppins font-bold text-base text-text-primary leading-none mb-1">
            {impact.shopsSupported}
          </span>
          <span className="text-[9px] text-text-secondary font-semibold uppercase tracking-wider leading-none text-center">
            Shops
          </span>
        </div>

        <div className="flex flex-col items-center p-2 bg-neutral-50 rounded-2xl border border-neutral-200/30">
          <Heart className="w-4 h-4 text-red-500 fill-red-500 mb-2 animate-pulse" />
          <span className="block font-poppins font-bold text-base text-text-primary leading-none mb-1">
            {impact.helpfulVotes}
          </span>
          <span className="text-[9px] text-text-secondary font-semibold uppercase tracking-wider leading-none text-center">
            Helpful
          </span>
        </div>

        <div className="flex flex-col items-center p-2 bg-neutral-50 rounded-2xl border border-neutral-200/30">
          <MapPin className="w-4 h-4 text-amber-500 mb-2" />
          <span className="block font-poppins font-bold text-base text-text-primary leading-none mb-1">
            {impact.areasExplored}
          </span>
          <span className="text-[9px] text-text-secondary font-semibold uppercase tracking-wider leading-none text-center font-inter">
            Areas
          </span>
        </div>
      </div>
    </div>
  );
}
