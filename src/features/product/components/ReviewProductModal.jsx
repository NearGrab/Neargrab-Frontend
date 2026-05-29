import React, { useState } from 'react';
import { X, Star, Check, Sparkles } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function ReviewProductModal({ isOpen, onClose, product, initialRating = 0, onSubmitSuccess }) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
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
    // Simulate API request timing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        // Return values up to page callback
        if (onSubmitSuccess) {
          onSubmitSuccess({
            rating,
            comment,
            user: 'You',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
            time: 'Just now',
            verifiedPurchase: true
          });
        }
        setIsSubmitted(false);
        setRating(0);
        setComment('');
        onClose();
        alert('Thank you! Your product review has been submitted successfully.');
      }, 1200);
    }, 1500);
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
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80'} 
            alt={product.name} 
            className="w-12 h-12 rounded-xl object-cover border border-neutral-100 bg-neutral-50 shrink-0 shadow-sm"
          />
          <div className="leading-tight">
            <h3 className="font-poppins font-extrabold text-base text-text-primary leading-snug">
              Review this product
            </h3>
            <p className="text-[10px] sm:text-xs text-text-muted mt-0.5 truncate max-w-[280px] font-inter">
              {product.name}
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
              Adding to verified product feed...
            </span>
          </div>
        ) : isSubmitting ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0B3B2C]/10 border-t-[#0B3B2C] rounded-full animate-spin"></div>
            <span className="text-xs font-bold text-text-secondary animate-pulse">
              Broadcasting rating scores...
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
                placeholder="Share helpful details like: Is the product fresh? Was the pricing accurate? How was the service at the storefront?"
                className="w-full px-4 py-3 text-xs md:text-sm border border-neutral-200 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium leading-relaxed"
              />
            </div>

            {/* Micro-notice banner inside form */}
            <div className="bg-[#FFFBEB] text-[#78350F] border border-[#FDE68A]/60 rounded-2xl p-3 flex gap-2.5 items-start mt-1 leading-normal">
              <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <span className="text-[9px] font-semibold">
                Your review will be marked as a <strong className="text-amber-900 font-extrabold uppercase">Verified Purchase</strong> since this stock was checked at the store.
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
                className="flex-grow py-3 text-xs shadow-md shadow-brand-900/10"
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
