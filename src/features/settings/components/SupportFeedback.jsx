import React from 'react';
import { HelpCircle, Send } from 'lucide-react';

export default function SupportFeedback() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Support & Feedback</h3>
          <p className="text-xs text-text-secondary mt-0.5">Get help or share your feedback with us.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => alert('Redirecting to Neargrab Help Center...')}
          className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white hover:border-brand-200 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
              <HelpCircle className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary group-hover:text-brand-900 transition-colors">Help Center</span>
              <span className="block text-[11px] text-text-secondary">Find answers to common questions</span>
            </div>
          </div>
          <span className="text-text-muted text-xs group-hover:translate-x-0.5 transition-transform">▶</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Opening feedback form...')}
          className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white hover:border-brand-200 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
              <Send className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary group-hover:text-brand-900 transition-colors">Send Feedback</span>
              <span className="block text-[11px] text-text-secondary">Help us improve Neargrab</span>
            </div>
          </div>
          <span className="text-text-muted text-xs group-hover:translate-x-0.5 transition-transform">▶</span>
        </button>
      </div>
    </div>
  );
}
