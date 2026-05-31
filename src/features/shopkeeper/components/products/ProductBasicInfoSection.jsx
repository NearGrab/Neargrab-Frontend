import React, { useMemo } from 'react';
import TagInput from './TagInput';
import { productCategories } from '../../data/productCategories';

export default function ProductBasicInfoSection({
  productName,
  brand,
  category,
  subCategory,
  description,
  tags = [],
  onChangeField,
  onAddTag,
  onRemoveTag
}) {
  
  // Find current active category details to determine subcategory lists
  const activeCategory = useMemo(() => {
    return productCategories.find((cat) => cat.id === category || cat.name === category);
  }, [category]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    onChangeField('category', val);
    // Reset subcategory automatically on category change
    onChangeField('subCategory', '');
  };

  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      
      {/* Step Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
        <span className="w-6 h-6 rounded-full bg-brand-900 text-white font-poppins font-bold text-xs flex items-center justify-center shadow-3xs shrink-0">
          1
        </span>
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Basic Information
        </h3>
      </div>

      {/* Grid Inputs for Name and Brand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Product Name <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            required
            value={productName}
            onChange={(e) => onChangeField('productName', e.target.value)}
            placeholder="e.g., Amul Taaza Milk 1L"
            className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
          />
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Brand <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => onChangeField('brand', e.target.value)}
            placeholder="e.g., Amul"
            className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 shadow-3xs"
          />
        </div>
      </div>

      {/* Grid Dropdowns for Category and Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Category <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={category}
              onChange={handleCategoryChange}
              className="w-full appearance-none text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 pr-8 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 shadow-3xs"
            >
              <option value="">Select category</option>
              {productCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
              ▼
            </div>
          </div>
        </div>

        {/* Sub Category */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Sub Category <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <select
              value={subCategory}
              onChange={(e) => onChangeField('subCategory', e.target.value)}
              disabled={!category || !activeCategory?.subcategories?.length}
              className="w-full appearance-none text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 pr-8 outline-hidden focus:border-brand-900/50 focus:bg-white transition-all duration-300 disabled:opacity-50 shadow-3xs"
            >
              <option value="">Select sub category</option>
              {activeCategory?.subcategories?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-text-muted">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex justify-between items-center">
          <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
            Short Description <span className="text-red-500 font-bold">*</span>
          </label>
          <span className="text-[10px] text-text-muted font-bold font-poppins">
            {description.length} / 120
          </span>
        </div>
        <textarea
          required
          maxLength={120}
          value={description}
          onChange={(e) => onChangeField('description', e.target.value)}
          placeholder="Write a short and clear description about your product"
          rows={3}
          className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 resize-none shadow-3xs"
        />
      </div>

      {/* Custom Tag Input Component */}
      <div className="w-full pt-1">
        <TagInput tags={tags} onAddTag={onAddTag} onRemoveTag={onRemoveTag} />
      </div>

    </div>
  );
}
