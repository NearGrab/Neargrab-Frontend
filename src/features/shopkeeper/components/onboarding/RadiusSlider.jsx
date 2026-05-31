import React from 'react';

export default function RadiusSlider({ value, onChange }) {
  const options = ['250m', '500m', '1km', '2km', '3km'];

  const selectedIndex = options.indexOf(value) !== -1 ? options.indexOf(value) : 2;

  const handleStepClick = (index) => {
    onChange(options[index]);
  };

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-text-primary font-poppins">
          Delivery / Search Radius
        </label>
        <span className="bg-[#E6F4EA] text-brand-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
          {value}
        </span>
      </div>

      <div className="relative py-4 flex items-center select-none">
        {/* Track Line */}
        <div className="w-full h-1 bg-neutral-200 rounded-full relative">
          {/* Active Fill Track */}
          <div
            className="absolute left-0 top-0 h-full bg-brand-900 rounded-full transition-all duration-300"
            style={{ width: `${(selectedIndex / (options.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps/Circles */}
        <div className="absolute inset-x-0 top-1.5 flex justify-between px-0.5">
          {options.map((opt, idx) => {
            const isActive = idx <= selectedIndex;
            const isCurrent = opt === value;

            return (
              <div
                key={opt}
                onClick={() => handleStepClick(idx)}
                className="flex flex-col items-center cursor-pointer group"
                style={{ width: '40px' }}
              >
                {/* Active Indicator Ring */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-brand-900 border-brand-900 text-white ring-4 ring-brand-100 scale-110'
                      : isActive
                      ? 'bg-brand-900 border-brand-900 text-white'
                      : 'bg-white border-neutral-300 text-text-muted hover:border-neutral-400'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-white ${isCurrent ? 'block' : 'hidden'}`} />
                </div>

                {/* Step Label */}
                <span
                  className={`text-[10px] font-bold mt-2 font-poppins transition-colors ${
                    isCurrent ? 'text-brand-900 scale-105' : 'text-text-muted group-hover:text-text-primary'
                  }`}
                >
                  {opt}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
