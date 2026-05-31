import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

export default function MapLocationPicker({ value = { lat: 20.9467, lng: 72.9520 }, radius = '1km', onChange }) {
  const containerRef = useRef(null);
  
  // Coordinates are represented relative to container width/height (percent)
  const [pinPos, setPinPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  // Translate radius label to pixel scaling
  const getRadiusPixels = () => {
    switch (radius) {
      case '250m': return 25;
      case '500m': return 40;
      case '1km': return 65;
      case '2km': return 95;
      case '3km': return 130;
      default: return 65;
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    // Boundaries
    x = Math.max(5, Math.min(95, x));
    y = Math.max(5, Math.min(95, y));

    setPinPos({ x, y });
    
    // Simulate updating geo-coordinates based on pixel drag
    const newLat = 20.9467 + (50 - y) * 0.0001;
    const newLng = 72.9520 + (x - 50) * 0.0001;
    onChange({ lat: newLat, lng: newLng });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const snapToCurrent = () => {
    setPinPos({ x: 50, y: 50 });
    onChange({ lat: 20.9467, lng: 72.9520 });
  };

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between mb-2">
        <div>
          <label className="text-xs font-bold text-text-primary font-poppins block">
            Google Maps Location <span className="text-red-500">*</span>
          </label>
          <span className="text-[10px] text-text-secondary">
            Drag the pin to the exact location of your shop
          </span>
        </div>
        <button
          type="button"
          onClick={snapToCurrent}
          className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full transition-all cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 fill-current text-brand-900" />
          <span>Use my current location</span>
        </button>
      </div>

      {/* High-Fidelity Mock Map Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className="w-full h-64 border border-neutral-200 rounded-2xl overflow-hidden relative select-none cursor-grab active:cursor-grabbing bg-[#F4F3F0]"
      >
        {/* SVG Styled Map Elements (Roads, Green Spaces, Rivers) */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Green space */}
          <rect x="0" y="0" width="100" height="80" fill="#E6F4EA" opacity="0.7" />
          <rect x="120" y="160" width="80" height="90" fill="#E6F4EA" opacity="0.6" />

          {/* River */}
          <path d="M -10,30 Q 80,10 130,70 T 250,280" fill="none" stroke="#D0E1FD" strokeWidth="24" strokeLinecap="round" />
          <path d="M -10,30 Q 80,10 130,70 T 250,280" fill="none" stroke="#A6C9FC" strokeWidth="20" strokeLinecap="round" />

          {/* Primary Roads */}
          <line x1="-10" y1="90" x2="350" y2="90" stroke="#FFFFFF" strokeWidth="12" />
          <line x1="-10" y1="90" x2="350" y2="90" stroke="#E5E7EB" strokeWidth="10" />

          <line x1="90" y1="-10" x2="90" y2="300" stroke="#FFFFFF" strokeWidth="12" />
          <line x1="90" y1="-10" x2="90" y2="300" stroke="#E5E7EB" strokeWidth="10" />

          <path d="M 20,-10 L 150,150 L 300,310" fill="none" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M 20,-10 L 150,150 L 300,310" fill="none" stroke="#E5E7EB" strokeWidth="8" />

          {/* Local Secondary Streets */}
          <line x1="40" y1="20" x2="180" y2="20" stroke="#E5E7EB" strokeWidth="4" />
          <line x1="140" y1="120" x2="140" y2="220" stroke="#E5E7EB" strokeWidth="4" />
          <line x1="180" y1="60" x2="300" y2="60" stroke="#E5E7EB" strokeWidth="4" />

          {/* Labels & Landmarks */}
          <text x="35" y="15" fill="#4B5563" fontSize="8" fontWeight="bold" fontFamily="sans-serif">GIDC Road</text>
          <text x="145" y="145" fill="#1B4D3E" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Siddhi Vinayak Temple</text>
          <text x="95" y="240" fill="#4B5563" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Shree Swaminarayan Temple</text>
        </svg>

        {/* Shaded Radius Radar Overlay on Pin position */}
        <div
          className="absolute rounded-full bg-brand-900/10 border-2 border-brand-900/30 pointer-events-none transition-all duration-300 flex items-center justify-center"
          style={{
            left: `${pinPos.x}%`,
            top: `${pinPos.y}%`,
            width: `${getRadiusPixels() * 2}px`,
            height: `${getRadiusPixels() * 2}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Inner pulsating dot core */}
          <div className="w-1.5 h-1.5 rounded-full bg-brand-900 animate-ping" />
        </div>

        {/* Draggable Marker/Pin */}
        <div
          className="absolute cursor-grab active:cursor-grabbing transition-transform duration-75"
          style={{
            left: `${pinPos.x}%`,
            top: `${pinPos.y}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="relative group">
            {/* Visual tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0B3B2C] text-white text-[9px] font-bold py-1 px-2.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
              Drag Me!
            </div>
            
            <MapPin className="w-9 h-9 text-[#EF4444] fill-[#EF4444]/20 stroke-[#7F1D1D] stroke-[1.5]" />
            <div className="w-2 h-2 bg-black/40 rounded-full blur-xs absolute -bottom-1 left-1/2 -translate-x-1/2 scale-x-150" />
          </div>
        </div>

        {/* Small Delivery Radius Info Box inside Map */}
        <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-xl shadow-md border border-neutral-100 pointer-events-none text-left">
          <span className="text-[9px] text-text-secondary font-semibold uppercase block tracking-wider leading-none mb-0.5">Delivery radius</span>
          <span className="text-xs font-bold text-brand-900 leading-none">{radius}</span>
        </div>

        {/* Maps Control overlays */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 shadow-sm bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <button type="button" className="p-1.5 hover:bg-neutral-50 border-b border-neutral-200 text-text-secondary cursor-pointer">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button type="button" className="p-1.5 hover:bg-neutral-50 text-text-secondary cursor-pointer">
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
