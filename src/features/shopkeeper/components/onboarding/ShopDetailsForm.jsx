import React, { useState } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Input from '../../../../shared/components/ui/Input';
import Button from '../../../../shared/components/ui/Button';
import ImageUploader from './ImageUploader';
import { ArrowRight, Check } from 'lucide-react';

export default function ShopDetailsForm() {
  const { shopDetails, updateShopDetails, setCurrentStep } = useShopOnboardingStore();

  const [formData, setFormData] = useState({
    name: shopDetails.name,
    username: shopDetails.username,
    category: shopDetails.category,
    type: shopDetails.type,
    establishedYear: shopDetails.establishedYear,
    gstNumber: shopDetails.gstNumber,
    description: shopDetails.description,
    logo: shopDetails.logo
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Grocery Store',
    'Kirana Store',
    'Supermarket',
    'Pharmacy & Medical',
    'Bakery & Confectionery',
    'Fruits & Vegetables',
    'Dairy & Cold House',
    'Stationery & Gift Shop',
    'Electronics & Mobile'
  ];

  const types = [
    'Retail Shop',
    'Wholesale Store',
    'Departmental Store',
    'Super Market / Mart',
    'Home Kitchen & Boutique'
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Shop name is required';
    if (!formData.username.trim()) newErrors.username = 'Shop username is required';
    if (!formData.category) newErrors.category = 'Please select a shop category';
    if (!formData.type) newErrors.type = 'Please select a shop type';
    
    if (!formData.description.trim()) {
      newErrors.description = 'Shop description is required';
    } else if (formData.description.length > 300) {
      newErrors.description = 'Description cannot exceed 300 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateShopDetails(formData);
      setCurrentStep(2); // Go to Address
    }
  };

  // Live username verification indicator
  const isUsernameValid = formData.username.trim().length >= 3;

  return (
    <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">
      
      {/* Form Title & Sub */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-brand-900 font-poppins">Basic Shop Information</h2>
        <p className="text-xs text-text-secondary mt-1">Tell us about your shop. This information will be visible on your public profile.</p>
      </div>

      {/* Row 1: Name and Username */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Shop Name"
          id="shop_name"
          required
          placeholder="Enter shop name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          helperText="Use real shop name (e.g., Patel General Store)"
        />

        <Input
          label="Shop Username"
          id="shop_username"
          required
          placeholder="your-shop-name"
          leftElement={<span className="text-[11px] font-bold text-text-muted">neargrab.com/</span>}
          rightElement={
            isUsernameValid ? (
              <div className="w-5 h-5 bg-[#E6F4EA] rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-brand-900 stroke-[3px]" />
              </div>
            ) : null
          }
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
          error={errors.username}
          helperText="Unique username for your shop profile"
        />
      </div>

      {/* Row 2: Category and Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Category Select */}
        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
            Shop Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              errors.category ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
          >
            <option value="">Select shop category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category ? (
            <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.category}</p>
          ) : (
            <span className="text-[10px] text-text-secondary mt-1">Choose the category that best describes your shop</span>
          )}
        </div>

        {/* Type Select */}
        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
            Shop Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              errors.type ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
          >
            <option value="">Select shop type</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type ? (
            <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.type}</p>
          ) : (
            <span className="text-[10px] text-text-secondary mt-1">e.g., Kirana Store, Electronics, Medical, etc.</span>
          )}
        </div>

      </div>

      {/* Row 3: Year Established and GST Optional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Year Established"
          id="shop_established"
          type="number"
          placeholder="e.g., 2015"
          value={formData.establishedYear}
          onChange={(e) => handleChange('establishedYear', e.target.value)}
          error={errors.establishedYear}
        />

        <Input
          label="GST Number (Optional)"
          id="shop_gst"
          placeholder="Enter GST number if you have one"
          value={formData.gstNumber}
          onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
          error={errors.gstNumber}
        />
      </div>

      {/* Description Area */}
      <div className="flex flex-col text-left">
        <label htmlFor="shop_desc" className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
          Shop Description <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="shop_desc"
            rows="4"
            placeholder="Tell customers about your shop, products, and what makes you special..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              errors.description ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter resize-none pb-7`}
          />
          <span className="absolute bottom-2.5 right-4 text-[10px] text-text-muted font-bold">
            {formData.description.length}/300
          </span>
        </div>
        {errors.description ? (
          <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.description}</p>
        ) : (
          <span className="text-[10px] text-text-secondary mt-1">This will appear on your shop profile</span>
        )}
      </div>

      {/* Logo Image Uploader */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <ImageUploader
          label="Shop Logo / Cover Photo"
          value={formData.logo}
          onChange={(url) => handleChange('logo', url)}
          error={errors.logo}
        />

        <div className="text-left flex flex-col gap-2.5 self-center bg-neutral-50 p-4 rounded-2xl border border-neutral-100 mt-4 md:mt-0">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-brand-900 stroke-[3px]" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary leading-tight">
              Logo helps customers recognize your shop
            </span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-brand-900 stroke-[3px]" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary leading-tight">
              Use clear, original images
            </span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-brand-900 stroke-[3px]" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-text-secondary leading-tight">
              Best size: 512x512px
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col items-center gap-2">
        <Button
          type="submit"
          className="w-full md:w-auto"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Save & Continue
        </Button>
        <span className="text-[10px] text-text-secondary">
          You can review all details before publishing
        </span>
      </div>

    </form>
  );
}
