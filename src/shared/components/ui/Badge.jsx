import React from 'react';

/**
 * A highly polished, premium pill Badge primitive for global use.
 */
export default function Badge({
  children,
  className = '',
  variant = 'brand', // 'brand' | 'amber' | 'neutral' | 'danger'
  size = 'md', // 'sm' | 'md'
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full border transition-all duration-300';
  
  const variants = {
    brand: 'bg-[#E6F4EA] text-[#0B3B2C] border-[#12634B]/10',
    amber: 'bg-amber-50 text-amber-900 border-amber-200/50',
    neutral: 'bg-neutral-100 text-text-secondary border-neutral-200/50',
    danger: 'bg-red-50 text-red-700 border-red-200/50'
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[9px] md:text-[10px] tracking-wide',
    md: 'px-3 py-1 text-[10px] md:text-xs tracking-wide'
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
