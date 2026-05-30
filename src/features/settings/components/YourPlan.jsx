import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../shared/components/ui';

export default function YourPlan() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 transition-all hover:shadow-md">
      <h4 className="font-poppins font-bold text-text-primary text-sm mb-4">Your Plan</h4>
      <div className="bg-brand-50/40 border border-brand-100 rounded-2xl p-4 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-md shadow-amber-500/5 mb-3">
          <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
        </div>
        <span className="block font-poppins font-extrabold text-sm text-text-primary">Free Plan</span>
        <p className="text-[11px] leading-normal text-text-secondary mt-1.5 mb-4">
          You're enjoying free features on Neargrab. Unlock full power of local grab.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full font-bold bg-white text-brand-900 border-neutral-200 hover:border-brand-500"
          onClick={() => setShowUpgradeModal(true)}
        >
          Explore Premium
        </Button>
      </div>

      {/* Upgrade Modal Mockup */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center border border-neutral-200/50 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              ✕
            </button>

            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-4 shadow-md shadow-amber-500/10">
              <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
            </div>

            <h3 className="font-poppins font-extrabold text-lg md:text-xl text-text-primary">Upgrade to Neargrab Pro 🍃</h3>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
              Gain access to unlimited delivery ranges, real-time stock alert requests, direct chat channels with shop owners, and exclusive local brand memberships!
            </p>

            <div className="my-5 p-4 bg-brand-50/50 border border-brand-100 rounded-2xl text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Unlimited distance search range (up to 15km)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Priority notifications & real-time pricing alerts</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Exclusive premium badge on your reviews</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 font-bold"
                onClick={() => setShowUpgradeModal(false)}
              >
                Maybe Later
              </Button>
              <Button
                variant="accent"
                className="flex-1 font-bold"
                onClick={() => {
                  alert('Thank you for exploring! Neargrab Premium mock checkout triggered.');
                  setShowUpgradeModal(false);
                }}
              >
                Go Premium
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
