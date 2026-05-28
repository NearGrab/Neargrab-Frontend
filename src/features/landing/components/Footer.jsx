import React from 'react';
import { MapPin } from 'lucide-react';
import content from '../data/content.json';

export default function Footer() {
  const { footer } = content;
  
  return (
    <footer className="bg-white border-t border-neutral-150">
      {/* Main Footer Links */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 pb-12 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-amber-500 w-8 h-8" fill="#10B981" />
              <span className="font-poppins font-bold text-2xl text-gray-900">{footer.brand.name}</span>
            </div>
            <p className="text-gray-500 text-sm">
              {footer.brand.description}
            </p>
          </div>

          {/* Links - Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-poppins">Company</h4>
            <ul className="space-y-4">
              {footer.links.company.map((link, idx) => (
                <li key={idx}><a href={link.href} className="text-gray-600 hover:text-brand-900 text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Links - Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-poppins">Support</h4>
            <ul className="space-y-4">
              {footer.links.support.map((link, idx) => (
                <li key={idx}><a href={link.href} className="text-gray-600 hover:text-brand-900 text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-poppins">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-brand-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-brand-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-brand-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-brand-900 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center md:text-left text-sm text-gray-500">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}

// Inline Social Icons
function Facebook({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function Instagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function Twitter({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function Youtube({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
