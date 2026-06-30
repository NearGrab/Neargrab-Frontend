import React from 'react';
import { Copy, MapPin } from 'lucide-react';

export default function AddressCard({ address, distance, onNavigate }) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  return (
    <div 
      onClick={onNavigate}
      className="w-full max-w-[380px] mx-auto lg:max-w-none bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-4 cursor-pointer hover:border-brand-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-poppins font-extrabold text-text-muted text-[11px] uppercase tracking-wider">
          Address
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopyAddress();
          }}
          className="p-1.5 hover:bg-neutral-50 rounded-lg text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Copy address to clipboard"
        >
          <Copy className="w-3.5 h-3.5 text-text-secondary" />
        </button>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed font-inter font-medium -mt-1.5">
        {address}
      </p>

      {/* HIGH FIDELITY SVG MINI MAP COMPONENT - Reduced height and width styling */}
      <div className="w-full h-32 bg-[#E8F5E9]/30 border border-emerald-100/50 rounded-2xl relative overflow-hidden shadow-inner">
        {/* Visual grid lines for map landscape */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Grid overlay */}
          <defs>
            <pattern id="map-grid-compact" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#A7F3D0" strokeWidth="0.5" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid-compact)" />

          {/* Park lands polygons */}
          <path d="M-10,80 Q40,50 80,90 L30,150 Z" fill="#D1FAE5" opacity="0.5" />
          <path d="M180,10 Q220,-10 260,20 L280,110 Z" fill="#D1FAE5" opacity="0.4" />

          {/* Custom golden dotted road routing path */}
          <path 
            d="M 40 95 Q 95 80 115 45 T 195 45" 
            fill="none" 
            stroke="#F59E0B" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeDasharray="5,5" 
          />

          {/* Road outline underlay */}
          <path 
            d="M-20,95 L300,60" 
            fill="none" 
            stroke="white" 
            strokeWidth="8" 
            opacity="0.6"
          />
          <path 
            d="M-20,95 L300,60" 
            fill="none" 
            stroke="#E2E8F0" 
            strokeWidth="1.5" 
          />

          {/* Park Labels */}
          <text x="25" y="115" fill="#047857" fontSize="7" fontWeight="bold" fontFamily="Poppins" opacity="0.6">Navsari Garden</text>
          <text x="180" y="20" fill="#047857" fontSize="7" fontWeight="bold" fontFamily="Poppins" opacity="0.6">Main Rd</text>

          {/* User location pin pulse (Start coordinate) */}
          <circle cx="40" cy="95" r="10" fill="#10B981" opacity="0.15" />
          <circle cx="40" cy="95" r="6" fill="#10B981" opacity="0.3" />
          <circle cx="40" cy="95" r="3" fill="#10B981" />

          {/* Golden tag distance overlay label */}
          <g transform="translate(85, 42)">
            <rect x="0" y="0" width="76" height="16" rx="8" fill="#FFFBEB" stroke="#FBBF24" strokeWidth="0.8" />
            <text x="38" y="11" fill="#D97706" fontSize="7.5" fontWeight="extrabold" textAnchor="middle" fontFamily="Inter">
              {distance ? `${distance} km from you` : 'Nearby'}
            </text>
          </g>
        </svg>

        {/* Golden store destination pin (End coordinate) */}
        <div className="absolute top-[28px] right-[78px] flex flex-col items-center">
          <div className="w-6.5 h-6.5 rounded-full bg-[#0B3B2C] text-white flex items-center justify-center shadow-md animate-bounce">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
