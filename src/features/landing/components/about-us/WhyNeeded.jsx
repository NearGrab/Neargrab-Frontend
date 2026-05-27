import React from 'react';
import { Coins, Zap, Leaf, Eye } from 'lucide-react';
import content from '../../data/content.json';

const iconMap = [
  <Coins className="w-6 h-6 text-emerald-600" />,
  <Zap className="w-6 h-6 text-amber-600" />,
  <Leaf className="w-6 h-6 text-green-600" />,
  <Eye className="w-6 h-6 text-blue-600" />
];

export default function WhyNeeded() {
  const { about } = content;
  const { whyNeeded } = about;

  return (
    <section className="py-24 px-6 md:px-8 bg-neutral-50 border-t border-b border-neutral-100">
      <div className="max-w-[90rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-600 text-xs font-bold tracking-widest uppercase mb-3 block">
            {whyNeeded.tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-text-primary mb-4">
            {whyNeeded.heading}
          </h2>
          <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {whyNeeded.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {whyNeeded.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-neutral-200/60 hover:border-brand-500 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center mb-6 shrink-0 border border-neutral-100">
                {iconMap[idx]}
              </div>

              {/* Title */}
              <h3 className="font-poppins font-bold text-text-primary text-lg mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
