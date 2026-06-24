import React from 'react';
import { Share2, Settings, Star, MapPin, UserPlus, UserCheck } from 'lucide-react';
import { Button } from '../../../shared/components/ui';

export default function ProfileHeader({ 
  user, 
  onSettingsClick, 
  isOwnProfile = true,
  isFollowing = false,
  onFollowToggle
}) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.fullName}'s Neargrab Profile`,
        text: user.bio,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/50 shadow-sm overflow-hidden flex flex-col p-4 md:p-6 mb-6">
      {/* Visual banner banner with Speech bubble Overlay */}
      <div className="relative w-full h-36 md:h-48 rounded-2xl overflow-hidden bg-neutral-100 mb-6 group">
        <img
          src="/assets/Profile/profile-customer-banner.webp"
          alt="Neargrab Neighborhood Banner"
          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
        />
        
        {/* Playful overlapping Local Quote Speech Bubble */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg text-left max-w-[240px] md:max-w-xs border border-brand-100/30">
          <p className="font-poppins font-bold text-brand-900 text-xs md:text-sm leading-tight italic">
            “Local is not just a place, it’s our <span className="text-emerald-600 underline decoration-2 decoration-emerald-300">people</span>.”
          </p>
        </div>

        {/* Floating location marker pin in bubble */}
        <div className="absolute right-6 bottom-4 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center shadow-md">
          <MapPin className="w-4.5 h-4.5 text-brand-900 animate-bounce" />
        </div>
      </div>

      {/* Profile Metrics and CTA Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Horizontal analytics stats breakdown grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-6 flex-grow max-w-lg">
          <div className="text-center md:text-left leading-none">
            <span className="block font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              {user.followingCount}
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Following
            </span>
          </div>

          <div className="text-center md:text-left leading-none border-l border-neutral-100 pl-2 md:pl-6">
            <span className="block font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              {user.followersCount}
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Followers
            </span>
          </div>

          <div className="text-center md:text-left leading-none border-l border-neutral-100 pl-2 md:pl-6">
            <span className="block font-poppins font-bold text-lg md:text-xl text-text-primary mb-1">
              {user.reviewsCount}
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Reviews
            </span>
          </div>

          <div className="text-center md:text-left leading-none border-l border-neutral-100 pl-2 md:pl-6">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              <span className="font-poppins font-bold text-lg md:text-xl text-text-primary">
                {user.avgRatingGiven}
              </span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
            </div>
            <span className="text-[10px] md:text-xs text-text-secondary font-semibold uppercase tracking-wider">
              Avg Rating 
            </span>
          </div>
        </div>

        {/* Double Action triggers buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            className="flex-1 md:flex-none py-2 md:py-2.5"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={handleShare}
          >
            Share Profile
          </Button>
          
          {isOwnProfile ? (
            <Button
              variant="secondary"
              size="md"
              className="flex-1 md:flex-none py-2 md:py-2.5"
              leftIcon={<Settings className="w-3.5 h-3.5" />}
              onClick={onSettingsClick}
            >
              Settings
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
