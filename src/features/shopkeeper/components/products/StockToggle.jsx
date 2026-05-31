import React from 'react';

export default function StockToggle({ checked, onChange }) {
  return (
    <div className="flex items-center gap-3">
      {/* Switch Button */}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-hidden cursor-pointer ${
          checked ? 'bg-brand-900 shadow-3xs' : 'bg-neutral-300'
        }`}
      >
        <span
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>

      {/* Label descriptor */}
      <span className="text-[11px] font-bold font-inter text-text-secondary select-none">
        {checked ? 'Yes, this product is available' : 'No, this product is out of stock'}
      </span>
    </div>
  );
}
