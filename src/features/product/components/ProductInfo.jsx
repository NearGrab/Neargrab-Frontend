import React, { useState } from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import Rating from '../../../shared/components/Rating';
import Badge from '../../../shared/components/ui/Badge';

export default function ProductInfo({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Icon selector helper for USP badges
  const getBadgeIcon = (text) => {
    const cls = "w-4 h-4 text-brand-900 shrink-0";
    if (text.includes('Original')) return <ShieldCheck className={cls} />;
    if (text.includes('Quality')) return <Award className={cls} />;
    if (text.includes('Locals')) return <HeartHandshake className={cls} />;
    return <CheckCircle2 className={cls} />;
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="w-full flex flex-col text-left gap-4">
      {/* Category Badge Tag */}
      <div>
        <Badge variant="brand" size="md">
          {product.brand || 'Grocery'}
        </Badge>
      </div>

      {/* Product Title Heading */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-poppins font-extrabold text-text-primary text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight">
          {product.name}
        </h1>
        {/* Spec bullet items */}
        <p className="text-xs sm:text-sm text-text-secondary font-medium font-inter">
          {product.specs?.join(' • ')}
        </p>
      </div>

      {/* Star rating summary */}
      <div className="flex flex-wrap items-center gap-3 py-0.5 border-b border-neutral-100 pb-3">
        <Rating rating={product.rating} count={product.reviewsCount} />
        <span className="text-text-muted text-xs">•</span>
        <span className="text-text-secondary font-semibold text-xs bg-neutral-100 px-2 py-0.5 rounded-md">
          {product.boughtThisWeek}
        </span>
      </div>

      {/* Pricing block */}
      <div className="flex items-center gap-3">
        <span className="font-poppins font-extrabold text-2xl sm:text-3xl text-orange-600">
          ₹{product.price}
        </span>
        {hasDiscount && (
          <>
            <span className="font-poppins text-base text-text-muted line-through font-normal">
              ₹{product.originalPrice}
            </span>
            <Badge variant="brand" size="sm" className="!font-extrabold">
              {product.discount}
            </Badge>
          </>
        )}
      </div>

      {/* USP Badges row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 py-2 border-y border-neutral-100 my-1">
        {product.uspBadges?.map((badge, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-1.8 p-2 bg-neutral-50 rounded-xl border border-neutral-100/90 text-left"
          >
            {getBadgeIcon(badge)}
            <span className="text-[10px] font-bold text-text-primary leading-tight font-inter">
              {badge}
            </span>
          </div>
        ))}
      </div>

      {/* Collapsible Product Description block */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-poppins font-bold text-text-primary text-sm tracking-wide">
          About this product
        </h3>
        
        <div className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
          <p className={isExpanded ? '' : 'line-clamp-2'}>
            {product.description}
          </p>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-1.5 text-brand-900 hover:text-brand-800 font-poppins font-bold text-xs cursor-pointer select-none"
          >
            <span>{isExpanded ? 'View less' : 'View more'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
