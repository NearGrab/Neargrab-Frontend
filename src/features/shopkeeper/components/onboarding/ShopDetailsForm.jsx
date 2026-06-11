import React, { useState } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Input from '../../../../shared/components/ui/Input';
import Button from '../../../../shared/components/ui/Button';
import ImageUploader from './ImageUploader';
import { ArrowRight, Check } from 'lucide-react';

export default function ShopDetailsForm() {
  const { shopDetails, updateShopDetails, setCurrentStep, categories: backendCategories } = useShopOnboardingStore();

  const [formData, setFormData] = useState({
    name: shopDetails.name,
    username: shopDetails.username,
    category: shopDetails.category || shopDetails.categoryId,
    type: shopDetails.type,
    establishedYear: shopDetails.establishedYear,
    gstNumber: shopDetails.gstNumber,
    description: shopDetails.description,
    logo: shopDetails.logo
  });

  const [errors, setErrors] = useState({});

  const categoriesList = backendCategories.length > 0 ? backendCategories : [
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

    if (!formData.name.trim()) {
      newErrors.name = 'Shop name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Shop username/handle is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain lowercase letters, numbers, and dashes';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.type) {
      newErrors.type = 'Store type is required';
    }

    if (formData.establishedYear) {
      const year = parseInt(formData.establishedYear, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        newErrors.establishedYear = `Please enter a valid year (1900 - ${currentYear})`;
      }
    }

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
      setCurrentStep(2);
    }
  };

  // Live username verification indicator
  const isUsernameValid = formData.username.trim().length >= 3;

  const combinedErrors = { ...errors };

  return (
    <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">
      
      {/* Shop Name & Username Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Shop Name"
          placeholder="e.g. Patel Grocers"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={combinedErrors.name}
          required
        />

        <div className="flex flex-col relative">
          <Input
            label="Shop Handle (Username)"
            placeholder="e.g. patel-grocers"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            error={combinedErrors.username}
            required
            helperText="Used for your public URL (neargrab.in/shops/your-handle)"
          />
          {isUsernameValid && !combinedErrors.username && (
            <span className="absolute right-3.5 top-8.5 text-[10px] md:text-xs font-bold text-brand-900 font-poppins flex items-center gap-0.5 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
              <Check className="w-3.5 h-3.5" /> Available
            </span>
          )}
        </div>
      </div>

      {/* Category & Type Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Select */}
        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              combinedErrors.category ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
          >
            <option value="">Select shop category</option>
            {categoriesList.map((c) => {
              const val = typeof c === 'object' ? c.id : c;
              const label = typeof c === 'object' ? c.name : c;
              return <option key={val} value={val}>{label}</option>;
            })}
          </select>
          {combinedErrors.category ? (
            <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{combinedErrors.category}</p>
          ) : (
            <span className="text-[10px] text-text-secondary mt-1">Choose the category that best describes your shop</span>
          )}
        </div>

        {/* Type Select */}
        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
            Store Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              combinedErrors.type ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
          >
            <option value="">Select shop type</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {combinedErrors.type ? (
            <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{combinedErrors.type}</p>
          ) : (
            <span className="text-[10px] text-text-secondary mt-1">Defines your business model (e.g. Retail vs Wholesale)</span>
          )}
        </div>
      </div>

      {/* Year Established */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Established Year"
          placeholder="e.g. 2018"
          type="number"
          value={formData.establishedYear}
          onChange={(e) => handleChange('establishedYear', e.target.value)}
          error={combinedErrors.establishedYear}
          helperText="Year you started this store (Optional)"
        />
      </div>

      {/* Shop Description */}
      <div className="flex flex-col text-left">
        <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
          Shop Description <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Describe what you sell, your specialties, and why customers should visit your shop (Max 300 chars)..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className={`w-full bg-neutral-50 border ${
            combinedErrors.description ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
          } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
        />
        {combinedErrors.description ? (
          <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{combinedErrors.description}</p>
        ) : (
          <span className="text-[10px] text-text-secondary mt-1 flex justify-between">
            <span>Brief summary about your store.</span>
            <span>{formData.description.length}/300</span>
          </span>
        )}
      </div>

      {/* Logo Upload Section */}
      <div className="flex flex-col md:flex-row gap-6 p-5 bg-neutral-50/50 border border-neutral-150/60 rounded-2xl items-center">
        <ImageUploader
          label="Upload Shop Logo"
          value={formData.logo}
          onChange={(logoFile) => handleChange('logo', logoFile)}
          error={combinedErrors.logo}
          helperText="Supported formats: JPEG, PNG. Max 2MB."
          aspectRatio="square"
          className="max-w-[150px]"
        />
        <div className="flex-grow flex flex-col gap-2.5 text-left">
          <span className="font-poppins font-bold text-xs md:text-sm text-brand-900 block">
            Logo Guidelines
          </span>
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
