import React, { useState } from 'react';
import { MapPin, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';

export default function Navbar() {
  const { navbar } = content;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="w-full bg-gray-50 sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-8 max-w-[90rem] mx-auto py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="text-amber-500 w-8 h-8" fill="#10B981" />
          <span className="font-poppins font-bold text-xl text-gray-900">{navbar.brand}</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navbar.links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="text-gray-900 font-medium text-sm hover:text-emerald-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex bg-brand-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm items-center gap-2 hover:bg-opacity-90 transition-all cursor-pointer">
            {navbar.button} <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            className="lg:hidden text-gray-900 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col py-4 px-4 gap-4 z-50">
          {navbar.links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-900 font-medium text-lg hover:text-emerald-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="bg-brand-900 text-white px-6 py-3 rounded-xl font-medium flex justify-center items-center gap-2 mt-2">
            {navbar.button} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
}
