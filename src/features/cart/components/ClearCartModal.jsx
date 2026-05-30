import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../../../shared/components/ui';

export default function ClearCartModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center border border-neutral-200/50 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          ✕
        </button>

        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 shadow-sm shadow-red-500/5">
          <ShoppingCart className="w-6 h-6 text-red-600" />
        </div>

        <h3 className="font-poppins font-extrabold text-base md:text-lg text-text-primary">Clear Shopping Cart? 🍃</h3>
        <p className="text-xs text-text-secondary mt-2 leading-relaxed">
          Are you sure you want to remove all items from your cart? You will lose all active discounts from these local shops.
        </p>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1 font-bold"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1 font-bold bg-red-600 hover:bg-red-700 border-red-600 text-white"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
