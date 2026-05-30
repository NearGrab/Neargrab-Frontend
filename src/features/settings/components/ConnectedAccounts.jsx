import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function ConnectedAccounts() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 transition-all hover:shadow-md">
      <h4 className="font-poppins font-bold text-text-primary text-sm mb-4">Connected Accounts</h4>
      <div className="space-y-3.5">
        {/* Google */}
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center font-bold text-red-500 text-xs font-poppins shrink-0">
              G
            </div>
            <div className="overflow-hidden">
              <span className="block font-poppins font-bold text-xs text-text-primary">Google</span>
              <span className="block text-[10px] text-text-secondary truncate max-w-[150px]">rahulpatel@gmail.com</span>
            </div>
          </div>
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-brand-50 rounded-lg flex items-center justify-center font-bold text-brand-900 text-xs shrink-0">
              📞
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs text-text-primary">Phone</span>
              <span className="block text-[10px] text-text-secondary">+91 98765 43210</span>
            </div>
          </div>
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
        </div>

        <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-xs">
          <button
            onClick={() => alert('Opening account connections panel...')}
            className="text-brand-900 hover:text-brand-800 font-poppins font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Manage connected accounts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
