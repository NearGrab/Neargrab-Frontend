import React, { useState, useEffect } from 'react';
import { Store, Loader2, AlertCircle, Save, Globe, Eye, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import ShopkeeperLayout from '../layout/ShopkeeperLayout';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import { shopkeeperDashboardService } from '../services/shopkeeperDashboardService';
import mediaService from '../../../shared/services/mediaService';

const CITIES = ['Navsari', 'Surat', 'Ahmedabad', 'Vadodara'];
const MAPS_URL_REGEX = /^https:\/\/(www\.)?(google\.[a-z]+(\.[a-z]+)?\/maps|maps\.app\.goo\.gl)\/.*$/;

export default function ShopkeeperSettingsPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    phone: '',
    whatsapp: '',
    email: '',
    street: '',
    landmark: '',
    city: 'Surat',
    googleMapsUrl: '',
    logoUrl: '',
    logoMediaId: '',
    coverUrl: '',
    coverMediaId: ''
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null

  // Fetch shop details and categories on mount
  useEffect(() => {
    async function loadData() {
      setIsPageLoading(true);
      try {
        const [profileRes, catsRes] = await Promise.all([
          shopkeeperDashboardService.getShopProfile(),
          // Try to fetch categories; fallback to standard list if it fails or doesn't exist
          shopkeeperDashboardService.getDashboardData() // contains category info, or fetch directly
        ]);

        if (profileRes.success && profileRes.data) {
          const shop = profileRes.data;
          setFormData({
            name: shop.name || '',
            description: shop.description || '',
            categoryId: shop.category?.id || '',
            phone: shop.contact?.phone || '',
            whatsapp: shop.contact?.whatsapp || '',
            email: shop.contact?.email || '',
            street: shop.address?.street || '',
            landmark: shop.address?.landmark || '',
            city: shop.city || shop.address?.city || 'Surat',
            googleMapsUrl: shop.googleMapsUrl || '',
            logoUrl: shop.logo?.url || '',
            logoMediaId: shop.logo?.id || '',
            coverUrl: shop.cover?.url || '',
            coverMediaId: shop.cover?.id || ''
          });
        }

        // Setup fallback or backend categories
        if (catsRes?.data?.shopProfile?.category) {
          // If we can get active categories list from a route
          try {
            const listRes = await fetch('/api/v1/categories').then(r => r.json());
            if (listRes?.success && Array.isArray(listRes.data)) {
              setCategories(listRes.data);
            } else {
              throw new Error();
            }
          } catch {
            setCategories([
              { id: 'grocery', name: 'Grocery' },
              { id: 'electronics', name: 'Electronics' },
              { id: 'stationery', name: 'Stationery' },
              { id: 'hardware', name: 'Hardware' },
              { id: 'pharmacy', name: 'Pharmacy' },
              { id: 'clothing', name: 'Clothing' }
            ]);
          }
        } else {
          setCategories([
            { id: 'grocery', name: 'Grocery' },
            { id: 'electronics', name: 'Electronics' },
            { id: 'stationery', name: 'Stationery' },
            { id: 'hardware', name: 'Hardware' },
            { id: 'pharmacy', name: 'Pharmacy' },
            { id: 'clothing', name: 'Clothing' }
          ]);
        }
      } catch (err) {
        console.error('Failed to load shop settings:', err);
      } finally {
        setIsPageLoading(false);
      }
    }

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'logo') {
      setLogoUploading(true);
    } else {
      setCoverUploading(true);
    }

    try {
      const res = await mediaService.uploadSingle(file);
      if (res.success && res.data) {
        setFormData(prev => ({
          ...prev,
          [`${type}Url`]: res.data.url,
          [`${type}MediaId`]: res.data.id
        }));
      }
    } catch (err) {
      console.error(`Failed to upload ${type}:`, err);
      setErrors(prev => ({ ...prev, [type]: err.message || 'Upload failed' }));
    } finally {
      if (type === 'logo') {
        setLogoUploading(false);
      } else {
        setCoverUploading(false);
      }
    }
  };

  const handleRemoveImage = (type) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Url`]: '',
      [`${type}MediaId`]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Shop name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Contact number must be exactly 10 digits';
    }

    if (formData.whatsapp.trim() && !/^\d{10}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = 'WhatsApp number must be exactly 10 digits';
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.street.trim()) newErrors.street = 'Business address is required';
    
    if (!formData.googleMapsUrl.trim()) {
      newErrors.googleMapsUrl = 'Google Maps URL is required';
    } else if (!MAPS_URL_REGEX.test(formData.googleMapsUrl.trim())) {
      newErrors.googleMapsUrl = 'Please enter a valid Google Maps location URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreviewLocation = () => {
    if (!formData.googleMapsUrl.trim()) {
      setErrors(prev => ({ ...prev, googleMapsUrl: 'Google Maps URL is required to preview' }));
      return;
    }
    if (!MAPS_URL_REGEX.test(formData.googleMapsUrl.trim())) {
      setErrors(prev => ({ ...prev, googleMapsUrl: 'Please enter a valid Google Maps location URL' }));
      return;
    }
    window.open(formData.googleMapsUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setSaveStatus(null);

    // Map frontend fields back to updated schema payload
    const payload = {
      name: formData.name,
      description: formData.description || null,
      categoryId: formData.categoryId || null,
      logoMediaId: formData.logoMediaId || null,
      coverMediaId: formData.coverMediaId || null,
      googleMapsUrl: formData.googleMapsUrl,
      city: formData.city,
      landmark: formData.landmark || null,
      address: {
        street: formData.street,
        landmark: formData.landmark || null,
        city: formData.city,
        state: 'Gujarat'
      },
      contact: {
        phone: formData.phone,
        whatsapp: formData.whatsapp || null,
        email: formData.email || null
      }
    };

    try {
      const res = await shopkeeperDashboardService.updateShopProfile(payload);
      if (res.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error('Failed to update shop profile:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isPageLoading) {
    return (
      <ShopkeeperLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
          <span className="font-poppins font-bold text-sm text-text-secondary">Loading settings...</span>
        </div>
      </ShopkeeperLayout>
    );
  }

  return (
    <ShopkeeperLayout>
      <div className="flex flex-col gap-6 w-full text-left font-inter">
        
        {/* Header Section */}
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="text-left flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E6F4EA] rounded-xl flex items-center justify-center text-brand-900 border border-brand-100/50">
              <Store className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-lg md:text-xl text-text-primary leading-tight">
                Shop Settings
              </h1>
              <p className="text-[11px] md:text-xs text-text-muted mt-0.5">
                Update your business identity, location URL, and contacts.
              </p>
            </div>
          </div>
        </div>

        {/* Status Banners */}
        {saveStatus === 'success' && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 flex items-center gap-2.5 text-xs font-semibold font-poppins">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile and Location details updated successfully!</span>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 flex items-center gap-2.5 text-xs font-semibold font-poppins">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Failed to save changes. Please try again later.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Logo & Banner Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Logo upload */}
            <div className="bg-neutral-50/50 border border-neutral-150 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <label className="text-xs font-bold text-text-primary mb-3 font-poppins">Shop Logo</label>
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-neutral-200 bg-white overflow-hidden flex items-center justify-center relative shadow-3xs group">
                {formData.logoUrl ? (
                  <>
                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('logo')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300 border-none cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </>
                ) : logoUploading ? (
                  <Loader2 className="w-6 h-6 text-brand-900 animate-spin" />
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-1.5 p-2">
                    <Upload className="w-5 h-5 text-brand-900" />
                    <span className="text-[10px] font-bold text-text-muted">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.logo && <p className="text-[10px] text-red-500 font-semibold mt-1.5">{errors.logo}</p>}
            </div>

            {/* Banner upload */}
            <div className="md:col-span-2 bg-neutral-50/50 border border-neutral-150 rounded-2xl p-4 flex flex-col text-left">
              <label className="text-xs font-bold text-text-primary mb-3 font-poppins">Shop Banner / Cover Photo</label>
              <div className="h-24 w-full rounded-2xl border-2 border-dashed border-neutral-200 bg-white overflow-hidden flex items-center justify-center relative shadow-3xs group">
                {formData.coverUrl ? (
                  <>
                    <img src={formData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('cover')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300 border-none cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </>
                ) : coverUploading ? (
                  <Loader2 className="w-6 h-6 text-brand-900 animate-spin" />
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-1.5">
                    <Upload className="w-5 h-5 text-brand-900" />
                    <span className="text-[10px] font-bold text-text-muted">Upload Store Banner (Landscape)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.cover && <p className="text-[10px] text-red-500 font-semibold mt-1.5">{errors.cover}</p>}
            </div>

          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Basic Info */}
            <div className="flex flex-col gap-4 bg-white border border-neutral-150 p-5 rounded-2xl">
              <h3 className="font-poppins font-bold text-xs md:text-sm text-brand-900 pb-2 border-b border-neutral-100">
                Basic Details
              </h3>
              
              <Input
                label="Shop Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <div className="w-full text-left">
                <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-inter"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="w-full text-left">
                <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-inter resize-none"
                  placeholder="Tell customers about your store offerings, specialty items, and service standards..."
                />
              </div>

            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4 bg-white border border-neutral-150 p-5 rounded-2xl">
              <h3 className="font-poppins font-bold text-xs md:text-sm text-brand-900 pb-2 border-b border-neutral-100">
                Contact & Communication
              </h3>

              <Input
                label="Primary Contact Number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
                maxLength={10}
                placeholder="e.g. 9876543210"
              />

              <Input
                label="WhatsApp Number (Optional)"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                error={errors.whatsapp}
                maxLength={10}
                placeholder="e.g. 9876543210"
              />

              <Input
                label="Business Email (Optional)"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="e.g. contact@mystore.com"
              />
            </div>

            {/* Address & Location */}
            <div className="md:col-span-2 flex flex-col gap-4 bg-white border border-neutral-150 p-5 rounded-2xl">
              <h3 className="font-poppins font-bold text-xs md:text-sm text-brand-900 pb-2 border-b border-neutral-100">
                Address & Navigation URL
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="md:col-span-2">
                  <Input
                    label="Business Address / Street"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    error={errors.street}
                    required
                    placeholder="Shop No., Complex name, Street name"
                  />
                </div>

                <div>
                  <div className="w-full text-left">
                    <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl py-2.5 px-4 text-xs md:text-sm text-text-primary focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-inter"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <Input
                    label="Area / Landmark (Optional)"
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Opposite shopping mall, next to bus stop"
                  />
                </div>

                {/* Google Maps Integration URL */}
                <div className="md:col-span-3">
                  <div className="flex flex-col gap-1.5">
                    <Input
                      label="Google Maps URL"
                      id="googleMapsUrl"
                      name="googleMapsUrl"
                      value={formData.googleMapsUrl}
                      onChange={handleChange}
                      error={errors.googleMapsUrl}
                      required
                      placeholder="https://maps.app.goo.gl/... or https://google.com/maps..."
                    />
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        onClick={handlePreviewLocation}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        className="font-bold text-[10px] h-8.5 shadow-3xs cursor-pointer"
                      >
                        Preview Location
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="xs"
                        onClick={() => window.open('https://maps.google.com', '_blank')}
                        leftIcon={<Globe className="w-3.5 h-3.5" />}
                        className="font-bold text-[10px] h-8.5 shadow-3xs cursor-pointer"
                      >
                        Open Google Maps
                      </Button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 mt-2 border-t border-neutral-100 pt-5">
            <Button
              type="submit"
              disabled={isSaving}
              leftIcon={isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs font-poppins px-6 py-3.5 rounded-xl shadow-xs cursor-pointer"
            >
              {isSaving ? 'Saving Changes...' : 'Save Settings'}
            </Button>
          </div>

        </form>

      </div>
    </ShopkeeperLayout>
  );
}
