import React from 'react';
import Navbar from '../../../../shared/components/layout/Navbar';
import CustomerSwitchBanner from './CustomerSwitchBanner';

export default function OnboardingLayout({ children, sidebar, preview }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-24 md:pb-28">
      {/* Shared Global Customer Navbar */}
      <Navbar />

      {/* Main Core Layout grid */}
      <main className="max-w-[115rem] w-full mx-auto px-4 md:px-8 mt-6 flex-grow flex flex-col justify-between gap-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full relative">
          
          {/* Left Column: Context-aware benefits sidebar */}
          <div className="hidden lg:block sticky top-24 self-start w-[280px] shrink-0">
            {sidebar}
          </div>

          {/* Center Column: Stepper and Forms */}
          <div className="bg-white border border-neutral-100/80 rounded-3xl p-4 md:p-8 shadow-sm flex flex-col min-w-0 flex-grow w-full">
            {children}
          </div>

          {/* Right Column: Live shop preview card */}
          <div className="w-full lg:w-[350px] shrink-0 sticky top-24 self-start">
            {preview}
          </div>

        </div>

        {/* Bottom fixed switch banner */}
        <div className="w-full mt-8">
          <CustomerSwitchBanner />
        </div>
      </main>
    </div>
  );
}
