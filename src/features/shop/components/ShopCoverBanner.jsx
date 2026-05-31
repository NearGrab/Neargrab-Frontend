import React, { useRef } from 'react';
import { Camera, Edit2 } from 'lucide-react';

export default function ShopCoverBanner({
  coverImage,
  photosCount = 12,
  isManageMode = false,
  onCoverChange,
  onViewPhotos
}) {
  const fileInputRef = useRef(null);

  const handleEditClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (onCoverChange) onCoverChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-48 md:h-64 bg-neutral-100 rounded-2xl relative overflow-hidden group shadow-3xs font-inter select-none">
      
      {/* Hero Banner image */}
      <img
        src={coverImage || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80'}
        alt="Shop Cover"
        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Hidden file input */}
      {isManageMode && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      {/* Buttons container */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {/* View Photos trigger */}
        <button
          type="button"
          onClick={onViewPhotos}
          className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-neutral-200/50 text-text-primary px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold font-poppins shadow-sm hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>View Photos ({photosCount})</span>
        </button>

        {/* Edit Cover Trigger (Shopkeeper only) */}
        {isManageMode && (
          <button
            type="button"
            onClick={handleEditClick}
            className="flex items-center gap-1.5 bg-brand-900 text-white border border-brand-800 px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold font-poppins shadow-sm hover:bg-brand-800 active:scale-95 transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Cover Photo</span>
          </button>
        )}
      </div>

    </div>
  );
}
