import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import content from '../../data/content.json';
import {Link} from 'react-router-dom';

export default function ForShopkeepers() {
  const { forShopkeepers } = content;
  
  return (
    <section id="for-shopkeepers" className="py-24 px-4 md:px-8 max-w-[90rem] mx-auto">
      <div className="bg-brand-900 rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent"></div>

        <div className="lg:w-1/2 relative z-10 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">{forShopkeepers.tagline}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold leading-tight mb-6 whitespace-pre-line">
            {forShopkeepers.heading}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
            {forShopkeepers.description}
          </p>

          <ul className="space-y-4 mb-10">
            {forShopkeepers.benefits.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link to='/shopkeeper/onboarding'>
            <button className="bg-white text-brand-900 px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-50 transition-all cursor-pointer">
              <StoreIcon className="w-5 h-5 shrink-0" /> {forShopkeepers.button} <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>

        <div className="lg:w-1/2 relative z-10 w-full h-[500px]">
          {/* Shopkeeper and Phone UI layout */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* We position the shopkeeper image and float the UI over it */}
            <img src={forShopkeepers.images.shopkeeper} alt="Shopkeeper" width="903" height="662" loading="lazy" className="h-[120%] object-cover absolute bottom-0 -left-10 z-10" />
            <img src={forShopkeepers.images.shopUI} alt="Shop UI" width="1174" height="1340" loading="lazy" className="w-[60%] absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-20 border-4 border-white/10 bg-white" />
          </div>
        </div>

      </div>
    </section>
  );
}

// Temporary inline SVG to match the exact mockup button style if Store from lucide doesn't look identical
function StoreIcon({className}) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}
