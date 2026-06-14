import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import Modal from '../../../../shared/components/ui/Modal';
import ReviewCard from '../../../../shared/components/ReviewCard';
import { shopkeeperDashboardService } from '../../services/shopkeeperDashboardService';

export default function ReviewsModal({ isOpen, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchReviews = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const res = await shopkeeperDashboardService.getReviews(1, 100);
          if (res.success && Array.isArray(res.data)) {
            setReviews(res.data);
          } else {
            setError('Failed to load reviews');
          }
        } catch (err) {
          console.error('Failed to load reviews:', err);
          setError(err.message || 'Failed to load reviews');
        } finally {
          setIsLoading(false);
        }
      };

      fetchReviews();
    } else {
      // Clear state on close
      setReviews([]);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Reviews"
      maxWidth="max-w-xl"
    >
      <div className="flex flex-col text-left font-inter">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-brand-900 animate-spin" />
            <span className="text-xs font-semibold text-text-secondary">
              Loading customer reviews...
            </span>
          </div>
        ) : error ? (
          <div className="py-10 flex flex-col items-center justify-center gap-3 text-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="text-xs font-semibold text-text-secondary">{error}</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-10 text-center text-xs text-text-muted font-medium">
            No reviews received yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
            {reviews.map((rev) => (
              <ReviewCard
                key={rev.id}
                avatar={rev.authorAvatar}
                user={rev.authorName}
                time={rev.dateRelative || rev.createdAt}
                rating={rev.rating}
                comment={rev.comment}
                verifiedPurchase={rev.verifiedPurchase}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
