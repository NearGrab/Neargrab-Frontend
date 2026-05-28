import React from 'react';
import { ArrowRight, Store, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../../data/content.json';

export default function Hero() {
  const { hero } = content;
  
  return (
    <section className="bg-gray-50 pt-16 pb-24 px-8 overflow-hidden relative">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Column (Text) */}
        <div className="max-w-2xl order-last lg:order-first">
          <h1 className="text-5xl lg:text-7xl font-poppins font-bold text-brand-900 leading-[1.1] mb-6">
            {hero.headingLine1}<br />
            <span className="text-amber-500">{hero.headingLine2}</span>
          </h1>

          <p className="text-gray-600 text-lg mb-10 max-w-lg leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link to="/explore" className="bg-brand-900 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all cursor-pointer shadow-lg shadow-brand-900/20 whitespace-pre-line">
              {hero.primaryButton} <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:border-brand-900 hover:text-brand-900 transition-all cursor-pointer whitespace-pre-line text-left leading-tight">
              <Store className="w-5 h-5 shrink-0" /> {hero.secondaryButton}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Truck className="text-emerald-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{hero.badges[0].title}</h4>
                <p className="text-gray-500 text-xs">{hero.badges[0].description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{hero.badges[1].title}</h4>
                <p className="text-gray-500 text-xs">{hero.badges[1].description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <HeartHandshake className="text-amber-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{hero.badges[2].title}</h4>
                <p className="text-gray-500 text-xs">{hero.badges[2].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="relative order-first lg:order-last mb-10 lg:mb-0">
          <div className="absolute inset-0 bg-emerald-100/50 rounded-full blur-3xl -z-10 transform scale-110 translate-x-10 translate-y-10"></div>
          <img src={hero.image} alt="Hero App Preview" className="w-full h-auto object-contain scale-110 drop-shadow-2xl" />
        </div>

      </div>
    </section>
  );
}
