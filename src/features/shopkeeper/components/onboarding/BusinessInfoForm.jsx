import React, { useState, useEffect } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Input from '../../../../shared/components/ui/Input';
import Button from '../../../../shared/components/ui/Button';
import ImageUploader from './ImageUploader';
import { ArrowRight, ArrowLeft, Check, Plus, Trash2 } from 'lucide-react';

export default function BusinessInfoForm() {
  const { businessInfo, photos, updateBusinessInfo, updatePhotos, setCurrentStep } = useShopOnboardingStore();

  const [formData, setFormData] = useState({
    gstNumber: businessInfo.gstNumber,
    panNumber: businessInfo.panNumber,
    registrationDoc: businessInfo.registrationDoc,
    languages: [...businessInfo.languages],
    priceRange: businessInfo.priceRange,
    tags: [...businessInfo.tags],
    homeDelivery: businessInfo.homeDelivery,
    digitalPayments: businessInfo.digitalPayments,
    upiId: businessInfo.upiId
  });

  const [photoData, setPhotoData] = useState({
    front: photos.front,
    inside: photos.inside,
    logo: photos.logo || '',
    cover: photos.cover || '',
    additional: [...photos.additional]
  });

  const [errors, setErrors] = useState({});
  const [objectUrls, setObjectUrls] = useState([]);

  // Track object URLs for clean revoking
  useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectUrls]);

  const availableLanguages = ['English', 'Hindi', 'Gujarati', 'Marathi', 'Sanskrit'];
  const availablePriceRanges = ['Budget Friendly', 'Moderate', 'Premium / Luxury'];

  const availableTags = [
    'Groceries',
    'Daily Needs',
    'Snacks & Beverages',
    'Household',
    'Personal Care',
    'Organic & Fresh',
    'Dairy & Eggs',
    'Packaged Foods',
    'Beverages'
  ];

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoChange = (key, value) => {
    setPhotoData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleLanguageToggle = (lang) => {
    let updated;
    if (formData.languages.includes(lang)) {
      updated = formData.languages.filter((l) => l !== lang);
    } else {
      updated = [...formData.languages, lang];
    }
    handleFieldChange('languages', updated);
  };

  const handleTagToggle = (tag) => {
    let updated;
    if (formData.tags.includes(tag)) {
      updated = formData.tags.filter((t) => t !== tag);
    } else {
      if (formData.tags.length >= 5) {
        alert('You can select a maximum of 5 tags.');
        return;
      }
      updated = [...formData.tags, tag];
    }
    handleFieldChange('tags', updated);
  };

  const handleAddAdditionalPhoto = (file) => {
    if (photoData.additional.length >= 5) {
      alert('You can upload a maximum of 5 additional photos.');
      return;
    }
    setPhotoData((prev) => ({
      ...prev,
      additional: [...prev.additional, file]
    }));
  };

  const handleRemoveAdditionalPhoto = (index) => {
    setPhotoData((prev) => ({
      ...prev,
      additional: prev.additional.filter((_, idx) => idx !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Languages: must select at least one
    if (formData.languages.length === 0) {
      newErrors.languages = 'Please select at least one language';
    }

    // Photos: Front and Inside required
    if (!photoData.front) {
      newErrors.front = 'Shop Front photo is required';
    }
    if (!photoData.inside) {
      newErrors.inside = 'Inside Shop photo is required';
    }

    // Optional UPI validation if digital payments is checked
    if (formData.digitalPayments && !formData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required if digital payments are enabled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateBusinessInfo(formData);
      updatePhotos(photoData);
      setCurrentStep(5);
    }
  };

  const getPreviewSrc = (pic) => {
    if (pic instanceof File) {
      const url = URL.createObjectURL(pic);
      // Save it to revoke later
      setObjectUrls(prev => [...prev, url]);
      return url;
    }
    return pic;
  };

  const combinedErrors = { ...errors };

  return (
    <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">
      
      {/* Form Title & Sub */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-brand-900 font-poppins">Business Information</h2>
        <p className="text-xs text-text-secondary mt-1 font-inter">Complete your store details to list as a verified business on Neargrab.</p>
      </div>

      {/* 1. Business Verification Section */}
      <div className="border-t border-neutral-100 pt-5 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted font-poppins mb-4">
          Business Verification <span className="text-[10px] text-text-secondary lowercase">(Optional but recommended)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <Input
            label="GST Number"
            id="gst_verified"
            placeholder="24AABCDE1234F1Z5"
            value={formData.gstNumber}
            onChange={(e) => handleFieldChange('gstNumber', e.target.value.toUpperCase())}
            error={combinedErrors.gstNumber}
          />

          <Input
            label="PAN Number"
            id="pan_verified"
            placeholder="ABCDE1234F"
            value={formData.panNumber}
            onChange={(e) => handleFieldChange('panNumber', e.target.value.toUpperCase())}
            error={combinedErrors.panNumber}
          />
        </div>

        {/* Shop License Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <ImageUploader
            label="Shop Registration / License"
            accept="image/*,application/pdf"
            value={formData.registrationDoc}
            onChange={(val) => handleFieldChange('registrationDoc', val)}
            error={combinedErrors.registrationDoc}
            helperText="Upload Certificate (JPG, PNG or PDF Max 5MB)"
            aspectRatio="any"
          />

          <div className="bg-[#F9FAFB] border border-neutral-150 p-4 rounded-2xl flex flex-col gap-2 self-center mt-4 md:mt-0 text-left">
            <span className="text-[11px] font-bold text-text-primary font-poppins leading-none">Why verify your shop?</span>
            <span className="text-[10px] text-text-secondary leading-normal">
              Verified shops get immediate trust badges, appearing higher in user searches and search filtering.
            </span>
          </div>
        </div>
      </div>

      {/* 2. Shop details: Languages, Price, Tags */}
      <div className="border-t border-neutral-100 pt-5 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted font-poppins mb-4">
          Shop Details
        </h3>

        {/* Row 2: Languages and Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          
          {/* Languages Spoken (Checking Pills) */}
          <div className="flex flex-col text-left">
            <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">
              Languages Spoken <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableLanguages.map((lang) => {
                const isSel = formData.languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageToggle(lang)}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all active:scale-95 cursor-pointer font-poppins border ${
                      isSel
                        ? 'bg-brand-900 border-brand-900 text-white'
                        : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
            {combinedErrors.languages && (
              <p className="mt-1.5 text-[10px] font-medium text-red-500 font-inter">{combinedErrors.languages}</p>
            )}
          </div>

          {/* Price Range */}
          <div className="flex flex-col text-left">
            <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">
              Price Range
            </label>
            <div className="flex gap-2">
              {availablePriceRanges.map((range) => {
                const isSel = formData.priceRange === range;
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleFieldChange('priceRange', range)}
                    className={`flex-grow px-3 py-2 text-[10px] font-bold rounded-xl transition-all active:scale-95 cursor-pointer font-poppins border ${
                      isSel
                        ? 'bg-brand-900 border-brand-900 text-white'
                        : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                    }`}
                  >
                    {range}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Shop tags selection */}
        <div className="flex flex-col text-left mb-4">
          <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">
            Shop Tags <span className="text-[10px] text-text-secondary lowercase">(Select up to 5)</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => {
              const isSel = formData.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all active:scale-95 cursor-pointer font-poppins border flex items-center gap-1 ${
                    isSel
                      ? 'bg-[#E6F4EA] border-[#12634B]/20 text-[#0B3B2C]'
                      : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                  }`}
                >
                  {isSel && <Check className="w-3 h-3 text-brand-900 stroke-[3px]" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Additional Information */}
      <div className="border-t border-neutral-100 pt-5 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted font-poppins mb-4">
          Additional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          
          {/* Home Delivery Buttons */}
          <div className="flex flex-col text-left">
            <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">
              Home Delivery Available
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleFieldChange('homeDelivery', true)}
                className={`flex-grow py-2 rounded-xl text-xs font-bold font-poppins transition-all cursor-pointer border ${
                  formData.homeDelivery
                    ? 'bg-brand-900 border-brand-900 text-white'
                    : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange('homeDelivery', false)}
                className={`flex-grow py-2 rounded-xl text-xs font-bold font-poppins transition-all cursor-pointer border ${
                  !formData.homeDelivery
                    ? 'bg-brand-900 border-brand-900 text-white'
                    : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Accept Digital Payments */}
          <div className="flex flex-col text-left">
            <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">
              Accept Digital Payments
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleFieldChange('digitalPayments', true)}
                className={`flex-grow py-2 rounded-xl text-xs font-bold font-poppins transition-all cursor-pointer border ${
                  formData.digitalPayments
                    ? 'bg-brand-900 border-brand-900 text-white'
                    : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleFieldChange('digitalPayments', false)}
                className={`flex-grow py-2 rounded-xl text-xs font-bold font-poppins transition-all cursor-pointer border ${
                  !formData.digitalPayments
                    ? 'bg-brand-900 border-brand-900 text-white'
                    : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* UPI ID */}
          <Input
            label="UPI ID"
            id="upi_id"
            placeholder="patelstore@upi"
            rightElement={
              formData.upiId.trim().includes('@') ? (
                <div className="w-5 h-5 bg-[#E6F4EA] rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-brand-900 stroke-[3px]" />
                </div>
              ) : null
            }
            value={formData.upiId}
            onChange={(e) => handleFieldChange('upiId', e.target.value.toLowerCase().replace(/\s/g, ''))}
            error={combinedErrors.upiId}
            disabled={!formData.digitalPayments}
          />
        </div>
      </div>

      {/* 4. Photos & Media Section */}
      <div className="border-t border-neutral-100 pt-5 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted font-poppins mb-4">
          Photos Section
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-start mb-6">
          <ImageUploader
            label="Shop Front Photo"
            required
            value={photoData.front}
            onChange={(val) => handlePhotoChange('front', val)}
            error={combinedErrors.front}
            aspectRatio="video"
          />

          <ImageUploader
            label="Inside Shop Photo"
            required
            value={photoData.inside}
            onChange={(val) => handlePhotoChange('inside', val)}
            error={combinedErrors.inside}
            aspectRatio="video"
          />

          <ImageUploader
            label="Cover Photo"
            value={photoData.cover}
            onChange={(val) => handlePhotoChange('cover', val)}
            error={combinedErrors.cover}
            aspectRatio="video"
          />
        </div>

        {/* Additional photos drawer */}
        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-2.5 font-poppins">
            Additional Photos
          </label>
          
          <div className="flex flex-wrap gap-4 items-center">
            {photoData.additional.map((pic, idx) => {
              const srcUrl = getPreviewSrc(pic);
              return (
                <div key={idx} className="w-20 h-20 border border-neutral-200 rounded-xl overflow-hidden relative group bg-neutral-50 shrink-0">
                  <img src={srcUrl} alt="Additional" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveAdditionalPhoto(idx)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer duration-300"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              );
            })}

            {photoData.additional.length < 5 && (
              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-neutral-300 hover:border-brand-900 bg-neutral-50 hover:bg-neutral-100/50 flex flex-col items-center justify-center cursor-pointer transition-colors shrink-0 select-none">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleAddAdditionalPhoto(e.target.files[0]);
                    }
                  }}
                />
                <Plus className="w-5 h-5 text-text-muted mb-0.5" />
                <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Add Photo</span>
              </label>
            )}
          </div>
          <span className="text-[9px] text-text-secondary mt-1.5">Add up to 5 additional product or store images</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            updateBusinessInfo(formData);
            updatePhotos(photoData);
            setCurrentStep(3); // Back to Contact
          }}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          disabled={isLoading}
        >
          Back
        </Button>

        <Button
          type="submit"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Save & Continue
        </Button>
      </div>

    </form>
  );
}
