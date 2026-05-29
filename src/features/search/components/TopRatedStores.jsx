import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopRatedStores({ stores }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm text-left select-none">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-50">
        <h3 className="font-poppins font-bold text-sm text-text-primary">
          Top rated stores
        </h3>
        <button
          onClick={() => alert("Redirecting to comprehensive list of nearby stores...")}
          className="text-xs font-bold text-brand-900 hover:text-brand-800 transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            onClick={() => navigate(`/shop/${store.id}`)}
            className="flex items-center gap-3 cursor-pointer p-1.5 rounded-2xl hover:bg-neutral-50 transition-colors group"
          >
            <img
              src={store.image}
              alt={store.name}
              className="w-12 h-12 rounded-xl object-cover border border-neutral-100"
            />
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold text-text-primary group-hover:text-brand-900 transition-colors truncate">
                  {store.name}
                </h4>
                {store.verified && (
                  <span className="w-3.5 h-3.5 bg-brand-900 text-white rounded-full flex items-center justify-center shrink-0" style={{ transform: 'scale(0.7)' }}>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-0.5 text-[10px] md:text-xs font-semibold text-text-secondary">
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="text-text-primary">{store.rating}</span>
                  <span className="text-text-muted">({store.reviewsCount})</span>
                </div>
                <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
                <span className="text-text-muted">{store.distance} km</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
