import React from 'react';

/**
 * A highly premium, responsive primitive Input component for form captures.
 */
export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  className = '',
  error = '',
  leftElement = null,
  rightElement = null,
  disabled = false,
  required = false,
  ...props
}) {
  return (
    <div className="w-full text-left">
      {/* Optional Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold text-text-primary mb-1.5 font-poppins"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Group wrapper */}
      <div className="relative flex items-center w-full">
        {/* Left Element / Icon slot */}
        {leftElement && (
          <div className="absolute left-3.5 flex items-center justify-center text-text-muted shrink-0 z-10 pointer-events-none">
            {leftElement}
          </div>
        )}

        {/* Core Input Tag */}
        <input
          type={type}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-neutral-50 border ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
          } rounded-xl py-2.5 text-xs md:text-sm text-text-primary placeholder-text-muted focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter ${
            leftElement ? 'pl-11' : 'pl-4'
          } ${rightElement ? 'pr-11' : 'pr-4'} ${className}`}
          {...props}
        />

        {/* Right Element / Icon slot */}
        {rightElement && (
          <div className="absolute right-3.5 flex items-center justify-center text-text-muted shrink-0 z-10">
            {rightElement}
          </div>
        )}
      </div>

      {/* Under-field validation alert */}
      {error && (
        <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">
          {error}
        </p>
      )}
    </div>
  );
}
