import React, { useEffect, useState } from 'react';
import { Download, Share2, Copy, Check, Store } from 'lucide-react';
import QRCode from 'qrcode';
import Modal from '../../../../shared/components/ui/Modal';
import Button from '../../../../shared/components/ui/Button';

export default function QRCodeModal({ isOpen, onClose, shopProfile }) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const shopId = shopProfile?.username || shopProfile?.slug || shopProfile?.id;
  const shopUrl = shopId ? `${window.location.origin}/shops/${shopId}` : window.location.origin;

  useEffect(() => {
    if (isOpen && shopUrl) {
      QRCode.toDataURL(shopUrl, {
        width: 512,
        margin: 2,
        color: {
          dark: '#111827', // dark slate
          light: '#FFFFFF'
        }
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Failed to generate QR Code:', err));
    }
  }, [isOpen, shopUrl]);

  const handleDownload = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `${shopProfile?.username || 'shop'}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shopUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = async () => {
    try {
      if (!qrCodeDataUrl) return;

      // Fetch base64 data url and convert to Blob/File to support image sharing
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `${shopProfile?.username || 'shop'}-qr.png`,
        { type: 'image/png' }
      );

      // Web Share API image sharing support check
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${shopProfile?.name || 'Shop'} QR Code`,
          text: `Scan QR code to visit ${shopProfile?.name || 'our shop'} on Neargrab!`
        });
      } else if (navigator.share) {
        // Fallback to sharing URL
        await navigator.share({
          title: `${shopProfile?.name || 'Shop'}`,
          text: `Visit ${shopProfile?.name || 'our shop'} on Neargrab!`,
          url: shopUrl
        });
      } else {
        // Fallback to clipboard
        await handleCopyLink();
      }
    } catch (err) {
      console.error('Failed to share:', err);
      // Fallback
      await handleCopyLink();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Shop QR Code"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center font-inter p-2 select-none">
        <p className="text-xs text-text-secondary mb-5 leading-relaxed">
          Share your shop's unique QR code. Customers can scan this code with their phones to visit your public storefront directly.
        </p>

        {/* Real QR Code container */}
        <div className="relative w-48 h-48 bg-white border border-neutral-150 rounded-2xl p-2 flex items-center justify-center shadow-md mb-6 group overflow-hidden">
          {qrCodeDataUrl ? (
            <img
              src={qrCodeDataUrl}
              alt="Shop QR Code"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-10 h-10 border-4 border-brand-900/10 border-t-brand-900 rounded-full animate-spin" />
          )}

          {/* Centered logo icon */}
          {qrCodeDataUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm">
              <div className="w-7 h-7 bg-brand-50 border border-brand-100 rounded-full flex items-center justify-center text-brand-900">
                <Store className="w-4.5 h-4.5" />
              </div>
            </div>
          )}
        </div>

        {/* Public profile URL display */}
        <div className="w-full bg-neutral-50 border border-neutral-200/60 rounded-xl p-3 flex items-center justify-between gap-3 mb-6">
          <span className="text-[11px] font-bold text-text-secondary font-mono truncate select-all">
            {shopUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className="p-2 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-lg text-text-muted hover:text-text-primary transition-all shrink-0 cursor-pointer shadow-3xs"
            title="Copy URL"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 animate-in fade-in zoom-in-50 duration-200" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="font-bold text-xs h-10 cursor-pointer shadow-3xs"
          >
            Download QR
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleShare}
            leftIcon={<Share2 className="w-3.5 h-3.5" />}
            className="font-bold text-xs h-10 cursor-pointer shadow-3xs"
          >
            Share QR
          </Button>
        </div>
      </div>
    </Modal>
  );
}
