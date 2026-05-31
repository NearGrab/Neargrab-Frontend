import React from 'react';
import { RefreshCw, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerSwitchBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FFF8F2] border border-[#FFE7D6] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3.5 text-left">
        <div className="w-10 h-10 bg-[#FFF0E4] rounded-full flex items-center justify-center shrink-0 border border-[#FFDFC6]">
          <RefreshCw className="w-5 h-5 text-[#E65100]" />
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-bold text-[#E65100] font-poppins">
            You can still view other shops' products like a customer.
          </h4>
          <p className="text-[10px] md:text-xs text-text-secondary mt-0.5">
            Switch between Shopkeeper and Customer view anytime from your profile.
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/explore')}
        className="flex items-center gap-2 px-5 py-2 border border-brand-900 rounded-full hover:bg-neutral-50 text-brand-900 font-poppins font-bold text-xs transition-all active:scale-95 cursor-pointer bg-white"
      >
        <User className="w-4 h-4 shrink-0 text-brand-900" />
        <span>Switch to Customer View</span>
      </button>
    </div>
  );
}
