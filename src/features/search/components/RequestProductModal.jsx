import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function RequestProductModal({ isOpen, onClose }) {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [reqProduct, setReqProduct] = useState('');
  const [reqSpec, setReqSpec] = useState('');
  const [reqShop, setReqShop] = useState('All nearby shops');

  if (!isOpen) return null;

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!reqProduct.trim()) return;
    
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setReqProduct('');
      setReqSpec('');
      onClose();
      alert("Your product request has been broadcasted successfully! Nearby shops will alert you once stock resolves.");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-[2px] p-4 select-none">
      <div className="w-full max-w-md bg-white border border-neutral-100 rounded-3xl shadow-2xl overflow-hidden relative p-6 text-left animate-in fade-in zoom-in duration-200">
        
        {/* Modal Exit Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary hover:bg-neutral-50 rounded-full p-1 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <h3 className="font-poppins font-bold text-base md:text-lg text-text-primary">
            Request a Product
          </h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            Broadcast a direct stock request to nearby local stores. They will alert you as soon as they list the item.
          </p>
        </div>

        {requestSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 bg-brand-50 border border-brand-100 rounded-full flex items-center justify-center text-brand-900 animate-bounce">
              <Check className="w-6 h-6 text-brand-900" />
            </div>
            <span className="text-xs font-bold text-text-primary tracking-wide animate-pulse">
              Broadcasting stock query...
            </span>
          </div>
        ) : (
          <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
            
            {/* Product Name input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary">
                Product / Brand Name *
              </label>
              <input
                type="text"
                required
                value={reqProduct}
                onChange={(e) => setReqProduct(e.target.value)}
                placeholder="e.g. Saffola Active Olive Oil 2L"
                className="w-full px-4 py-2.5 text-xs md:text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-semibold"
              />
            </div>

            {/* Spec details / Quantity */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary">
                Quantity / Description
              </label>
              <input
                type="text"
                value={reqSpec}
                onChange={(e) => setReqSpec(e.target.value)}
                placeholder="e.g. Need 2 bottles urgently"
                className="w-full px-4 py-2.5 text-xs md:text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-semibold"
              />
            </div>

            {/* Preferred Shops */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary">
                Preferred Target Store
              </label>
              <select
                value={reqShop}
                onChange={(e) => setReqShop(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs md:text-sm border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-brand-500 font-bold"
              >
                <option>All nearby shops</option>
                <option>Patel General Store (0.2 km)</option>
                <option>Jain Kirana Store (0.4 km)</option>
                <option>Shree Provision Store (0.5 km)</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-grow bg-transparent hover:bg-neutral-50 text-text-secondary border border-neutral-200/80 font-poppins font-bold text-xs py-3 rounded-full transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-grow bg-brand-900 hover:bg-brand-800 text-white font-poppins font-bold text-xs py-3 rounded-full shadow-md shadow-brand-900/10 transition-all cursor-pointer text-center"
              >
                Submit Request
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
