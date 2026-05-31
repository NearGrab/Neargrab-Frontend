import React from 'react';

/**
 * A highly clean, animated Skeleton shimmer primitive for global loading states.
 */
export default function Skeleton({
  className = '',
  variant = 'text', // 'text' | 'circular' | 'rectangular'
  ...props
}) {
  const baseClass = 'bg-neutral-200 animate-pulse';
  
  const variants = {
    text: 'h-3 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
