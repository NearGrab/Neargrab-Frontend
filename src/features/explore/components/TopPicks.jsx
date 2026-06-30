import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin } from 'lucide-react';
import Rating from '../../../shared/components/Rating';
import { useCartStore } from '../../../store/useCartStore';

export default function TopPicks({ picks }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  return (
    <div className="w-full mt-6 md:mt-8">
      
      {/* Section Title & Subheading Tags */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2 px-4 md:px-0">
        <div className="flex items-center gap-3">
          <h3 className="text-lg md:text-xl font-poppins font-bold text-text-primary">
            Top Picks for You
          </h3>
          <span className="bg-[#E6F4EA] text-brand-900 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
            Based on your interests
          </span>
        </div>
        <button className="text-xs font-bold text-brand-500 hover:text-brand-700 hover:underline transition-all cursor-pointer">
          View all
        </button>
      </div>

      {/* Responsive Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 px-4 md:px-0">
        {picks.map((pick) => {
          return (
            <div
              key={pick.id}
              onClick={() => navigate(`/product/${pick.id}`)}
              className="bg-white border border-neutral-100/80 p-3 rounded-2xl flex flex-col justify-between hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
            >
              <div className="relative">
                {/* Product image container aspect-square */}
                <div className="w-full aspect-square flex items-center justify-center mb-2.5 bg-neutral-50 rounded-xl overflow-hidden p-3.5">
                  <img
                    src={pick.image}
                    alt={pick.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product details */}
                <h4 className="font-poppins font-bold text-text-primary text-xs md:text-sm line-clamp-1 mb-0.5 group-hover:text-brand-900 transition-colors">
                  {pick.name}
                </h4>
                <p className="text-[9px] md:text-[10px] text-text-secondary font-medium mb-1.5 truncate">
                  {pick.store}
                </p>
              </div>

              {/* Pricing, Rating metrics & Add Cart button */}
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xs md:text-sm font-extrabold text-text-primary">₹{pick.price}</span>
                </div>

                <div className="border-t border-neutral-100 pt-2 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5 text-left min-w-0">
                    <Rating rating={pick.rating} count={pick.reviewsCount} />
                    <div className="flex items-center gap-0.5 text-[8px] md:text-[9px] font-semibold text-text-secondary">
                      <MapPin className="w-2.5 h-2.5 text-text-muted" />
                      <span className="truncate">{pick.distance} km</span>
                    </div>
                  </div>

                  {/* Emerald round quick addition button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(pick);
                      alert(`"${pick.name}" successfully added to cart!`);
                    }}
                    className="w-6.5 h-6.5 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white flex items-center justify-center shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all shrink-0 ml-1"
                    aria-label="Add to cart"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
