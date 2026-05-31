import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function HelpCard() {
  return (
    <div className="flex items-center gap-3 bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-3.5 shadow-sm max-w-[180px] shrink-0">
      <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
        <HelpCircle className="w-5 h-5 text-brand-900" />
      </div>
      <div className="text-left leading-tight">
        <h4 className="text-xs font-bold text-brand-900 font-poppins">Need help?</h4>
        <button className="text-[10px] md:text-xs font-bold text-text-secondary hover:text-brand-900 transition-colors cursor-pointer hover:underline">
          Watch guide
        </button>
      </div>
    </div>
  );
}
