import React, { useState } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Input from '../../../../shared/components/ui/Input';
import Button from '../../../../shared/components/ui/Button';
import { ArrowRight, ArrowLeft, ExternalLink, MapPin } from 'lucide-react';

const MAPS_URL_REGEX = /^https:\/\/([a-zA-Z0-9-]+\.)?google\.[a-z]{2,}(\.[a-z]{2,})?\/maps.*|^https:\/\/maps\.app\.goo\.gl\/.*/;

export default function AddressForm() {
  const { address, updateAddress, setCurrentStep } = useShopOnboardingStore();

  const [formData, setFormData] = useState({
    street: address.street,
    landmark: address.landmark,
    city: address.city || 'Navsari',
    pincode: address.pincode,
    state: address.state || 'Gujarat',
    coordinates: address.coordinates || { lat: 20.9467, lng: 72.9520 },
    radius: address.radius || '1 km',
    googleMapsUrl: address.googleMapsUrl || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.street.trim()) newErrors.street = 'Shop Address is required';
    if (!formData.landmark.trim()) newErrors.landmark = 'Area / Landmark is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (!formData.state.trim()) newErrors.state = 'State is required';

    if (!formData.googleMapsUrl.trim()) {
      newErrors.googleMapsUrl = 'Google Maps Link is required';
    } else if (!MAPS_URL_REGEX.test(formData.googleMapsUrl.trim())) {
      newErrors.googleMapsUrl = 'Please enter a valid Google Maps URL (e.g. starting with https://google.com/maps or https://maps.app.goo.gl)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateAddress(formData);
      setCurrentStep(3);
    }
  };

  const handlePreview = () => {
    if (formData.googleMapsUrl && MAPS_URL_REGEX.test(formData.googleMapsUrl.trim())) {
      window.open(formData.googleMapsUrl.trim(), '_blank', 'noopener,noreferrer');
    }
  };

  const isMapsUrlValid = formData.googleMapsUrl && MAPS_URL_REGEX.test(formData.googleMapsUrl.trim());

  return (
    <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">

      {/* Form Title & Sub */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-brand-900 font-poppins">Shop Address</h2>
        <p className="text-xs text-text-secondary mt-1">Help customers find your shop easily. Set precise location details.</p>
      </div>

      {/* Row 1: Shop Address and Landmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Shop Address"
          id="shop_street"
          required
          placeholder="Shop No. 12, GIDC Road"
          value={formData.street}
          onChange={(e) => handleChange('street', e.target.value)}
          error={errors.street}
        />

        <Input
          label="Area / Landmark"
          id="shop_landmark"
          required
          placeholder="Near Siddhi Vinayak Temple"
          value={formData.landmark}
          onChange={(e) => handleChange('landmark', e.target.value)}
          error={errors.landmark}
        />
      </div>

      {/* Row 2: City, Pincode, State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
            City <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              errors.city ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
          >
            <option value="Navsari">Navsari</option>
            <option value="Surat">Surat</option>
            <option value="Bardoli">Bardoli</option>
            <option value="Vyara">Vyara</option>
          </select>
          {errors.city && (
            <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.city}</p>
          )}
        </div>

        <Input
          label="Pincode"
          id="shop_pincode"
          required
          placeholder="396445"
          value={formData.pincode}
          onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
          error={errors.pincode}
        />

        <div className="flex flex-col text-left">
          <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className={`w-full bg-neutral-50 border ${
              errors.state ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
            } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
          >
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Karnataka">Karnataka</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.state}</p>
          )}
        </div>
      </div>

      {/* Google Maps Location URL Section */}
      <div className="flex flex-col gap-2 p-5 bg-neutral-50 border border-neutral-200/60 rounded-3xl">
        <div className="flex items-center gap-2 text-brand-900 mb-1">
          <MapPin className="w-5 h-5" />
          <h3 className="font-poppins font-bold text-xs md:text-sm">Google Maps Location Link</h3>
        </div>
        <p className="text-[11px] text-text-secondary leading-relaxed">
          Provide your Google Maps business location URL. Customers will use this link directly for navigation.
          To get this link, search for your shop on Google Maps, click "Share", and copy the link.
        </p>

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-end mt-2 w-full">
          <div className="flex-grow w-full">
            <Input
              id="google_maps_url"
              required
              placeholder="https://maps.app.goo.gl/..."
              value={formData.googleMapsUrl}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              error={errors.googleMapsUrl}
            />
          </div>
          <button
            type="button"
            disabled={!isMapsUrlValid}
            onClick={handlePreview}
            className={`px-5 py-3 rounded-xl font-poppins font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-200 shrink-0 ${
              isMapsUrlValid
                ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 cursor-pointer shadow-sm'
                : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Preview Link
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            updateAddress(formData);
            setCurrentStep(1);
          }}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button
          type="submit"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Save &amp; Continue
        </Button>
      </div>

    </form>
  );
}
