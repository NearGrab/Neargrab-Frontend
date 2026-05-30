import React from 'react';
import { Sliders } from 'lucide-react';

export default function PreferencesSettings() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900">
          <Sliders className="w-5 h-5 text-brand-700" />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Application Preferences</h3>
          <p className="text-xs text-text-secondary mt-0.5">Customize your browsing layout, theme style, and accessibility options.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Theme Mode toggle */}
        <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white">
          <div>
            <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Enable Dark Mode</span>
            <span className="block text-[11px] text-text-secondary">Switch application layout to a curated night theme</span>
          </div>
          <button
            type="button"
            onClick={() => alert('Premium Dark Mode active soon!')}
            className="w-11 h-6 rounded-full p-0.5 bg-neutral-200 transition-all duration-300 relative focus:outline-none cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 translate-x-0" />
          </button>
        </div>

        {/* Autoplay videos toggle */}
        <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white">
          <div>
            <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Autoplay Media</span>
            <span className="block text-[11px] text-text-secondary">Autoplay product demonstration clips when visible</span>
          </div>
          <button
            type="button"
            className="w-11 h-6 rounded-full p-0.5 bg-brand-900 transition-all duration-300 relative focus:outline-none cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 translate-x-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
