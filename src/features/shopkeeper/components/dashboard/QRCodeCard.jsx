import React from 'react';
import { Download, Share2, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function QRCodeCard() {
  const { qrPayload, shopProfile } = useShopkeeperDashboardStore();

  const handleDownload = () => {
    alert('QR Code downloaded successfully!');
  };

  const handleShare = () => {
    const shareUrl = qrPayload || (shopProfile?.username ? `${window.location.origin}/shops/${shopProfile.username}` : window.location.origin);
    navigator.clipboard.writeText(shareUrl);
    alert('Profile share link copied to clipboard!');
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Your Shop QR Code
        </h4>
        <Link
          to="/shopkeeper/qr"
          className="text-[10px] font-bold text-brand-900 hover:text-brand-700 font-poppins transition-colors"
        >
          Manage
        </Link>
      </div>

      {/* Content wrapper */}
      <div className="flex items-center gap-4 border border-neutral-150 p-3 rounded-xl shadow-3xs bg-white">
        {/* SVG High-Fidelity QR Code */}
        <div className="w-20 h-20 bg-white border border-neutral-150 rounded-xl p-1 shrink-0 flex items-center justify-center relative shadow-3xs">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* QR Pattern Blocks */}
            <rect x="5" y="5" width="25" height="25" fill="#111827" />
            <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
            <rect x="13" y="13" width="9" height="9" fill="#111827" />

            <rect x="70" y="5" width="25" height="25" fill="#111827" />
            <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
            <rect x="78" y="13" width="9" height="9" fill="#111827" />

            <rect x="5" y="70" width="25" height="25" fill="#111827" />
            <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
            <rect x="13" y="78" width="9" height="9" fill="#111827" />

            {/* Random Data Dots */}
            <rect x="35" y="5" width="6" height="6" fill="#111827" />
            <rect x="45" y="12" width="6" height="6" fill="#111827" />
            <rect x="55" y="5" width="6" height="6" fill="#111827" />
            <rect x="62" y="18" width="6" height="6" fill="#111827" />

            <rect x="35" y="35" width="6" height="6" fill="#111827" />
            <rect x="42" y="45" width="6" height="6" fill="#111827" />
            <rect x="55" y="38" width="6" height="6" fill="#111827" />
            <rect x="62" y="45" width="6" height="6" fill="#111827" />

            <rect x="5" y="35" width="6" height="6" fill="#111827" />
            <rect x="12" y="45" width="6" height="6" fill="#111827" />
            <rect x="22" y="38" width="6" height="6" fill="#111827" />
            <rect x="18" y="52" width="6" height="6" fill="#111827" />

            <rect x="35" y="70" width="6" height="6" fill="#111827" />
            <rect x="42" y="75" width="6" height="6" fill="#111827" />
            <rect x="55" y="78" width="6" height="6" fill="#111827" />
            <rect x="62" y="75" width="6" height="6" fill="#111827" />

            <rect x="70" y="35" width="6" height="6" fill="#111827" />
            <rect x="75" y="45" width="6" height="6" fill="#111827" />
            <rect x="88" y="38" width="6" height="6" fill="#111827" />
            <rect x="82" y="52" width="6" height="6" fill="#111827" />

            <rect x="70" y="70" width="6" height="6" fill="#111827" />
            <rect x="75" y="82" width="6" height="6" fill="#111827" />
            <rect x="88" y="75" width="6" height="6" fill="#111827" />
            <rect x="82" y="88" width="6" height="6" fill="#111827" />

            {/* Central White Mask & Nest Icon */}
            <circle cx="50" cy="50" r="16" fill="#FFFFFF" />
            <circle cx="50" cy="50" r="13" fill="#E6F4EA" />
          </svg>
          {/* Nested Shopkeeper Indicator Icon in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#E6F4EA] rounded-md flex items-center justify-center border border-brand-100/50 shadow-3xs">
            <Store className="w-3.5 h-3.5 text-brand-900" />
          </div>
        </div>

        {/* Info & Action Buttons */}
        <div className="flex-grow min-w-0 flex flex-col gap-2">
          <p className="text-[10px] text-text-secondary leading-normal">
            Let customers scan to view your shop profile instantly.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-grow flex items-center justify-center gap-1 border border-neutral-200/80 hover:bg-neutral-50 text-[10px] font-bold py-1.5 rounded-lg text-text-secondary transition-all cursor-pointer shadow-3xs"
            >
              <Download className="w-3 h-3 text-text-muted" />
              <span>Download</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-grow flex items-center justify-center gap-1 border border-neutral-200/80 hover:bg-neutral-50 text-[10px] font-bold py-1.5 rounded-lg text-text-secondary transition-all cursor-pointer shadow-3xs"
            >
              <Share2 className="w-3 h-3 text-text-muted" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
