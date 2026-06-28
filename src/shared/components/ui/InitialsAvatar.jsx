import React from 'react';
import { cn } from '../../utils/cn';

const BG_PALETTES = [
  'bg-emerald-50 text-emerald-700 border-emerald-100',
  'bg-blue-50 text-blue-700 border-blue-100',
  'bg-amber-50 text-amber-700 border-amber-100',
  'bg-purple-50 text-purple-700 border-purple-100',
  'bg-indigo-50 text-indigo-700 border-indigo-100',
  'bg-rose-50 text-rose-700 border-rose-100'
];

const getColorPalette = (name = '') => {
  if (!name) return BG_PALETTES[0];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return BG_PALETTES[charCodeSum % BG_PALETTES.length];
};

const getInitials = (name = '') => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, Math.min(2, parts[0].length)).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function InitialsAvatar({ avatarUrl, name, className }) {
  if (avatarUrl && !avatarUrl.includes('unsplash.com')) {
    return (
      <img
        src={avatarUrl}
        alt={name || "User Avatar"}
        className={cn("rounded-full object-cover shadow-sm", className)}
      />
    );
  }

  const palette = getColorPalette(name);
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "rounded-full border flex items-center justify-center font-poppins font-bold tracking-wide shadow-sm select-none",
        palette,
        className
      )}
    >
      {initials}
    </div>
  );
}
