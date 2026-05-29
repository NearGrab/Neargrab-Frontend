import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, ShieldCheck } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function ProductDirectionsMap({ storeName = 'Patel General Store', distance = '0.2 km', address = 'Shop No. 12, GIDC Road' }) {
  const [activeTransit, setActiveTransit] = useState('walk');

  const handleGoogleMapsRedirect = () => {
    const query = encodeURIComponent(`${storeName}, ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const transitModes = [
    { id: 'walk', icon: '🚶', label: 'Walk', time: '4 min', dist: '350 m' },
    { id: 'bike', icon: '🏍️', label: 'Bike', time: '2 min', dist: '350 m' },
    { id: 'car', icon: '🚗', label: 'Car', time: '1 min', dist: '350 m' }
  ];

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      <h3 className="font-poppins font-extrabold text-text-primary text-base sm:text-lg tracking-wide">
        Get directions to {storeName}
      </h3>

      {/* master MAP VIEWPORT WRAPPER */}
      <div className="w-full bg-[#f4f3f0] border border-neutral-200 rounded-3xl relative overflow-hidden shadow-sm flex flex-col">
        
        {/* INTERACTIVE SVG MAP SCREEN */}
        <div className="w-full h-64 md:h-80 relative select-none">
          {/* Stylized Google Maps Road Canvas */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="map-grid-large" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#D1FAE5" strokeWidth="0.8" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid-large)" />

            {/* Park Lands Polygons */}
            <path d="M 40,240 Q 140,200 200,280 L 120,380 Z" fill="#D1FAE5" opacity="0.75" />
            <path d="M 380,40 Q 450,-10 520,60 L 560,200 Z" fill="#D1FAE5" opacity="0.55" />

            {/* Styled roads polygons / overlays */}
            {/* GIDC Road */}
            <path d="M-20,190 L600,100" fill="none" stroke="white" strokeWidth="20" opacity="0.85" />
            <path d="M-20,190 L600,100" fill="none" stroke="#E2E8F0" strokeWidth="1" />
            
            {/* Main Road vertical */}
            <path d="M 440,-20 L 480,360" fill="none" stroke="white" strokeWidth="24" opacity="0.85" />
            <path d="M 440,-20 L 480,360" fill="none" stroke="#E2E8F0" strokeWidth="1" />

            {/* Secondary curves */}
            <path d="M 180,80 Q 240,80 320,140" fill="none" stroke="white" strokeWidth="16" opacity="0.85" />
            <path d="M 180,80 Q 240,80 320,140" fill="none" stroke="#E2E8F0" strokeWidth="1" />

            {/* Landmarks labels */}
            <text x="140" y="248" fill="#047857" fontSize="9" fontWeight="bold" fontFamily="Poppins" opacity="0.55">Navsari Garden</text>
            <text x="40" y="172" fill="#64748B" fontSize="9" fontWeight="extrabold" fontFamily="Inter" transform="rotate(-9 40 172)" opacity="0.6">GIDC Road</text>
            <text x="210" y="70" fill="#64748B" fontSize="9" fontWeight="semibold" fontFamily="Inter" opacity="0.5">Siddhi Vinayak Temple</text>
            <text x="360" y="240" fill="#64748B" fontSize="9" fontWeight="semibold" fontFamily="Inter" opacity="0.5">Shree Swaminarayan Temple</text>
            <text x="474" y="150" fill="#64748B" fontSize="9" fontWeight="bold" fontFamily="Inter" transform="rotate(84 474 150)" opacity="0.6">Main Road</text>

            {/* Golden dashed curved road path routing line */}
            <path 
              d="M 115 170 Q 240 150 280 110 T 370 120" 
              fill="none" 
              stroke="#0B3B2C" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="6,6" 
            />

            {/* User coordinate active pulse (Start) */}
            <circle cx="115" cy="170" r="14" fill="#3B82F6" opacity="0.15" />
            <circle cx="115" cy="170" r="8" fill="#3B82F6" opacity="0.35" />
            <circle cx="115" cy="170" r="4" fill="#3B82F6" />

          </svg>

          {/* Golden tag distance overlay label (Top Left) */}
          <div className="absolute top-4 left-4 bg-white border border-neutral-200 rounded-2xl p-2.5 shadow-md flex flex-col text-left">
            <span className="text-sm font-extrabold text-text-primary leading-tight">{distance}</span>
            <span className="text-[9px] text-text-muted font-bold font-inter leading-none mt-0.5">from you</span>
          </div>

          {/* Reusable Golden Destination Pin Icon */}
          <div className="absolute top-[82px] right-[40%] md:right-[43%] flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#0B3B2C] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              <Compass className="w-5 h-5 text-white" />
            </div>
            {/* Small tooltips tag next to destination */}
            <div className="mt-1 bg-white border border-neutral-200 rounded-lg px-2 py-0.5 shadow-sm text-[9px] font-extrabold text-text-primary whitespace-nowrap">
              {storeName}
            </div>
          </div>

          {/* Travel transit modes overlay (Top Right) */}
          <div className="absolute top-4 right-4 bg-white border border-neutral-200 rounded-2xl p-2 shadow-md flex flex-col gap-1.5 min-w-[125px]">
            <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider text-center border-b border-neutral-100 pb-1">
              Travel time
            </span>
            {transitModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveTransit(mode.id)}
                className={`flex items-center justify-between p-1.5 rounded-xl text-left transition-all cursor-pointer ${
                  activeTransit === mode.id 
                    ? 'bg-[#E6F4EA] text-[#0B3B2C] border border-[#12634B]/10 font-bold scale-102' 
                    : 'hover:bg-neutral-50 border border-transparent font-medium'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs">{mode.icon}</span>
                  <span className="text-[10px] text-text-primary">{mode.time}</span>
                </div>
                <span className="text-[8px] text-text-muted font-normal font-inter">({mode.dist})</span>
              </button>
            ))}
          </div>

        </div>

        {/* GOOGLE MAPS REDIRECT ACTION BUTTON */}
        <div className="p-4 bg-white border-t border-neutral-200/80">
          <Button
            onClick={handleGoogleMapsRedirect}
            variant="primary"
            size="md"
            className="w-full py-3 flex items-center justify-center gap-2 text-sm shadow-md"
            rightIcon={<ExternalLink className="w-4 h-4 text-white shrink-0" />}
          >
            <Navigation className="w-4 h-4 text-white shrink-0" />
            <span>Open in Google Maps</span>
          </Button>
        </div>

      </div>

      {/* Google redirection safety notice */}
      <div className="w-full py-3 px-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#0B3B2C] shrink-0" />
        <span className="text-[10px] md:text-xs font-medium font-inter text-text-secondary">
          You will be redirected to Google Maps to get directions to the shop.
        </span>
      </div>

    </div>
  );
}
