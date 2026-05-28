import React, { useState } from 'react';
import { Star, ThumbsUp, MoreVertical, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Badge, Button } from '../../../shared/components/ui';

export default function ReviewsList({ initialReviews }) {
  const [activeTab, setActiveTab] = useState('Reviews');
  const [reviews, setReviews] = useState(initialReviews);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Most Recent');

  // Interactive Tab list
  const tabs = ['Reviews', 'Helpful Votes', 'Photos', 'Activity'];

  // Handle helpful votes toggle incrementation reactive state
  const handleHelpfulClick = (reviewId) => {
    setReviews(prevReviews => 
      prevReviews.map(rev => {
        if (rev.id === reviewId) {
          // If already voted, toggle back, otherwise increment
          const hasVoted = rev.userHasVoted;
          return {
            ...rev,
            helpfulCount: hasVoted ? rev.helpfulCount - 1 : rev.helpfulCount + 1,
            userHasVoted: !hasVoted
          };
        }
        return rev;
      })
    );
  };

  // Helper to render star rating SVGs precisely
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, idx) => {
          if (idx < fullStars) {
            return <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />;
          } else if (idx === fullStars && hasHalf) {
            return (
              <div key={idx} className="relative w-3.5 h-3.5 text-amber-400 shrink-0">
                <Star className="absolute top-0 left-0 w-3.5 h-3.5 text-neutral-200" />
                <div className="absolute top-0 left-0 overflow-hidden w-1.5 h-3.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
              </div>
            );
          } else {
            return <Star key={idx} className="w-3.5 h-3.5 text-neutral-200 shrink-0" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* Tab selection bar layout with emerald underline indicators */}
      <div className="w-full bg-white rounded-2xl border border-neutral-200/50 p-1 flex items-center justify-between mb-6 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none text-center py-2.5 px-5 rounded-xl font-poppins font-bold text-xs md:text-sm transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-brand-900 text-white shadow-md'
                  : 'text-text-secondary hover:bg-neutral-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reviews Header card */}
      <div className="w-full bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 md:p-6 text-left">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
          <div>
            <h2 className="font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              Reviews ({reviews.length})
            </h2>
            <p className="text-xs text-text-secondary">
              Honest reviews you've shared with your community
            </p>
          </div>

          {/* Interactive sort toggle */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1.5 border border-neutral-200 px-4 py-2 rounded-xl text-xs font-bold text-text-secondary hover:bg-neutral-50 transition-all cursor-pointer shadow-sm shrink-0"
            >
              <span>{sortBy}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-text-secondary transition-transform ${sortOpen ? 'rotate-185' : ''}`} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-11 w-36 bg-white border border-neutral-100 rounded-xl shadow-xl p-1.5 z-40 text-left">
                {['Most Recent', 'Highest Rated', 'Lowest Rated', 'Most Helpful'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-text-secondary hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews List feed container */}
        <div className="flex flex-col gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="group flex flex-col md:flex-row gap-5 border-b border-neutral-100 pb-6 last:border-0 last:pb-0 transition-all"
            >
              {/* Product Thumbnail left column */}
              <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-xl shrink-0 flex items-center justify-center p-1.5 overflow-hidden">
                <img 
                  src={rev.productImage} 
                  alt={rev.productName} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Review details center block */}
              <div className="flex-grow text-left">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <h3 className="font-poppins font-bold text-text-primary text-sm md:text-base leading-tight group-hover:text-brand-900 transition-colors">
                      {rev.productName}
                    </h3>
                    <p className="text-xs text-text-secondary font-medium">
                      {rev.storeName} • <span className="text-text-muted">{rev.distance}</span>
                    </p>
                  </div>
                  
                  {/* Option toggle trigger dots */}
                  <button className="text-text-muted hover:text-text-primary p-1 cursor-pointer rounded-full hover:bg-neutral-50 transition-colors">
                    <MoreVertical className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Rating score and Verified label badge */}
                <div className="flex items-center gap-3.5 mb-3.5 mt-2">
                  {renderStars(rev.rating)}
                  
                  {rev.verified && (
                    <Badge variant="brand" size="sm" className="flex items-center gap-1 py-0.5 px-2 bg-emerald-50 text-emerald-700 border-emerald-100/50">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Purchase</span>
                    </Badge>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4">
                  {rev.comment}
                </p>

                {/* Right columns images: Uploaded physical store pictures */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex items-center gap-2.5 mb-4">
                    {rev.images.map((imgUrl, i) => (
                      <div key={i} className="w-20 h-14 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200/40 relative group/img cursor-pointer">
                        <img 
                          src={imgUrl} 
                          alt="Physical shop proof" 
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Feedback line actions: Timestamp and Helpful vote */}
                <div className="flex items-center justify-between text-xs text-text-muted pt-1">
                  <span>{rev.time}</span>
                  
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      rev.userHasVoted
                        ? 'bg-brand-900 border-brand-900 text-white shadow-sm'
                        : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${rev.userHasVoted ? 'fill-white' : ''}`} />
                    <span className="font-bold">Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More trigger */}
        <div className="w-full pt-8 flex justify-center border-t border-neutral-100 mt-8">
          <Button
            variant="outline"
            size="md"
            className="flex items-center gap-1.5 font-bold shadow-sm"
            rightIcon={<ChevronDown className="w-4 h-4 text-text-secondary" />}
          >
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
