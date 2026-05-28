import React from 'react';

/**
 * A highly premium, responsive primitive Button component for global UI actions.
 */
export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  type = 'button',
  ...props
}) {
  // Curated premium design system tokens for variants
  const baseStyles = 'inline-flex items-center justify-center font-poppins font-bold rounded-full transition-all duration-300 active:scale-98 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-900 hover:bg-brand-800 text-white shadow-md shadow-brand-900/10 active:translate-y-0 active:scale-95',
    secondary: 'bg-[#E6F4EA] hover:bg-brand-50 text-[#0B3B2C] border border-brand-100',
    outline: 'bg-transparent hover:bg-neutral-50 text-text-secondary border border-neutral-200/80',
    ghost: 'bg-transparent hover:bg-neutral-50 text-text-secondary',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/10'
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-[10px] md:text-xs',
    md: 'px-6 py-2.5 text-xs md:text-sm',
    lg: 'px-8 py-3 text-sm md:text-base'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2.5 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}

      {/* Left Icon */}
      {!isLoading && leftIcon && <span className="mr-2 shrink-0">{leftIcon}</span>}

      {/* Content */}
      <span>{children}</span>

      {/* Right Icon */}
      {!isLoading && rightIcon && <span className="ml-2 shrink-0">{rightIcon}</span>}
    </button>
  );
}
