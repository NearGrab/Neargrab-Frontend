import React, { useState } from 'react';
import { Star, Edit3, AlertCircle } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function FeedbackCollector({ onOpenReviewModal }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const handleAddReview = () => {
    if (onOpenReviewModal) {
      onOpenReviewModal(selectedStar);
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm text-left flex flex-col gap-4">
      {/* Header section */}
      <div>
        <h3 className="font-poppins font-extrabold text-text-primary text-sm sm:text-base">
          Already visited the shop?
        </h3>
        <p className="text-[11px] text-text-secondary font-medium font-inter mt-0.5">
          Share your experience about this product.
        </p>
      </div>

      {/* Interactive visual components */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
        
        {/* Star collector and Add button */}
        <div className="flex flex-col text-left gap-3.5">
          {/* Star selector */}
          <div className="flex items-center gap-1.5 select-none">
            {Array.from({ length: 5 }).map((_, idx) => {
              const starVal = idx + 1;
              const isFilled = hoveredStar >= starVal || selectedStar >= starVal;
              return (
                <button
                  key={idx}
                  onMouseEnter={() => setHoveredStar(starVal)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setSelectedStar(starVal)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  aria-label={`Rate ${starVal} stars`}
                >
                  <Star 
                    className={`w-6 h-6 transition-colors ${
                      isFilled ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Add Review outliner button */}
          <Button
            onClick={handleAddReview}
            variant="outline"
            size="sm"
            className="!py-2.5 !px-5 w-fit flex items-center justify-center gap-1.5"
            leftIcon={<Edit3 className="w-3.5 h-3.5 text-text-secondary" />}
          >
            Add Review
          </Button>
        </div>

        {/* Orange alert notice panel */}
        <div className="bg-[#FFFBEB] text-[#78350F] border border-[#FDE68A]/70 rounded-2xl p-3 flex gap-2.5 items-start max-w-full sm:max-w-[220px] shadow-sm leading-relaxed font-inter">
          <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <span className="text-[9px] sm:text-[10px] font-semibold">
            Adding a review will be reflected on your profile and people will be able to see.
          </span>
        </div>

      </div>
    </div>
  );
}
