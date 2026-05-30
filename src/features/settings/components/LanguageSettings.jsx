import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSettings() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900">
          <Globe className="w-5 h-5 text-brand-700" />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Language Settings</h3>
          <p className="text-xs text-text-secondary mt-0.5">Select your primary display language for the application.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-neutral-100 rounded-2xl bg-white">
          <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">Primary Display Language</label>
          <select className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
            <option value="en">English (Default)</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="gu">Gujarati (ગુજરાતી)</option>
            <option value="mr">Marathi (मराठी)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
