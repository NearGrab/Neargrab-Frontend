import React, { useRef, useState } from 'react';
import { UploadCloud, Trash2, FileText, CheckCircle2 } from 'lucide-react';

export default function ImageUploader({
  label,
  value, // String URL or base64
  onChange,
  error = '',
  helperText = '',
  accept = 'image/*',
  maxSizeMB = 2,
  className = '',
  aspectRatio = 'square' // 'square' | 'video' | 'any'
}) {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    // Check size limit
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result); // Base64 data URL passed back to store
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isPDF = typeof value === 'string' && value.startsWith('data:application/pdf');

  return (
    <div className={`w-full text-left ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
          {label}
        </label>
      )}

      {value ? (
        /* Image / Document Preview Mode */
        <div className={`relative border border-neutral-200 rounded-2xl overflow-hidden group bg-neutral-50 ${
          aspectRatio === 'square' ? 'aspect-square max-w-[150px]' : aspectRatio === 'video' ? 'aspect-video w-full' : 'p-4 flex items-center gap-3'
        }`}>
          {isPDF ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <FileText className="w-10 h-10 text-brand-900 mb-1" />
              <span className="text-[10px] font-bold text-brand-900 truncate max-w-full">Document.pdf</span>
            </div>
          ) : aspectRatio === 'any' ? (
            <div className="flex items-center gap-3 w-full">
              <img src={value} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-neutral-100" />
              <div className="flex-grow min-w-0">
                <span className="text-[11px] font-bold text-text-primary block truncate">Uploaded Image</span>
                <span className="text-[9px] text-brand-900 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-brand-900" /> Verified file
                </span>
              </div>
            </div>
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Delete Action Trigger Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
            <button
              type="button"
              onClick={handleClear}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform active:scale-90 cursor-pointer shadow-md"
              aria-label="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Trigger Container */
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-5 text-center cursor-pointer transition-all duration-300 bg-neutral-50 hover:bg-neutral-100/50 ${
            isDragActive ? 'border-brand-900 bg-brand-50/20' : error ? 'border-red-300 focus:border-red-500' : 'border-neutral-200 hover:border-brand-900'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-900 mb-2">
            <UploadCloud className="w-5 h-5 text-brand-900" />
          </div>
          <span className="text-xs font-bold text-brand-900 font-poppins">Upload Shop Logo</span>
          <span className="text-[9px] text-text-muted mt-0.5">PNG, JPG up to {maxSizeMB}MB</span>
        </div>
      )}

      {error && <p className="mt-1 text-[10px] font-medium text-red-500 font-inter">{error}</p>}
      {helperText && !error && <p className="mt-1 text-[10px] text-text-secondary leading-normal">{helperText}</p>}
    </div>
  );
}
