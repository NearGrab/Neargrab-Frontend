import React from 'react';
import { MapPin, ShieldCheck, Award, Truck, ChevronRight } from 'lucide-react';

const propIcons = {
  convenient: () => (
    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
      <MapPin className="w-5 h-5" />
    </div>
  ),
  trusted: () => (
    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
      <ShieldCheck className="w-5 h-5" />
    </div>
  ),
  prices: () => (
    <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
      <Award className="w-5 h-5" />
    </div>
  ),
  delivery: () => (
    <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-600">
      <Truck className="w-5 h-5" />
    </div>
  )
};

export default function ValueProps({ propsData }) {
  return (
    <div className="w-full mt-10">
      {/* Grid container responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {propsData.map((item) => {
          const Icon = propIcons[item.id] || propIcons.convenient;

          return (
            <div
              key={item.id}
              className="bg-white border border-neutral-100/60 p-5 rounded-2xl flex items-center justify-between gap-3 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-brand-50 transition-all duration-300 ease-out cursor-pointer group active:scale-98"
            >
              <div className="flex items-center gap-3">
                {/* Visual Left Badge */}
                <Icon />
                
                {/* Visual Copy details */}
                <div className="text-left">
                  <h4 className="font-semibold text-text-primary text-xs md:text-sm group-hover:text-brand-900 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-text-secondary text-[10px] md:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Chevron arrow indicator */}
              <ChevronRight className="w-4 h-4 text-text-muted opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
