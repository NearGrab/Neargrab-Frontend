import React from 'react';
import { ShieldCheck, Compass, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden font-poppins selection:bg-brand-500 selection:text-white bg-white">
      
      {/* LEFT COLUMN: Login Form */}
      <div className="lg:col-span-6 bg-white p-6 md:p-12 lg:p-20 flex flex-col justify-center relative border-r border-neutral-100/50 order-2 lg:order-1 min-h-screen">
          {/* Responsive Header for Mobile logo (hidden on desktop) */}
          <div className="flex lg:hidden justify-center mb-6">
            <Link to="/" className="flex items-center gap-1.5">
              <img src="/nobg-Logo.png" alt="Neargrab Logo" className="w-8 h-8 object-contain" />
              <span className="font-poppins font-extrabold text-base text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          <LoginForm />
        </div>

        {/* RIGHT COLUMN: Visual Brand Illustration & Horizontal Bottom Badges */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-[#FFFBEB]/20 via-[#E6F4EA]/25 to-white p-10 flex-col justify-between relative overflow-hidden order-1 lg:order-2">
          {/* Decorative circular shapes */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/5 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-accent-500/5 blur-3xl rounded-full pointer-events-none"></div>

          {/* 1. Header Row Logo */}
          <div className="relative z-10 text-right flex justify-end">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/nobg-Logo.png" alt="Neargrab Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-poppins font-extrabold text-xl text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          {/* 2. Central Graphic Vector Illustration & Layout Headers */}
          <div className="relative z-10 my-auto text-left flex flex-col gap-6">
            <div>
              <h1 className="text-3xl xl:text-4.5xl font-poppins font-extrabold text-brand-900 leading-tight mb-2 tracking-tight">
                Local Shops. <br />
                <span className="text-emerald-700 inline-flex items-center gap-2">
                  Real Connections.
                  <svg className="w-6 h-6 text-brand-500 fill-brand-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2C6.5 2 2 6.5 2 12C2 14.5 3 16.8 4.7 18.5L2 22L5.5 19.3C7.2 21 9.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" />
                  </svg>
                </span>
              </h1>
              <p className="text-text-secondary text-xs xl:text-sm font-medium leading-relaxed font-inter max-w-md">
                Neargrab helps you discover trusted local shops, check availability, read reviews, and support your neighborhood.
              </p>
            </div>

            {/* Indian Shopkeeper Illustration overlay image */}
            <div className="w-full flex justify-center py-1">
              <div className="relative w-full max-w-[21rem] rounded-2xl overflow-hidden shadow-lg border border-white/60 hover:scale-102 transition-transform duration-500">
                <img
                  src="/src/assets/auth/auth_login_concept.png"
                  alt="Shop Local Dashboard Visual"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* 3. Bottom Horizontal Badges */}
            <div className="grid grid-cols-2 gap-4 max-w-md mt-2">
              {/* Badge 1 */}
              <div className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 shadow-sm border border-brand-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-[11px] font-extrabold text-brand-900 font-poppins">Trusted Shops</h4>
                  <p className="text-[9px] text-text-secondary leading-normal font-inter">Verified local businesses.</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0 shadow-sm border border-amber-100">
                  <Compass className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-[11px] font-extrabold text-brand-900 font-poppins">Nearby & Convenient</h4>
                  <p className="text-[9px] text-text-secondary leading-normal font-inter">Find what you need around you.</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center shrink-0 shadow-sm border border-pink-100">
                  <MessageSquare className="w-4 h-4 text-pink-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-[11px] font-extrabold text-brand-900 font-poppins">Real Reviews</h4>
                  <p className="text-[9px] text-text-secondary leading-normal font-inter">Honest reviews from customers.</p>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-white/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <Heart className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="text-[11px] font-extrabold text-brand-900 font-poppins">Support Local</h4>
                  <p className="text-[9px] text-text-secondary leading-normal font-inter">Empower your neighborhood.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Small Footer tagline */}
          <div className="text-right relative z-10 text-[10px] font-semibold text-text-muted font-inter">
            <span>© 2026 Neargrab. Supporting Neighborhood Commerce.</span>
          </div>
        </div>
      </div>
  );
}
