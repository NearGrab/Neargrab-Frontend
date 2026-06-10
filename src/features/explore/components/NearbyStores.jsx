import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, Star } from 'lucide-react';
import Rating from '../../../shared/components/Rating';

export default function NearbyStores({ stores }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-6 md:mt-8 relative">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h3 className="text-lg md:text-xl font-poppins font-bold text-text-primary">
          Nearby Stores
        </h3>
        <button className="text-xs font-bold text-brand-500 hover:text-brand-700 hover:underline transition-all cursor-pointer">
          View all
        </button>
      </div>

      {/* Cards Scroll Wrapper */}
      <div className="relative group">
        
        {/* Horizontal Card Deck */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => navigate(`/shops/${store.id}`)}
              className="bg-white border border-neutral-100 p-3 rounded-2xl w-64 snap-start shrink-0 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group/card flex flex-col justify-between"
            >
              <div>
                {/* Store Cover Image & Float Rating Tag */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-neutral-100">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  {/* Floating green rating tag */}
                  <div className="absolute top-2 left-2 bg-[#0B3B2C] text-[#10B981] font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                    <Star className="w-3 h-3 text-[#10B981] fill-[#10B981]" />
                    <span>{store.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Store Details */}
                <h4 className="font-poppins font-semibold text-text-primary text-sm line-clamp-1 mb-1 group-hover/card:text-brand-900 transition-colors">
                  {store.name}
                </h4>
                
                {/* Store Categories Tags */}
                <p className="text-[10px] text-text-secondary font-medium mb-1 truncate">
                  {store.tags.join(', ')}
                </p>

                {/* Distance text */}
                <p className="text-[10px] text-text-muted font-normal mb-3">
                  {store.distance} km
                </p>
              </div>

              {/* Card Footer Divider Metrics */}
              <div className="border-t border-neutral-100 pt-2 flex items-center justify-between">
                <Rating rating={store.rating} count={store.reviewsCount} />
                <div className="flex items-center gap-0.5 text-[10px] font-semibold text-text-secondary">
                  <MapPin className="w-3 h-3 text-text-muted" />
                  <span>{store.distance} km</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Carousel Slider Next Overlay button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 hover:border-brand-500 hover:text-brand-500 flex items-center justify-center shadow-lg cursor-pointer opacity-90 hover:opacity-100 active:scale-95 transition-all z-10"
          aria-label="Next stores"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
