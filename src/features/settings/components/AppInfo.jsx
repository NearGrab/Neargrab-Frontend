import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AppInfo() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 transition-all hover:shadow-md">
      <h4 className="font-poppins font-bold text-text-primary text-sm mb-4">App Information</h4>
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center py-1">
          <span className="text-text-secondary font-medium">App Version</span>
          <span className="text-text-primary font-poppins font-bold">1.0.0</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-text-secondary font-medium">Last Updated</span>
          <span className="text-text-primary font-poppins font-bold">July 1, 2026</span>
        </div>
        
        <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
          <Link
            to="/terms"
            className="text-text-secondary hover:text-brand-900 font-semibold flex justify-between items-center transition-colors"
          >
            <span>Terms of Service</span>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
          </Link>
          <Link
            to="/privacy"
            className="text-text-secondary hover:text-brand-900 font-semibold flex justify-between items-center transition-colors"
          >
            <span>Privacy Policy</span>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
          </Link>
        </div>
      </div>
    </div>
  );
}
