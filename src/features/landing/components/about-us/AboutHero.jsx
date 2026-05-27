import React from 'react';
import { HeartHandshake, ShieldCheck } from 'lucide-react';
import content from '../../data/content.json';

export default function AboutHero() {
  const { about } = content;
  const { hero } = about;

  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      {/* Background Blurs for Premium Feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[30rem] bg-gradient-to-b from-brand-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-16 left-1/4 w-96 h-96 bg-accent-100/25 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Tagline */}
        <span className="inline-block text-brand-600 text-xs md:text-sm font-bold tracking-widest uppercase mb-4 bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
          {hero.tagline}
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-brand-900 tracking-tight mb-6 leading-[1.1]">
          Connecting Neighborhoods,<br />
          <span className="text-accent-500">Empowering Communities</span>
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
          {hero.description}
        </p>

        {/* Dynamic Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 border-t border-b border-neutral-200/60 py-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center border border-brand-100 shrink-0">
              <HeartHandshake className="text-brand-600 w-5 h-5" />
            </div>
            <span className="font-semibold text-text-primary text-sm md:text-base">Support Local Retailers</span>
          </div>
          <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-50 rounded-full flex items-center justify-center border border-accent-100 shrink-0">
              <ShieldCheck className="text-accent-500 w-5 h-5" />
            </div>
            <span className="font-semibold text-text-primary text-sm md:text-base">100% Direct & Transparent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
