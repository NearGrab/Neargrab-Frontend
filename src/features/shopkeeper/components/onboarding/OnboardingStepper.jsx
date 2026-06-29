import React from 'react';
import { Check } from 'lucide-react';

export default function OnboardingStepper({ currentStep }) {
  const steps = [
    { number: 0, title: 'Authentication', subtitle: 'Login or Sign up' },
    { number: 1, title: 'Shop Details', subtitle: 'Basic information' },
    { number: 2, title: 'Address', subtitle: 'Shop location' },
    { number: 3, title: 'Contact', subtitle: 'Reachability' },
    { number: 4, title: 'Business Info', subtitle: 'More about your shop' },
    { number: 5, title: 'Verification', subtitle: 'Verify & submit' }
  ];

  return (
    <div className="w-full flex items-center justify-between overflow-x-auto pb-4 md:pb-0 scrollbar-none gap-2">
      {steps.map((step, idx) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isUpcoming = step.number > currentStep;

        return (
          <React.Fragment key={step.number}>
            {/* Step Element */}
            <div className="flex flex-col items-center min-w-[70px] md:min-w-[100px] text-center">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm font-poppins transition-all duration-300 ${
                  isCompleted
                    ? 'bg-brand-900 text-white'
                    : isActive
                    ? 'bg-brand-900 text-white ring-4 ring-brand-100'
                    : 'bg-neutral-100 text-text-muted border border-neutral-200'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-white stroke-[3px]" /> : step.number}
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-[10px] md:text-xs font-bold font-poppins transition-colors ${
                  isActive || isCompleted ? 'text-brand-900' : 'text-text-muted'
                }`}
              >
                {step.title}
              </span>
              
              {/* Step Description */}
              <span className="hidden md:inline text-[9px] text-text-muted font-medium mt-0.5">
                {step.subtitle}
              </span>
            </div>

            {/* Connecting Line */}
            {idx < steps.length - 1 && (
              <div className="flex-grow h-0.5 min-w-[15px] max-w-[80px] bg-neutral-200 rounded-full overflow-hidden self-center mb-6">
                <div
                  className={`h-full bg-brand-900 transition-all duration-500`}
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
