import React from 'react';
import { Megaphone, Heart, UserPlus } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

// Colors array to assign elegant pastel colors to initials avatars
const BG_PALETTES = [
  'bg-emerald-50 text-emerald-700 border-emerald-100',
  'bg-blue-50 text-blue-700 border-blue-100',
  'bg-amber-50 text-amber-700 border-amber-100',
  'bg-purple-50 text-purple-700 border-purple-100',
  'bg-indigo-50 text-indigo-700 border-indigo-100',
  'bg-rose-50 text-rose-700 border-rose-100'
];

// Helper to reliably map name strings to stable indices in color palette
const getColorPalette = (name = '') => {
  if (!name) return BG_PALETTES[0];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return BG_PALETTES[charCodeSum % BG_PALETTES.length];
};

export default function NotificationItem({ item }) {
  const { read, title, description, time, isAlert, userInitials, userName, type, badge } = item;

  // Render a clean fallback circle with initials or icons
  const renderAvatar = () => {
    if (isAlert) {
      return (
        <div className="relative shrink-0">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Megaphone className="w-5 h-5 text-brand-900 fill-brand-900/10" />
          </div>
        </div>
      );
    }

    const colorClass = getColorPalette(userName || userInitials);
    
    // Dynamic mini action indicator icon
    const renderIndicatorIcon = () => {
      if (type === 'follows') {
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center">
            <UserPlus className="w-2.5 h-2.5 text-white" />
          </div>
        );
      }
      if (type === 'likes') {
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center">
            <Heart className="w-2.5 h-2.5 text-white fill-white" />
          </div>
        );
      }
      return null;
    };

    return (
      <div className="relative shrink-0 select-none">
        <div className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center font-poppins font-bold text-sm tracking-wide shadow-sm transition-transform duration-300 group-hover:scale-105",
          colorClass
        )}>
          {userInitials || '?'}
        </div>
        {renderIndicatorIcon()}
      </div>
    );
  };

  return (
    <div className={cn(
      "group flex items-start gap-4 p-4 md:p-5 rounded-3xl border border-neutral-100/50 bg-white hover:bg-neutral-50/50 hover:shadow-md hover:shadow-neutral-100/20 transition-all duration-300 relative",
      !read && "border-brand-50/80 bg-brand-50/5"
    )}>
      {/* 1. Left avatar badge column */}
      {renderAvatar()}

      {/* 2. Middle textual details column */}
      <div className="flex-grow flex flex-col text-left">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-poppins font-semibold text-text-primary text-sm md:text-base leading-snug group-hover:text-brand-900 transition-colors duration-300">
            {title}
          </span>
          {isAlert && badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-900 rounded-full border border-brand-200">
              {badge}
            </span>
          )}
        </div>
        <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-2xl font-inter">
          {description}
        </p>
      </div>

      {/* 3. Right status, time & read indicator dot column */}
      <div className="flex flex-col items-end shrink-0 pl-2 self-center gap-2">
        <span className="text-[10px] md:text-xs text-text-muted font-medium font-inter">
          {time}
        </span>
        
        {/* Playful green active dot for unread status */}
        <div className={cn(
          "w-2 h-2 rounded-full bg-emerald-500 scale-0 transition-transform duration-300",
          !read && "scale-100 animate-pulse"
        )} />
      </div>
    </div>
  );
}
