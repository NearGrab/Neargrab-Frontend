import React from 'react';
import { HelpCircle, Play } from 'lucide-react';
import Button from '../../../../shared/components/ui/Button';

export default function CatalogHelpCard() {
  const handleWatchVideo = () => {
    alert('Launching the interactive Product Management video walkthrough tutorial...');
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      <div className="flex items-start gap-3 text-left">
        {/* Help Question icon */}
        <div className="w-7 h-7 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-brand-100/50 shadow-3xs shrink-0">
          <HelpCircle className="w-4 h-4 text-brand-900" />
        </div>
        
        {/* Helper title details */}
        <div className="min-w-0 flex-grow">
          <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary leading-none">
            Need Help?
          </h4>
          <p className="text-[10px] text-text-muted mt-1 leading-normal font-medium">
            Watch guide on how to manage your products.
          </p>
        </div>
      </div>

      {/* Button link to video player */}
      <div className="pt-3.5">
        <Button
          variant="outline"
          size="sm"
          onClick={handleWatchVideo}
          leftIcon={<Play className="w-3.5 h-3.5 text-brand-900 fill-brand-900" />}
          className="w-full font-bold text-[10px] md:text-xs h-9 cursor-pointer shadow-3xs bg-white hover:bg-neutral-50"
        >
          Watch Video Guide
        </Button>
      </div>
    </div>
  );
}
