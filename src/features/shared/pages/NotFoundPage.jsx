import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-poppins font-bold text-brand-900 mb-4">404</h1>
        <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="bg-brand-900 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all cursor-pointer">
            <Home className="w-5 h-5" /> Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:border-gray-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
