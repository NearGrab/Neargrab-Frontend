import React from 'react';
import { Target, Eye, Sparkles } from 'lucide-react';
import content from '../../data/content.json';

const iconMap = [
  <Target className="w-5 h-5 text-brand-600" />,
  <Eye className="w-5 h-5 text-accent-500" />,
  <Sparkles className="w-5 h-5 text-blue-600" />
];

export default function ValuesSection() {
  const { about } = content;
  const { vision } = about;

  return (
    <section className="py-24 px-6 md:px-8 max-w-[90rem] mx-auto bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column - Intro */}
        <div className="lg:col-span-5 text-left">
          <span className="text-brand-600 text-xs font-bold tracking-widest uppercase mb-3 block">
            OUR CORE DRIVERS
          </span>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-brand-900 leading-tight mb-4">
            {vision.heading}
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
            {vision.description}
          </p>
          <div className="hidden lg:block w-24 h-1 bg-accent-500 rounded-full"></div>
        </div>

        {/* Right Column - Horizontal Value Lists */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {vision.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-colors duration-300"
            >
              {/* Number and Icon Container */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center border border-neutral-200/60 shadow-sm font-bold text-xs text-text-primary">
                {iconMap[idx]}
              </div>

              {/* Text content */}
              <div>
                <h3 className="font-poppins font-bold text-text-primary text-base md:text-lg mb-1.5">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
