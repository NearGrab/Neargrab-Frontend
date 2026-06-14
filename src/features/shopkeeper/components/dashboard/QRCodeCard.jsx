import React, { useEffect, useState } from 'react';
import { Download, Share2, Store, ExternalLink } from 'lucide-react';
import QRCode from 'qrcode';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function QRCodeCard() {
  const { shopProfile, setQRModalOpen } = useShopkeeperDashboardStore();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  const shopId = shopProfile?.username || shopProfile?.slug || shopProfile?.id;
  const shopUrl = shopId ? `${window.location.origin}/shops/${shopId}` : window.location.origin;

  useEffect(() => {
    if (shopUrl) {
      QRCode.toDataURL(shopUrl, {
        width: 256,
        margin: 1,
        color: {
          dark: '#111827',
          light: '#FFFFFF'
        }
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Failed to generate QR Code:', err));
    }
  }, [shopUrl]);

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!qrCodeDataUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `${shopProfile?.username || 'shop'}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (!qrCodeDataUrl) return;

      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `${shopProfile?.username || 'shop'}-qr.png`,
        { type: 'image/png' }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${shopProfile?.name || 'Shop'} QR Code`,
          text: `Scan QR code to visit ${shopProfile?.name || 'our shop'} on Neargrab!`
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `${shopProfile?.name || 'Shop'}`,
          text: `Visit ${shopProfile?.name || 'our shop'} on Neargrab!`,
          url: shopUrl
        });
      } else {
        await navigator.clipboard.writeText(shopUrl);
        alert('Profile link copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to share:', err);
      try {
        await navigator.clipboard.writeText(shopUrl);
        alert('Profile link copied to clipboard!');
      } catch (clipErr) {
        console.error(clipErr);
      }
    }
  };

  return (
    <div
      onClick={() => setQRModalOpen(true)}
      className="w-full bg-white border border-neutral-100/80 hover:border-neutral-200 rounded-2xl p-4 shadow-3xs text-left font-inter transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary">
          Your Shop QR Code
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQRModalOpen(true);
          }}
          className="text-[10px] font-bold text-brand-900 hover:text-brand-700 font-poppins transition-colors flex items-center gap-0.5 cursor-pointer"
        >
        </button>
      </div>

      {/* Content wrapper */}
      <div className="flex items-center gap-4 border border-neutral-150 p-3 rounded-xl shadow-3xs bg-white group-hover:bg-neutral-50/30 transition-all">
        {/* QR Code Graphic container */}
        <div className="w-20 h-20 bg-white border border-neutral-150 rounded-xl p-1 shrink-0 flex items-center justify-center relative shadow-3xs">
          {qrCodeDataUrl ? (
            <img
              src={qrCodeDataUrl}
              alt="Shop QR Code"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-5 h-5 border-2 border-brand-900/10 border-t-brand-900 rounded-full animate-spin" />
          )}
          {/* Central Nest Icon overlay */}
          {qrCodeDataUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-xs">
              <div className="w-4 h-4 bg-brand-50 border border-brand-100 rounded-full flex items-center justify-center text-brand-900">
                <Store className="w-2.5 h-2.5" />
              </div>
            </div>
          )}
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
