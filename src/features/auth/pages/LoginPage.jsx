import React from 'react';
import { ShieldCheck, Compass, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
const authLoginConcept = '/assets/auth/auth_login_concept.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden font-poppins selection:bg-brand-500 selection:text-white bg-white">
      
      {/* LEFT COLUMN: Login Form */}
      <div className="lg:col-span-6 bg-white p-6 md:p-12 lg:p-20 flex flex-col justify-center relative border-r border-neutral-100/50 order-2 lg:order-1 min-h-screen">
          {/* Responsive Header for Mobile logo (hidden on desktop) */}
          <div className="flex lg:hidden justify-center mb-6">
            <Link to="/" className="flex items-center gap-1.5">
              <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="w-8 h-8 object-contain" />
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
              <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-poppins font-extrabold text-xl text-brand-900 tracking-tight">Neargrab</span>
            </Link>
          </div>

          {/* 2. Central Graphic Vector Illustration & Layout Headers */}
          
          <img
            src={authLoginConcept}
            alt='Login Concept Image'
            className='w-full max-w-[90%] object-cover'
          />

          {/* 4. Small Footer tagline */}
          <div className="text-right relative z-10 text-[10px] font-semibold text-text-muted font-inter">
            <span>© 2026 Neargrab. Supporting Neighborhood Commerce.</span>
          </div>
        </div>
      </div>
  );
}
