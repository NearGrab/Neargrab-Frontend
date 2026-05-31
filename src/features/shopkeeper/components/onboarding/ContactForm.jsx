import React, { useState } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Input from '../../../../shared/components/ui/Input';
import Button from '../../../../shared/components/ui/Button';
import WeekdaySelector from './WeekdaySelector';
import { ArrowRight, ArrowLeft, PhoneCall, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const { contact, updateContact, setCurrentStep } = useShopOnboardingStore();

  const [formData, setFormData] = useState({
    phone: contact.phone,
    whatsapp: contact.whatsapp,
    alternatePhone: contact.alternatePhone,
    email: contact.email,
    openingTime: contact.openingTime,
    closingTime: contact.closingTime,
    weekdays: contact.weekdays,
    preferences: { ...contact.preferences }
  });

  const [errors, setErrors] = useState({});

  const hoursList = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
    '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
  ];

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePreferenceToggle = (prefKey) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [prefKey]: !prev.preferences[prefKey]
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    // Primary phone regex validation (10 digit)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Primary Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // WhatsApp phone regex validation
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp Number is required';
    } else if (!/^\d{10}$/.test(formData.whatsapp.trim().replace(/\D/g, ''))) {
      newErrors.whatsapp = 'WhatsApp number must be exactly 10 digits';
    }

    // Optional Email validation
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.openingTime) newErrors.openingTime = 'Opening Time is required';
    if (!formData.closingTime) newErrors.closingTime = 'Closing Time is required';
    if (formData.weekdays.length === 0) newErrors.weekdays = 'Please select at least one open weekday';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateContact(formData);
      setCurrentStep(4); // Go to Business Info
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">
      
      {/* Form Title & Sub */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-brand-900 font-poppins">Contact Information</h2>
        <p className="text-xs text-text-secondary mt-1">Add contact details so customers can reach you easily.</p>
      </div>

      {/* Row 1: Primary Phone and WhatsApp Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Primary Phone Number"
          id="shop_phone"
          required
          placeholder="98765 12210"
          leftElement={<span className="text-xs font-bold text-text-muted">+91</span>}
          rightElement={<PhoneCall className="w-4 h-4 text-text-muted" />}
          value={formData.phone}
          onChange={(e) => handleFieldChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          error={errors.phone}
          helperText="Customers will call this number for orders"
        />

        <Input
          label="WhatsApp Number"
          id="shop_whatsapp"
          required
          placeholder="98765 43210"
          leftElement={<span className="text-xs font-bold text-text-muted">+91</span>}
          rightElement={<MessageSquare className="w-4 h-4 text-green-500 fill-green-100" />}
          value={formData.whatsapp}
          onChange={(e) => handleFieldChange('whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))}
          error={errors.whatsapp}
          helperText="For receiving stock queries and catalog requests"
        />
      </div>

      {/* Row 2: Alternate Phone and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Alternate Number (Optional)"
          id="shop_phone_alt"
          placeholder="e.g., 91234 56789"
          leftElement={<span className="text-xs font-bold text-text-muted">+91</span>}
          value={formData.alternatePhone}
          onChange={(e) => handleFieldChange('alternatePhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          error={errors.alternatePhone}
        />

        <Input
          label="Email Address (Optional)"
          id="shop_email"
          type="email"
          placeholder="patelstore@gmail.com"
          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value.toLowerCase())}
          error={errors.email}
        />
      </div>

      {/* Timings Section */}
      <div className="border-t border-neutral-100 pt-5 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted font-poppins mb-4">
          Shop Timings
        </h3>
        
        {/* Row 3: Opening/Closing selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Opening Time Select */}
          <div className="flex flex-col text-left">
            <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
              Opening Time <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.openingTime}
              onChange={(e) => handleFieldChange('openingTime', e.target.value)}
              className={`w-full bg-neutral-50 border ${
                errors.openingTime ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
              } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
            >
              {hoursList.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            {errors.openingTime && (
              <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.openingTime}</p>
            )}
          </div>

          {/* Closing Time Select */}
          <div className="flex flex-col text-left">
            <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
              Closing Time <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.closingTime}
              onChange={(e) => handleFieldChange('closingTime', e.target.value)}
              className={`w-full bg-neutral-50 border ${
                errors.closingTime ? 'border-red-400 focus:ring-red-200' : 'border-neutral-200/80 focus:ring-brand-500/20'
              } rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:border-brand-500 transition-all font-inter`}
            >
              {hoursList.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            {errors.closingTime && (
              <p className="mt-1 text-[10px] md:text-xs font-medium text-red-500 font-inter">{errors.closingTime}</p>
            )}
          </div>
        </div>

        {/* Weekday pills */}
        <WeekdaySelector
          selectedDays={formData.weekdays}
          onChange={(days) => handleFieldChange('weekdays', days)}
        />
        {errors.weekdays && (
          <p className="mt-2 text-[10px] font-medium text-red-500 font-inter">{errors.weekdays}</p>
        )}
      </div>

      {/* Communication Preferences Section */}
      <div className="border-t border-neutral-100 pt-5 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted font-poppins mb-4">
          Communication Preferences
        </h3>

        <div className="flex flex-col gap-4">
          {/* Preference 1: Calls */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div>
              <span className="text-xs font-bold text-text-primary font-poppins block">Accept Calls from customers</span>
              <span className="text-[10px] text-text-secondary">Allow shoppers to dial your shop directly</span>
            </div>
            
            {/* Styled Switch Toggle */}
            <button
              type="button"
              onClick={() => handlePreferenceToggle('acceptCalls')}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer flex items-center ${
                formData.preferences.acceptCalls ? 'bg-brand-900 justify-end' : 'bg-neutral-200 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
            </button>
          </div>

          {/* Preference 2: Stock Requests */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div>
              <span className="text-xs font-bold text-text-primary font-poppins block">Enable stock & price requests</span>
              <span className="text-[10px] text-text-secondary">Allow customers to send custom availability checks</span>
            </div>
            
            <button
              type="button"
              onClick={() => handlePreferenceToggle('enableStockRequests')}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer flex items-center ${
                formData.preferences.enableStockRequests ? 'bg-brand-900 justify-end' : 'bg-neutral-200 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
            </button>
          </div>

          {/* Preference 3: Notifications */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div>
              <span className="text-xs font-bold text-text-primary font-poppins block">Receive review notifications</span>
              <span className="text-[10px] text-text-secondary">Get alerted whenever customers post reviews</span>
            </div>
            
            <button
              type="button"
              onClick={() => handlePreferenceToggle('receiveNotifications')}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer flex items-center ${
                formData.preferences.receiveNotifications ? 'bg-brand-900 justify-end' : 'bg-neutral-200 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            updateContact(formData);
            setCurrentStep(2); // Back to Address
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
