import React from 'react';
import { MapPin, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
const authSignupConcept = '/assets/auth/auth_signup_concept.png';

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
              <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-poppins font-extrabold text-xl text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          {/* 2. Central Graphic Vector Illustration & Layout Headers */}
          <img 
            src={authSignupConcept}
            alt='Sign Up Image'
            className='w-full max-w-[80%] mx-auto object-cover'
          />
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
              <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="w-8 h-8 object-contain" />
              <span className="font-poppins font-extrabold text-base text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          <SignupForm />
        </div>
      </div>
  );
}
