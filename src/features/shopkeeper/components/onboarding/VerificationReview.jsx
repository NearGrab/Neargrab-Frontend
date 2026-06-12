import React, { useState, useEffect } from 'react';
import { useShopOnboardingStore } from '../../../../store/useShopOnboardingStore';
import Button from '../../../../shared/components/ui/Button';
import { Edit2, ShieldCheck, MapPin, Phone, Clock, FileText, CheckCircle2, BadgeCheck, X, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VerificationReview() {
  const {
    shopDetails,
    address,
    contact,
    businessInfo,
    photos,
    setCurrentStep,
    submitForReview,
    isLoading,
    error,
    reset
  } = useShopOnboardingStore();

  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [previews, setPreviews] = useState({
    logo: '',
    front: '',
    inside: '',
    cover: '',
    additional: []
  });

  useEffect(() => {
    const urlsToRevoke = [];

    const getUrl = (val) => {
      if (!val) return '';
      if (val instanceof File) {
        const url = URL.createObjectURL(val);
        urlsToRevoke.push(url);
        return url;
      }
      return val;
    };

    setPreviews({
      logo: getUrl(shopDetails.logo),
      front: getUrl(photos.front),
      inside: getUrl(photos.inside),
      cover: getUrl(photos.cover),
      additional: (photos.additional || []).map(getUrl)
    });

    return () => {
      urlsToRevoke.forEach(url => URL.revokeObjectURL(url));
    };
  }, [shopDetails.logo, photos.front, photos.inside, photos.cover, photos.additional]);

  const handleEdit = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const handlePublish = async () => {
    const success = await submitForReview();
    if (success) {
      setShowSuccessModal(true);
    }
  };

  const closeAndNavigate = () => {
    setShowSuccessModal(false);
    reset(); // Clear store
    navigate('/shopkeeper/dashboard'); // Go to new dashboard
  };

  return (
    <div className="text-left flex flex-col gap-6 w-full">
      {/* Title & Description */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-brand-900 font-poppins">Review Your Shop Profile</h2>
        <p className="text-xs text-text-secondary mt-1">Please review all details carefully before publishing your shop to Neargrab search.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-start gap-3 text-xs font-poppins">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Submission Failed</span>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Structured Review Panels */}
      <div className="flex flex-col gap-5">
        
        {/* SECTION 1: Shop Details */}
        <div className="border border-neutral-200/80 rounded-2xl p-4 bg-white shadow-xs relative">
          <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-bold font-poppins text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-900" />
              <span>Shop Details</span>
            </h4>
            <button
              type="button"
              onClick={() => handleEdit(1)}
              className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 border border-brand-100/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              disabled={isLoading}
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-text-muted font-bold block">Shop Name</span>
              <span className="text-text-primary font-bold">{shopDetails.name}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Shop Username</span>
              <span className="text-text-primary font-bold">neargrab.com/{shopDetails.username}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Shop Category & Type</span>
              <span className="text-text-primary font-bold">{shopDetails.category} ({shopDetails.type})</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Established Year</span>
              <span className="text-text-primary font-bold">{shopDetails.establishedYear || 'N/A'}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-text-muted font-bold block">Description</span>
              <p className="text-text-secondary leading-relaxed font-medium mt-0.5">{shopDetails.description}</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Address */}
        <div className="border border-neutral-200/80 rounded-2xl p-4 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-bold font-poppins text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-900" />
              <span>Shop Address & Location</span>
            </h4>
            <button
              type="button"
              onClick={() => handleEdit(2)}
              className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 border border-brand-100/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              disabled={isLoading}
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="md:col-span-2">
              <span className="text-text-muted font-bold block">Address</span>
              <span className="text-text-primary font-bold">
                {address.street}, {address.landmark}, {address.city}, {address.state} - {address.pincode}
              </span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Delivery / Search Radius</span>
              <span className="text-text-primary font-bold">{address.radius} km</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Coordinates</span>
              <span className="text-text-primary font-bold">
                Lat: {address.coordinates.lat ? address.coordinates.lat.toFixed(4) : '0.0000'}, Lng: {address.coordinates.lng ? address.coordinates.lng.toFixed(4) : '0.0000'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Contact Timings */}
        <div className="border border-neutral-200/80 rounded-2xl p-4 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-bold font-poppins text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-brand-900" />
              <span>Contact Timings</span>
            </h4>
            <button
              type="button"
              onClick={() => handleEdit(3)}
              className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 border border-brand-100/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              disabled={isLoading}
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-text-muted font-bold block">Primary Phone</span>
              <span className="text-text-primary font-bold">+91 {contact.phone}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">WhatsApp Number</span>
              <span className="text-text-primary font-bold">+91 {contact.whatsapp}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Alternate Phone</span>
              <span className="text-text-primary font-bold">{contact.alternatePhone ? `+91 ${contact.alternatePhone}` : 'N/A'}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Email Address</span>
              <span className="text-text-primary font-bold">{contact.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Operating Timings</span>
              <span className="text-text-primary font-bold">
                {contact.openingTime} - {contact.closingTime}
              </span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Open Weekdays</span>
              <span className="text-text-primary font-bold">{contact.weekdays.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Business Verification */}
        <div className="border border-neutral-200/80 rounded-2xl p-4 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-bold font-poppins text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-900" />
              <span>Business Info & Documents</span>
            </h4>
            <button
              type="button"
              onClick={() => handleEdit(4)}
              className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 border border-brand-100/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              disabled={isLoading}
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-text-muted font-bold block">GST Number</span>
              <span className="text-text-primary font-bold">{businessInfo.gstNumber || 'N/A'}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">PAN Number</span>
              <span className="text-text-primary font-bold">{businessInfo.panNumber || 'N/A'}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Languages Spoken</span>
              <span className="text-text-primary font-bold">{businessInfo.languages.join(', ')}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Price Range</span>
              <span className="text-text-primary font-bold">{businessInfo.priceRange}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Home Delivery Available</span>
              <span className="text-text-primary font-bold">{businessInfo.homeDelivery ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="text-text-muted font-bold block">Accept UPI Payments</span>
              <span className="text-text-primary font-bold">
                {businessInfo.digitalPayments ? `Yes (${businessInfo.upiId})` : 'No'}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-text-muted font-bold block">Shop Tags</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {businessInfo.tags.map((t) => (
                  <span key={t} className="bg-brand-50 border border-brand-100/50 text-brand-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Photos & Logo previews */}
        <div className="border border-neutral-200/80 rounded-2xl p-4 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-bold font-poppins text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-900" />
              <span>Uploaded Photos & Logos</span>
            </h4>
            <button
              type="button"
              onClick={() => handleEdit(4)}
              className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 border border-brand-100/50 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              disabled={isLoading}
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-1">
            {previews.logo && (
              <div className="flex flex-col gap-1 items-center">
                <div className="w-14 h-14 rounded-full border border-neutral-200 overflow-hidden bg-neutral-50 shadow-xs">
                  <img src={previews.logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] text-text-muted font-bold">Logo</span>
              </div>
            )}
            {previews.front && (
              <div className="flex flex-col gap-1 items-center">
                <div className="w-20 h-14 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 shadow-xs">
                  <img src={previews.front} alt="Front" className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] text-text-muted font-bold">Front Photo</span>
              </div>
            )}
            {previews.inside && (
              <div className="flex flex-col gap-1 items-center">
                <div className="w-20 h-14 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 shadow-xs">
                  <img src={previews.inside} alt="Inside" className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] text-text-muted font-bold">Inside Photo</span>
              </div>
            )}
            {previews.cover && (
              <div className="flex flex-col gap-1 items-center">
                <div className="w-20 h-14 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 shadow-xs">
                  <img src={previews.cover} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] text-text-muted font-bold">Cover Photo</span>
              </div>
            )}
            {previews.additional.map((picUrl, idx) => (
              <div key={idx} className="flex flex-col gap-1 items-center">
                <div className="w-20 h-14 border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 shadow-xs">
                  <img src={picUrl} alt="Additional" className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] text-text-muted font-bold">Photo {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Action triggers */}
      <div className="mt-4 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleEdit(4)}
          disabled={isLoading}
        >
          Back
        </Button>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handlePublish}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Publish Shop 🚀
          </Button>
        </div>
      </div>

      {/* Premium Celebratory Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl relative text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={closeAndNavigate}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* BadgeCheck Icon */}
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-900 border-4 border-brand-50 shadow-inner animate-bounce">
              <BadgeCheck className="w-12 h-12 text-brand-900 stroke-[1.5]" />
            </div>

            <div className="text-center">
              <h3 className="text-lg md:text-xl font-extrabold text-brand-900 font-poppins">
                Shop Published Successfully!
              </h3>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Congratulations! <strong>{shopDetails.name}</strong> is now live on Neargrab. Local customers in your area can now search your products, request prices, and visit your shop directly.
              </p>
            </div>

            <div className="bg-[#E6F4EA] border border-brand-100 p-3.5 rounded-2xl flex items-center gap-3 w-full text-left mt-1">
              <ShieldCheck className="w-5 h-5 text-brand-900 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-brand-900 font-poppins block">Verified Storefront Registered</span>
                <span className="text-[9px] text-brand-700 leading-tight">
                  Your business verification certificate has been submitted for swift review.
                </span>
              </div>
            </div>

            <Button
              onClick={closeAndNavigate}
              className="w-full mt-2"
            >
              Go to Shopkeeper Dashboard
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
