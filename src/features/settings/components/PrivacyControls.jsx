import React, { useState } from 'react';
import { Eye, EyeOff, Activity, MessageSquare } from 'lucide-react';

export default function PrivacyControls() {
  const [profileVisibility, setProfileVisibility] = useState('Public');
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Privacy Controls</h3>
          <p className="text-xs text-text-secondary mt-0.5">Manage who can see your activity and information.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Profile Visibility */}
        <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white relative">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
              {profileVisibility === 'Public' ? <Eye className="w-4 h-4 text-brand-700" /> : <EyeOff className="w-4 h-4 text-brand-700" />}
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Profile Visibility</span>
              <span className="block text-[11px] text-text-secondary">Choose who can see your profile details</span>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
              className="px-4 py-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-text-primary font-poppins font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>{profileVisibility}</span>
              <span className="text-[10px] text-text-secondary">▼</span>
            </button>

            {showVisibilityDropdown && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white border border-neutral-200 shadow-lg rounded-xl overflow-hidden z-20">
                <button
                  type="button"
                  onClick={() => {
                    setProfileVisibility('Public');
                    setShowVisibilityDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-text-primary hover:bg-brand-50 hover:text-brand-900 transition-colors"
                >
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileVisibility('Private');
                    setShowVisibilityDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-text-primary hover:bg-brand-50 hover:text-brand-900 transition-colors"
                >
                  Private
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Status */}
        <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
              <Activity className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Activity Status</span>
              <span className="block text-[11px] text-text-secondary">Show when you're active on Neargrab</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActivityStatus(!activityStatus)}
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 relative focus:outline-none cursor-pointer ${
              activityStatus ? 'bg-brand-900' : 'bg-neutral-200'
            }`}
            aria-label="Toggle Activity Status"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                activityStatus ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Show Reviews on Profile */}
        <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
              <MessageSquare className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Show Reviews on Profile</span>
              <span className="block text-[11px] text-text-secondary">Allow others to see your reviews and activity</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowReviews(!showReviews)}
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 relative focus:outline-none cursor-pointer ${
              showReviews ? 'bg-brand-900' : 'bg-neutral-200'
            }`}
            aria-label="Toggle Reviews Visibility"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                showReviews ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
