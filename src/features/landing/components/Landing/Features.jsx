import React from 'react';
import content from '../../data/content.json';

export default function Features() {
  const { features } = content;

  return (
    <section id="features" className="py-24 px-4 md:px-8 max-w-[90rem] mx-auto bg-gray-50">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-emerald-600 text-xs font-bold tracking-wider uppercase">{features.tagline}</span>
        </div>
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">{features.heading}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {features.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.items.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center mb-6 overflow-hidden shrink-0">
              <img src={item.icon} alt={item.title} loading="lazy" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-poppins font-semibold text-gray-900 mb-3 text-lg">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
