import React, { useRef } from 'react';
import { Upload, X, Star } from 'lucide-react';

export default function ProductImageUploader({
  images = [],
  onAddImage,
  onRemoveImage,
  onSetPrimary
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    if (images.length + files.length > 6) {
      alert('You can upload a maximum of 6 images (1 primary + 5 secondary)!');
      return;
    }

    files.forEach((file) => {
      // Validate file size (max 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 5 MB size limit.`);
        return;
      }

      // Validate format
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        alert(`File ${file.name} is not in PNG, JPG, or JPEG format.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onAddImage({
          src: reader.result,
          isPrimary: images.length === 0, // automatically make first image primary
          file: file
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const triggerFileInput = () => {
    if (images.length >= 6) {
      alert('You can upload a maximum of 6 images!');
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4 w-full text-left font-inter">
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className="border-2 border-dashed border-neutral-200 hover:border-brand-900/50 hover:bg-[#F0FDF4]/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-3xs"
      >
        <div className="w-10 h-10 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-brand-100/50 shadow-3xs">
          <Upload className="w-5 h-5 text-brand-900" />
        </div>
        <div className="text-center">
          <span className="text-[11px] font-bold text-brand-900 font-poppins block">
            Upload Photos
          </span>
          <span className="text-[9px] text-text-muted mt-1 block leading-none">
            PNG, JPG up to 5MB
          </span>
          <span className="text-[8px] text-text-muted mt-0.5 block leading-none">
            Recommended: 512x512px
          </span>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <div className="flex items-center gap-2.5 flex-wrap">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative w-14 h-14 rounded-xl border overflow-hidden shadow-3xs group cursor-pointer transition-all duration-300 ${
                img.isPrimary
                  ? 'border-brand-900 ring-2 ring-brand-100/50'
                  : 'border-neutral-200 hover:border-brand-700/50'
              }`}
            >
              {/* Product Thumbnail image */}
              <img
                src={img.src}
                alt="Product Preview"
                className="w-full h-full object-cover bg-neutral-50"
                onClick={() => onSetPrimary(img.id)}
              />

              {/* Top-left Primary Indicator badge */}
              {img.isPrimary && (
                <div className="absolute top-0.5 left-0.5 bg-brand-900 text-white p-0.5 rounded-md shadow-3xs">
                  <Star className="w-2 h-2 fill-white text-white" />
                </div>
              )}

              {/* Remove Trigger Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage(img.id);
                }}
                className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors focus:outline-hidden cursor-pointer"
              >
                <X className="w-2.5 h-2.5" />
              </button>

              {/* Hover label for non-primary images */}
              {!img.isPrimary && (
                <div
                  className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all"
                  onClick={() => onSetPrimary(img.id)}
                >
                  <span className="text-[6px] font-extrabold text-white uppercase text-center tracking-wider leading-tight">
                    Set Primary
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Plus helper box if images < 6 */}
          {images.length < 6 && (
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-14 h-14 rounded-xl border border-dashed border-neutral-200 hover:border-brand-900/50 hover:bg-neutral-50 flex items-center justify-center cursor-pointer transition-colors shadow-3xs shrink-0"
            >
              <span className="text-lg font-bold text-text-muted hover:text-brand-900 transition-colors">+</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}
