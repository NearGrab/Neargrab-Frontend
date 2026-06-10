import React, { useState } from 'react';
import { X, Star, Check, Sparkles } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function SubmitShopReviewModal({ isOpen, onClose, shopInfo, onSubmitSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a star rating first!');
      return;
    }
    if (!comment.trim()) {
      alert('Please write a brief comment describing your experience!');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitSuccess({ rating, comment });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setComment('');
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Failed to submit shop review:', err);
      setIsSubmitting(false);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4 select-none">
      <div className="w-full max-w-md bg-white border border-neutral-100 rounded-3xl shadow-2xl overflow-hidden relative p-6 text-left animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary hover:bg-neutral-50 rounded-full p-1.5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8 flex items-start gap-3">
          <img 
            src={shopInfo.logo || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'} 
            alt={shopInfo.name} 
            className="w-12 h-12 rounded-xl object-cover border border-neutral-100 bg-neutral-50 shrink-0 shadow-sm"
          />
          <div className="leading-tight">
            <h3 className="font-poppins font-extrabold text-base text-text-primary leading-snug">
              Review this shop
            </h3>
            <p className="text-[10px] sm:text-xs text-text-muted mt-0.5 truncate max-w-[280px] font-inter">
              {shopInfo.name}
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 bg-[#E6F4EA] border border-[#12634B]/10 rounded-full flex items-center justify-center text-[#0B3B2C] animate-bounce shadow-inner">
              <Check className="w-7 h-7 text-[#0B3B2C]" strokeWidth={2.5} />
            </div>
            <h4 className="font-poppins font-extrabold text-sm text-text-primary mt-1">Review Submitted!</h4>
            <span className="text-[10px] font-bold text-[#0B3B2C] tracking-wide animate-pulse">
              Adding to shop reviews feed...
            </span>
          </div>
        ) : isSubmitting ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0B3B2C]/10 border-t-[#0B3B2C] rounded-full animate-spin"></div>
            <span className="text-xs font-bold text-[#0b3b2c] animate-pulse">
              Submitting your rating...
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-inter">
            
            {/* Rating Star Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary">
                Overall Rating *
              </label>
              <div className="flex items-center gap-2 select-none py-1">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const starVal = idx + 1;
                  const isFilled = hoveredStar >= starVal || rating >= starVal;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onMouseEnter={() => setHoveredStar(starVal)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(starVal)}
                      className="hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star 
                        className={`w-7 h-7 transition-colors ${
                          isFilled ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary">
                Describe your experience *
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details about pricing accuracy, staff helpfulness, item availability, and overall storefront cleanlines."
                className="w-full px-4 py-3 text-xs md:text-sm border border-neutral-200 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium leading-relaxed"
              />
            </div>

            {/* micro notice */}
            <div className="bg-[#E6F4EA]/40 text-brand-900 border border-brand-900/10 rounded-2xl p-3 flex gap-2.5 items-start mt-1 leading-normal">
              <Sparkles className="w-4 h-4 text-brand-900 shrink-0 mt-0.5" />
              <span className="text-[9px] font-semibold">
                Your review helps other locals find trustable neighborhood storefronts.
              </span>
            </div>

            {/* CTA action buttons */}
            <div className="flex items-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-grow bg-transparent hover:bg-neutral-50 text-text-secondary border border-neutral-200/80 font-poppins font-bold text-xs py-3 rounded-full transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-grow py-3 text-xs shadow-md shadow-[#0b3b2c]/10"
              >
                Submit Review
              </Button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
