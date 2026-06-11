import React, { useEffect } from 'react';
import { useShopOnboardingStore } from '../../../store/useShopOnboardingStore';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import OnboardingStepper from '../components/onboarding/OnboardingStepper';
import BenefitsSidebar from '../components/onboarding/BenefitsSidebar';
import ShopPreviewCard from '../components/onboarding/ShopPreviewCard';
import HelpCard from '../components/onboarding/HelpCard';
import ShopDetailsForm from '../components/onboarding/ShopDetailsForm';
import AddressForm from '../components/onboarding/AddressForm';
import ContactForm from '../components/onboarding/ContactForm';
import BusinessInfoForm from '../components/onboarding/BusinessInfoForm';
import VerificationReview from '../components/onboarding/VerificationReview';
import { ChevronLeft, Store, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShopOnboardingPage() {
  const { currentStep, fetchDraft, isLoading, error } = useShopOnboardingStore();

  // Load draft state on mount
  useEffect(() => {
    fetchDraft();
  }, [fetchDraft]);

  // Scroll to top on step transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Render form of active step
  const renderActiveForm = () => {
    switch (currentStep) {
      case 1:
        return <ShopDetailsForm />;
      case 2:
        return <AddressForm />;
      case 3:
        return <ContactForm />;
      case 4:
        return <BusinessInfoForm />;
      case 5:
        return <VerificationReview />;
      default:
        return <ShopDetailsForm />;
    }
  };

  // Define sidebar and preview slots
  const sidebarSlot = <BenefitsSidebar step={currentStep} />;
  const previewSlot = <ShopPreviewCard />;

  if (isLoading && currentStep === 1) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
        <span className="font-poppins font-bold text-sm text-text-secondary">Loading onboarding draft...</span>
      </div>
    );
  }

  if (error && currentStep === 1) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-6 text-center max-w-md mx-auto">
        <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-full flex items-center justify-center text-red-600">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-poppins font-bold text-lg text-text-primary">Failed to load onboarding</h2>
          <p className="text-xs text-text-secondary mt-1">{error}</p>
        </div>
        <button
          onClick={() => fetchDraft()}
          className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs font-poppins transition-all shadow-sm"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <OnboardingLayout sidebar={sidebarSlot} preview={previewSlot}>
      
      {/* 1. Header Area with Back button and Help Widget */}
      <div className="flex flex-col gap-4 border-b border-neutral-100 pb-5 mb-6 text-left">
        
        {/* Back navigation link */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-text-secondary hover:text-brand-900 transition-colors w-fit font-poppins"
        >
          <ChevronLeft className="w-4 h-4 shrink-0 text-current" />
          <span>Back to Explore</span>
        </Link>

        {/* Brand listing title & Help card row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 bg-[#E6F4EA] rounded-2xl flex items-center justify-center text-brand-900 shrink-0 shadow-sm border border-brand-100/50">
              <Store className="w-6 h-6 text-brand-900" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-brand-900 font-poppins tracking-tight">
                List as a Shopkeeper
              </h1>
              <p className="text-xs md:text-sm text-text-secondary mt-0.5 leading-normal">
                Create your shop profile and start reaching nearby customers.
              </p>
            </div>
          </div>

          <HelpCard />
        </div>
      </div>

      {/* 2. Active Wizard Stepper Progress Bar */}
      <div className="mb-8 bg-[#FAFAFA] border border-neutral-150/55 rounded-2xl p-4 md:px-6 shadow-2xs">
        <OnboardingStepper currentStep={currentStep} />
      </div>

      {/* 3. Render Active Form Screen */}
      <div className="w-full">
        {renderActiveForm()}
      </div>

    </OnboardingLayout>
  );
}
