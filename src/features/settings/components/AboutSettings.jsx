import React from 'react';
import { Info } from 'lucide-react';

export default function AboutSettings() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900">
          <Info className="w-5 h-5 text-brand-700" />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">About Neargrab</h3>
          <p className="text-xs text-text-secondary mt-0.5">Discover the mission behind Neargrab platform.</p>
        </div>
      </div>

      <div className="space-y-4 text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
        <p>
          Neargrab is a premium local-first e-commerce discoverability suite engineered to empower neighborhoods, local shops, and communities. We bridge the gap between offline convenience and online accessibility.
        </p>
        <p>
          Made with 💚 for local sellers.
        </p>
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-text-muted">
          <span>© 2026 Neargrab Technologies Private Limited.</span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
}
