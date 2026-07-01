import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function ConnectedAccounts({ user }) {
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
              <span className="block text-[10px] text-text-secondary truncate max-w-[150px]">
                {user?.email || 'Not Connected'}
              </span>
            </div>
          </div>
          {user?.email ? (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
          ) : (
            <span className="text-[10px] text-text-muted font-bold font-poppins">Unlinked</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-brand-50 rounded-lg flex items-center justify-center font-bold text-brand-900 text-xs shrink-0">
              📞
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs text-text-primary">Phone</span>
              <span className="block text-[10px] text-text-secondary">
                {user?.phone || 'Not Connected'}
              </span>
            </div>
          </div>
          {user?.phone ? (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
          ) : (
            <span className="text-[10px] text-text-muted font-bold font-poppins">Unlinked</span>
          )}
        </div>
      </div>
    </div>
  );
}
