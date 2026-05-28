import React from 'react';
import { ArrowRight, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';

export default function CTABanner() {
  const { footer } = content;

  return (
    <div className="max-w-[90rem] mx-auto px-4 md:px-8 -translate-y-1/2 select-none">
      <div className="bg-brand-900 rounded-[2rem] p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Shop Icon Illustration */}
        <div className="hidden lg:flex relative z-10 items-center justify-center w-40 h-40 shrink-0">
          <img src={footer.cta.image} alt="Shop Illustration" className="w-full h-full object-contain drop-shadow-lg" />
        </div>

        <div className="relative z-10 lg:max-w-xl text-center lg:text-left flex-1">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-4 leading-tight">
            {footer.cta.heading}
          </h2>
          <p className="text-emerald-100 font-inter">
            {footer.cta.description}
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Link to="/explore" className="bg-white text-brand-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all cursor-pointer">
            {footer.cta.primaryButton} <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
            <Store className="w-5 h-5" /> {footer.cta.secondaryButton} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
