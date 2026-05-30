import React from 'react';
import { Download } from 'lucide-react';

export default function DataStorage() {
  const handleDownloadData = () => {
    alert('Preparing your Neargrab data export archive. You will receive a link to download your archive soon!');
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Data & Storage</h3>
          <p className="text-xs text-text-secondary mt-0.5">Manage your data and storage preferences.</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
            <Download className="w-4 h-4 text-brand-700" />
          </div>
          <div>
            <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Download My Data</span>
            <span className="block text-[11px] text-text-secondary">Get a copy of your data and activity archive</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadData}
          className="px-4 py-2 border border-neutral-200 text-text-secondary hover:text-brand-900 hover:border-brand-500 font-poppins font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span>Request Zip</span>
        </button>
      </div>
    </div>
  );
}
