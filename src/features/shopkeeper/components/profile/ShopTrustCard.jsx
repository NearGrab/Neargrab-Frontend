import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, Smile } from 'lucide-react';

export default function ShopTrustCard() {
  const points = [
    {
      title: 'Verified Shop',
      desc: 'Identity & address verified',
      icon: ShieldCheck,
      bg: 'bg-emerald-50 text-brand-900 border-brand-100/30'
    },
    {
      title: 'High Quality Products',
      desc: 'Sourced from trusted brands',
      icon: Sparkles,
      bg: 'bg-amber-50 text-amber-700 border-amber-100/40'
    },
    {
      title: 'Great Customer Support',
      desc: 'Quick response & friendly service',
      icon: HeartHandshake,
      bg: 'bg-blue-50 text-blue-700 border-blue-100/50'
    },
    {
      title: 'Loved by Locals',
      desc: '15K+ happy customers',
      icon: Smile,
      bg: 'bg-pink-50 text-pink-700 border-pink-100/50'
    }
  ];

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-4 shadow-3xs text-left font-inter flex flex-col gap-3.5 select-none">
      
      {/* Title Header */}
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
        Why shop here?
      </h3>

      {/* Points */}
      <div className="flex flex-col gap-3.5">
        {points.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <div key={idx} className="flex gap-3 text-left">
              {/* Rounded icon */}
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-3xs ${pt.bg}`}>
                <Icon className="w-4 h-4" />
              </div>
              {/* Details text */}
              <div className="min-w-0">
                <span className="text-[10px] md:text-xs font-bold text-text-secondary block">
                  {pt.title}
                </span>
                <span className="text-[9px] text-text-muted font-bold block mt-0.5 leading-normal">
                  {pt.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
