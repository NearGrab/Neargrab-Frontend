import React, { useState } from 'react';
import { MapPin, Compass } from 'lucide-react';
import { useLocationStore } from '../../../store/useLocationStore';

export default function SearchMap() {
  const { location } = useLocationStore();
  const [hoveredPin, setHoveredPin] = useState(null);

  // Mock store pins plotted on coordinate grids
  const storePins = [
    { id: 'patel', name: 'Patel General Store', x: 120, y: 110, dist: '0.2 km' },
    { id: 'jain', name: 'Jain Kirana Store', x: 190, y: 90, dist: '0.4 km' },
    { id: 'shree', name: 'Shree Provision Store', x: 230, y: 180, dist: '0.5 km' },
    { id: 'fruits', name: 'Patel Fruits Center', x: 70, y: 150, dist: '0.3 km' }
  ];

  return (
    <div className="w-full bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm text-left select-none">
      
      {/* Title */}
      <h3 className="font-poppins font-bold text-sm text-text-primary mb-3">
        Search in this area
      </h3>

      {/* Stylized Animated Map visual */}
      <div className="w-full aspect-[4/3] rounded-2xl bg-[#E8F5E9]/35 border border-emerald-100/60 overflow-hidden relative shadow-inner">
        <svg 
          viewBox="0 0 300 225" 
          className="w-full h-full"
        >
          {/* Grid lines representing maps */}
          <defs>
            <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Primary Roads */}
          <path d="M -10,80 L 310,140" stroke="white" strokeWidth="6" fill="none" opacity="0.8" />
          <path d="M -10,80 L 310,140" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="4" fill="none" />
          <text x="20" y="70" className="text-[7px] font-bold fill-text-muted rotate-[11deg]">GIDC Rd</text>

          <path d="M 150,-10 L 150,235" stroke="white" strokeWidth="6" fill="none" opacity="0.8" />
          <path d="M 150,-10 L 150,235" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="4" fill="none" />
          <text x="156" y="40" className="text-[7px] font-bold fill-text-muted">Main Rd</text>

          <path d="M 40,235 L 260,-10" stroke="white" strokeWidth="4" fill="none" opacity="0.8" />
          <text x="80" y="210" className="text-[7px] font-bold fill-text-muted rotate-[-48deg]">Station Rd</text>

          {/* Circular Garden representation */}
          <circle cx="230" cy="50" r="24" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
          <text x="212" y="52" className="text-[7px] font-bold fill-emerald-800">Navsari</text>
          <text x="214" y="60" className="text-[6px] fill-emerald-800/80">Garden</text>

          {/* Search radius green circle boundary */}
          <circle cx="150" cy="112" r="75" fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.22)" strokeDasharray="3, 3" strokeWidth="1.5" />
          
          {/* Pulsing central home indicator */}
          <g>
            <circle cx="150" cy="112" r="16" fill="rgba(11, 59, 44, 0.12)" />
            <circle cx="150" cy="112" r="8" fill="#0B3B2C" className="animate-ping" style={{ transformOrigin: '150px 112px', animationDuration: '3s' }} />
            <circle cx="150" cy="112" r="7" fill="#0B3B2C" />
            <path d="M 150,108 L 153,113 L 147,113 Z" fill="white" />
            <rect x="148" y="113" width="4" height="3" fill="white" />
          </g>

          {/* Local store pins plotted on map */}
          {storePins.map((pin) => (
            <g 
              key={pin.id} 
              onMouseEnter={() => setHoveredPin(pin)}
              onMouseLeave={() => setHoveredPin(null)}
              className="cursor-pointer"
            >
              {/* Pulse effect */}
              <circle cx={pin.x} cy={pin.y} r="8" fill="rgba(16, 185, 129, 0.2)" className="hover:scale-125 transition-transform" />
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#10B981" />
              
              {/* Tooltip Hover Tag Popover */}
              {hoveredPin?.id === pin.id && (
                <g>
                  <rect x={pin.x - 50} y={pin.y - 28} width="100" height="20" rx="4" fill="#0B3B2C" />
                  <polygon points={`${pin.x},${pin.y-6} ${pin.x-4},${pin.y-10} ${pin.x+4},${pin.y-10}`} fill="#0B3B2C" />
                  <text x={pin.x} y={pin.y - 15} className="text-[6.5px] font-bold fill-white text-center" textAnchor="middle">
                    {pin.name} ({pin.dist})
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>

        {/* Floating Compass Card */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-neutral-100 rounded-lg p-1.5 flex items-center justify-center shadow-sm">
          <Compass className="w-4 h-4 text-brand-900 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
      </div>

      {/* Footer radius details */}
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-text-secondary font-semibold">
          Showing results {location.radius.toLowerCase()}
        </span>
        <button
          onClick={() => alert("To change search boundaries, use the location selector in the top navigation bar!")}
          className="font-bold text-brand-900 hover:text-brand-800 transition-colors cursor-pointer"
        >
          Change
        </button>
      </div>

    </div>
  );
}
