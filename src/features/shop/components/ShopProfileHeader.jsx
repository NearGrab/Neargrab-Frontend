import React from 'react';
import { Share2, Star, UserPlus, UserCheck, Edit } from 'lucide-react';
import { Button } from '../../../shared/components/ui';
import ShopCoverBanner from './ShopCoverBanner';

export default function ShopProfileHeader({
  shopInfo = {},
  isManageMode = false,
  isFollowing = false,
  onFollowToggle,
  onEditClick,
  onCoverChange,
  onViewPhotos
}) {
  const {
    coverImage,
    followersCount = 0,
    productCount = 0,
    reviewCount = 0,
    rating = 0,
    photos = []
  } = shopInfo;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${shopInfo.name}'s Neargrab Profile`,
        text: shopInfo.description || 'Check out our local storefront on Neargrab!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Storefront link copied to clipboard!');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/50 shadow-sm overflow-hidden flex flex-col p-4 md:p-6 mb-6 font-inter">
      {/* Cover Banner component */}
      <div className="mb-6">
        <ShopCoverBanner
          coverImage={coverImage}
          photosCount={photos.length || 0}
          isManageMode={isManageMode}
          onCoverChange={onCoverChange}
          onViewPhotos={onViewPhotos}
        />
      </div>

      {/* Profile Metrics and CTA Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Horizontal analytics stats breakdown grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-6 flex-grow max-w-lg">
          <div className="text-center md:text-left leading-none">
            <span className="block font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              {followersCount}
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Followers
            </span>
          </div>

          <div className="text-center md:text-left leading-none border-l border-neutral-100 pl-2 md:pl-6">
            <span className="block font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              {productCount}
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Products
            </span>
          </div>

          <div className="text-center md:text-left leading-none border-l border-neutral-100 pl-2 md:pl-6">
            <span className="block font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              {reviewCount}
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Reviews
            </span>
          </div>

          <div className="text-center md:text-left leading-none border-l border-neutral-100 pl-2 md:pl-6">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              <span className="font-poppins font-bold text-lg md:text-xl text-text-primary">
                {Number(rating).toFixed(1)}
              </span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
            </div>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Rating
            </span>
          </div>
        </div>

        {/* Double Action triggers buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            className="flex-1 md:flex-none py-2 md:py-2.5 bg-brand-900 text-white hover:bg-brand-800 border-0"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={handleShare}
          >
            Share Shop
          </Button>
          
          {isManageMode ? (
            <Button
              variant="secondary"
              size="md"
              className="flex-1 md:flex-none py-2 md:py-2.5"
              leftIcon={<Edit className="w-3.5 h-3.5" />}
              onClick={onEditClick}
            >
              Edit Details
            </Button>
          ) : (
            <Button
              variant={isFollowing ? 'secondary' : 'primary'}
              size="md"
              className={`flex-1 md:flex-none py-2 md:py-2.5 ${
                isFollowing 
                  ? 'bg-neutral-100 border-neutral-200/50 text-text-secondary hover:bg-neutral-200/30' 
                  : 'bg-brand-900 text-white hover:bg-brand-800'
              }`}
              leftIcon={
                isFollowing 
                  ? <UserCheck className="w-3.5 h-3.5 text-text-secondary" />
                  : <UserPlus className="w-3.5 h-3.5 text-white" />
              }
              onClick={onFollowToggle}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
