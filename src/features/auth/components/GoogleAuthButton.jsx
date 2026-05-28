import React from 'react';

/**
 * Premium Google OAuth button trigger using accurate brand color styling.
 */
export default function GoogleAuthButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-text-primary transition-all active:scale-98 shadow-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
    >
      {/* Brand Google colored vector */}
      <svg className="w-4 h-4 md:w-5 md:h-5 mr-3 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          fill="#EA4335"
          d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.966 11.966 0 0012 .909a11.963 11.963 0 00-9.673 4.909l2.939 3.947z"
        />
        <path
          fill="#4285F4"
          d="M23.091 12.273c0-.818-.082-1.609-.227-2.364H12v4.51h6.218a5.32 5.32 0 01-2.309 3.49v2.909h3.727c2.182-2 3.455-4.945 3.455-8.545z"
        />
        <path
          fill="#34A853"
          d="M12 23.091c3.245 0 5.973-1.073 7.964-2.909l-3.727-2.909c-1.036.691-2.364 1.109-4.237 1.109-3.264 0-6.027-2.2-7.018-5.164l-2.909 2.245A11.956 11.956 0 0012 23.091z"
        />
        <path
          fill="#FBBC05"
          d="M4.982 13.218a7.088 7.088 0 010-2.436L2.073 8.537a11.961 11.961 0 000 6.927l2.909-2.246z"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}
