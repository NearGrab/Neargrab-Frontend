import React from 'react';
import { MapPin, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden font-poppins selection:bg-brand-500 selection:text-white bg-white">
      
      {/* LEFT COLUMN: Visual Brand Illustration & Core Value Propositions */}
      <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-[#E6F4EA]/40 via-[#FDF2F8]/10 to-white p-10 flex-col justify-between relative overflow-hidden border-r border-neutral-100/50 min-h-screen">
          {/* Decorative circular shapes */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-500/5 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-accent-500/5 blur-3xl rounded-full pointer-events-none"></div>

          {/* 1. Header Row Logo */}
          <div className="relative z-10 text-left">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/nobg-Logo.png" alt="Neargrab Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-poppins font-extrabold text-xl text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          {/* 2. Central Graphic Vector Illustration & Layout Headers */}
          <div className="relative z-10 my-auto text-left flex flex-col gap-6">
            <div>
              <h1 className="text-3xl xl:text-4.5xl font-poppins font-extrabold text-brand-900 leading-tight mb-2 tracking-tight">
                Find It Near You. <br />
                <span className="text-[#D97706] inline-flex items-center gap-2">
                  Support Local.
                  <svg className="w-6 h-6 text-brand-500 fill-brand-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2C6.5 2 2 6.5 2 12C2 14.5 3 16.8 4.7 18.5L2 22L5.5 19.3C7.2 21 9.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" />
                  </svg>
                </span>
              </h1>
              <p className="text-text-secondary text-xs xl:text-sm font-medium leading-relaxed font-inter max-w-md">
                Neargrab connects you with trusted local shops nearby. Discover products, check availability, read real reviews and shop local with confidence.
              </p>
            </div>

            {/* Indian Shopkeeper Illustration overlay image */}
            <div className="w-full flex justify-center py-2">
              <div className="relative w-full max-w-[22rem] rounded-2xl overflow-hidden shadow-lg border border-white/60 hover:scale-102 transition-transform duration-500">
                <img
                  src="/src/assets/auth/auth_signup_concept.png"
                  alt="Shop Local Dashboard Visual"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* 3. Stacked Value Props */}
            <div className="flex flex-col gap-4 max-w-md">
              {/* Prop 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0 shadow-sm border border-brand-100">
                  <MapPin className="w-4 h-4 text-[#0B3B2C]" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-brand-900 font-poppins">Nearby & Convenient</h4>
                  <p className="text-[10px] xl:text-xs text-text-secondary leading-normal font-inter">Find what you need from shops just around the corner.</p>
                </div>
              </div>

              {/* Prop 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0 shadow-sm border border-amber-100">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-brand-900 font-poppins">Support Local</h4>
                  <p className="text-[10px] xl:text-xs text-text-secondary leading-normal font-inter">Every purchase helps local businesses grow.</p>
                </div>
              </div>

              {/* Prop 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center shrink-0 shadow-sm border border-pink-100">
                  <ShieldCheck className="w-4 h-4 text-pink-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-brand-900 font-poppins">Trusted & Reliable</h4>
                  <p className="text-[10px] xl:text-xs text-text-secondary leading-normal font-inter">Real reviews, verified shops and honest information.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Small Footer tagline */}
          <div className="text-left relative z-10 text-[10px] font-semibold text-text-muted font-inter">
            <span>© 2026 Neargrab. Supporting Neighborhood Commerce.</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Signup Form */}
        <div className="lg:col-span-6 bg-white p-6 md:p-12 lg:p-20 flex flex-col justify-center relative min-h-screen">
          {/* Responsive Header for Mobile logo (hidden on desktop) */}
          <div className="flex lg:hidden justify-center mb-6">
            <Link to="/" className="flex items-center gap-1.5">
              <img src="/nobg-Logo.png" alt="Neargrab Logo" className="w-8 h-8 object-contain" />
              <span className="font-poppins font-extrabold text-base text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          <SignupForm />
        </div>
      </div>
  );
}
