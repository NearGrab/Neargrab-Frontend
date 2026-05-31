import React from 'react';
import { Pencil, EyeOff, Plus, Check } from 'lucide-react';
import StockToggle from '../../shopkeeper/components/products/StockToggle';

export default function ShopProductsGrid({
  products = [],
  isManageMode = false,
  onEditProduct,
  onToggleStock,
  onViewAll
}) {
  
  const handleAction = (type, prod) => {
    if (type === 'edit') {
      if (onEditProduct) onEditProduct(prod.id);
      else alert(`Editing "${prod.name}"...`);
    } else if (type === 'add') {
      alert(`"${prod.name}" successfully added to cart!`);
    }
  };

  return (
    <div className="w-full text-left font-inter flex flex-col gap-4 bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-1 select-none">
        <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
          Shop Listings
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[10px] md:text-xs font-bold text-brand-900 hover:underline cursor-pointer"
        >
          View all products
        </button>
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="border border-neutral-150 rounded-xl p-3 flex flex-col text-left shadow-3xs bg-white relative hover:shadow-2xs transition-shadow group"
          >
            
            {/* Status top badge */}
            <span
              className={`font-extrabold text-[8px] px-1.5 py-0.5 rounded-md uppercase tracking-wider self-start mb-2 select-none ${
                prod.stockAvailable
                  ? 'bg-[#E6F4EA] text-brand-900'
                  : 'bg-neutral-100 text-text-secondary'
              }`}
            >
              {prod.stockAvailable ? 'In Stock' : 'Out of Stock'}
            </span>

            {/* Thumbnail Image Container */}
            <div className="w-full h-24 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-150/40 relative overflow-hidden mb-2.5">
              <img
                src={prod.image}
                alt={prod.name}
                className="max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title details */}
            <div className="flex flex-col text-left mb-2 flex-grow min-w-0">
              <span className="font-poppins font-bold text-[10px] md:text-xs text-text-primary truncate">
                {prod.name}
              </span>
              <span className="text-[8px] text-text-muted font-bold block uppercase mt-0.5 tracking-wide">
                {prod.category}
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-1.5 pt-2 border-t border-neutral-100/60 mb-3 select-none">
              <span className="text-xs md:text-sm font-extrabold text-text-primary font-poppins">
                ₹{prod.price}
              </span>
              {prod.mrp && prod.mrp > prod.price && (
                <span className="text-[9px] text-text-muted font-bold line-through">
                  ₹{prod.mrp}
                </span>
              )}
            </div>

            {/* Action buttons footer */}
            <div className="pt-1 border-t border-neutral-100/30">
              {isManageMode ? (
                // Shopkeeper Admin quick-actions list
                <div className="flex flex-col gap-2 select-none">
                  {/* Stock switcher */}
                  <div className="scale-85 origin-left">
                    <StockToggle
                      checked={prod.stockAvailable}
                      onChange={() => onToggleStock(prod.id)}
                    />
                  </div>
                  {/* Pencil Edit action button */}
                  <button
                    type="button"
                    onClick={() => handleAction('edit', prod)}
                    className="w-full flex items-center justify-center gap-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-text-secondary hover:text-text-primary py-1 rounded-lg text-[9px] font-bold transition-all duration-300 cursor-pointer"
                  >
                    <Pencil className="w-2.5 h-2.5" />
                    <span>Edit Details</span>
                  </button>
                </div>
              ) : (
                // Customer standard checkout button
                <button
                  type="button"
                  onClick={() => handleAction('add', prod)}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#E6F4EA] border border-[#12634B]/10 hover:bg-[#12634B]/10 text-brand-900 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all duration-300 cursor-pointer shadow-3xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
