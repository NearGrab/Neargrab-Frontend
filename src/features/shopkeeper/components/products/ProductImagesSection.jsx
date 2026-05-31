import React from 'react';
import ProductImageUploader from './ProductImageUploader';
import { Lightbulb } from 'lucide-react';

export default function ProductImagesSection({
  images = [],
  onAddImage,
  onRemoveImage,
  onSetPrimary
}) {
  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs h-full">
      
      {/* Step Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
        <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-poppins font-bold text-xs flex items-center justify-center shadow-3xs shrink-0">
          2
        </span>
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Product Images <span className="text-red-500 font-bold">*</span>
        </h3>
      </div>

      <p className="text-[10px] md:text-xs text-text-secondary leading-normal -mt-2">
        Add clear images to attract more customers.
      </p>

      {/* Main Image Uploader Container */}
      <div className="flex-grow">
        <ProductImageUploader
          images={images}
          onAddImage={onAddImage}
          onRemoveImage={onRemoveImage}
          onSetPrimary={onSetPrimary}
        />
      </div>

      {/* Polish Guidelines Tip banner */}
      <div className="flex items-start gap-2 p-3 bg-amber-50/75 border border-amber-200/40 rounded-xl mt-3 shadow-3xs">
        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span className="text-[10px] font-bold text-amber-900 leading-normal font-poppins">
          Tip: Front image with white background works best.
        </span>
      </div>

    </div>
  );
}
