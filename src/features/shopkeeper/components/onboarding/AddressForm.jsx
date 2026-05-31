import React, { useState } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Input from '../../../../shared/components/ui/Input';
import Button from '../../../../shared/components/ui/Button';
import MapLocationPicker from './MapLocationPicker';
import RadiusSlider from './RadiusSlider';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function AddressForm() {
  const { address, updateAddress, setCurrentStep } = useShopOnboardingStore();

  const [formData, setFormData] = useState({
    street: address.street,
    landmark: address.landmark,
    city: address.city,
    pincode: address.pincode,
    state: address.state,
    coordinates: address.coordinates,
    radius: address.radius
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
    
    // Pincode validation: 6 digit number
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (!formData.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateAddress(formData);
      setCurrentStep(3); // Go to Contact
    }
  };

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
        <Input
          label="City"
          id="shop_city"
          required
          placeholder="Navsari"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors.city}
        />

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

      {/* Interactive Draggable Google Maps Picker */}
      <MapLocationPicker
        value={formData.coordinates}
        radius={formData.radius}
        onChange={(coords) => handleChange('coordinates', coords)}
      />

      {/* Delivery Radius slider */}
      <RadiusSlider
        value={formData.radius}
        onChange={(r) => handleChange('radius', r)}
      />

      {/* Actions */}
      <div className="mt-4 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            updateAddress(formData);
            setCurrentStep(1); // Back to Shop Details
          }}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button
          type="submit"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Save & Continue
        </Button>
      </div>

    </form>
  );
}
