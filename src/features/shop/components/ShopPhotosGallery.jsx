import React, { useState, useRef } from 'react';
import { Camera, Trash2, LayoutTemplate, Plus } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function ShopPhotosGallery({
  photos = [],
  isManageMode = false,
  onUploadPhoto,
  onDeletePhoto,
  onSetCoverPhoto
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const fileInputRef = useRef(null);

  const filters = ['All', 'inside', 'store', 'product'];

  const filteredPhotos = activeFilter === 'All'
    ? photos
    : photos.filter((p) => p.type === activeFilter);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (onUploadPhoto) {
          // Send photo with active filter type (defaulting to inside if All is picked)
          const targetType = activeFilter === 'All' ? 'inside' : activeFilter;
          onUploadPhoto(reader.result, targetType);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs">
      
      {/* 1. Header & Category filter selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-neutral-100/60 select-none">
        
        {/* Title */}
        <div>
          <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
            Store Photos Gallery
          </h3>
          <span className="text-[10px] text-text-muted">
            Displaying {filteredPhotos.length} photos
          </span>
        </div>

        {/* Filter categories chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg text-[9px] md:text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer border ${
                activeFilter === f
                  ? 'bg-brand-900 border-brand-900 text-white'
                  : 'bg-neutral-50 border-neutral-200/60 hover:bg-neutral-100 text-text-secondary'
              }`}
            >
              {f === 'inside' ? 'Inside' : f === 'store' ? 'Storefront' : f === 'product' ? 'Products' : 'All'}
            </button>
          ))}
        </div>

      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 2. Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        
        {/* Manage Mode Add photo card */}
        {isManageMode && (
          <button
            type="button"
            onClick={handleUploadClick}
            className="border-2 border-dashed border-neutral-200 hover:border-brand-900/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer bg-neutral-50/20 hover:bg-neutral-50/80 transition-all select-none min-h-[140px]"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-brand-100/50 shadow-3xs shrink-0">
              <Plus className="w-5 h-5 text-brand-900" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary">
              Upload New Photo
            </span>
            <span className="text-[8px] text-text-muted">
              JPEG, PNG up to 5MB
            </span>
          </button>
        )}

        {/* Photos listing */}
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="border border-neutral-150 rounded-2xl overflow-hidden aspect-video relative group bg-neutral-50 shadow-3xs flex items-center justify-center"
          >
            
            {/* Displayed Image */}
            <img
              src={photo.src}
              alt="Gallery"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />

            {/* Visual overlay tag */}
            <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm select-none">
              {photo.type === 'inside' ? 'Inside' : photo.type === 'store' ? 'Store' : 'Product'}
            </span>

            {/* Manage actions overlay on Hover */}
            {isManageMode && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-3xs opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-300 select-none">
                
                {/* Set as cover banner */}
                <button
                  type="button"
                  onClick={() => onSetCoverPhoto && onSetCoverPhoto(photo.src)}
                  className="p-2 rounded-xl bg-white border border-neutral-200 text-text-secondary hover:text-brand-900 shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Set as Cover Photo"
                >
                  <LayoutTemplate className="w-4 h-4" />
                </button>

                {/* Delete Photo */}
                <button
                  type="button"
                  onClick={() => onDeletePhoto && onDeletePhoto(photo.id)}
                  className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            )}

          </div>
        ))}

        {filteredPhotos.length === 0 && !isManageMode && (
          <div className="col-span-full py-10 text-center font-bold text-xs text-text-muted select-none">
            📷 No photos have been uploaded in this category yet.
          </div>
        )}

      </div>

    </div>
  );
}
