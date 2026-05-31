import React from 'react';
import { Share2, MessageSquare } from 'lucide-react';

export default function SocialLinksCard({ socialLinks = {} }) {
  const {
    whatsapp = 'https://wa.me/919876543210',
    instagram = 'https://instagram.com/patelgeneralstore',
    facebook = 'https://facebook.com/patelgeneralstore'
  } = socialLinks;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Patel General Store',
        text: 'Check out Patel General Store on Neargrab!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Store URL copied to clipboard!');
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-4 shadow-3xs text-left font-inter flex flex-col gap-3.5 select-none">
      
      {/* Label Title */}
      <h3 className="font-poppins font-bold text-xs text-text-secondary uppercase tracking-wider">
        Share Shop Profile
      </h3>

      {/* Grid of icon links */}
      <div className="flex items-center justify-between gap-3.5 pt-1">
        {/* WhatsApp */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-neutral-150 hover:bg-[#F0FDF4] hover:border-brand-900/30 text-text-secondary hover:text-brand-900 flex items-center justify-center transition-all cursor-pointer shadow-3xs"
          title="WhatsApp Store"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
        </a>

        {/* Instagram - Custom Inline SVG */}
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-neutral-150 hover:bg-pink-50 hover:border-pink-300 text-text-secondary hover:text-pink-600 flex items-center justify-center transition-all cursor-pointer shadow-3xs"
          title="Instagram profile"
        >
          <svg
            className="w-4 h-4 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* Facebook - Custom Inline SVG */}
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-neutral-150 hover:bg-blue-50 hover:border-blue-300 text-text-secondary hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-3xs"
          title="Facebook profile"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>

        {/* More Share */}
        <button
          type="button"
          onClick={handleShare}
          className="w-10 h-10 rounded-full border border-neutral-150 hover:bg-neutral-50 hover:border-neutral-300 text-text-secondary hover:text-text-primary flex items-center justify-center transition-all cursor-pointer shadow-3xs"
          title="More Share options"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
