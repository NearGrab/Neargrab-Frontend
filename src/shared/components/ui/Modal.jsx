import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * A highly premium, animated Modal dialog primitive for global use.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md', // max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl
  showCloseButton = true,
}) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Premium backdrop blur transition overlay */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Modal Card content */}
      <div
        className={`w-full ${maxWidth} bg-white rounded-3xl shadow-2xl border border-neutral-100 flex flex-col overflow-hidden relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-300`}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
            {title ? (
              <h3 className="font-poppins font-bold text-sm md:text-base text-text-primary">
                {title}
              </h3>
            ) : (
              <div />
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-neutral-200/60 hover:bg-neutral-50 hover:border-neutral-300/80 flex items-center justify-center text-text-secondary cursor-pointer transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] scrollbar-thin text-left">
          {children}
        </div>
      </div>
    </div>
  );
}
