import React from 'react';
import { Pencil } from 'lucide-react';
import StockToggle from './StockToggle';
import ProductActionsMenu from './ProductActionsMenu';
import Badge from '../../../../shared/components/ui/Badge';

export default function ProductTableRow({
  product,
  isSelected,
  onSelectToggle,
  onEdit,
  onDelete,
  onToggleStock
}) {
  
  // Style category badges dynamically based on category title
  const getCategoryBadgeClass = (categoryName) => {
    switch (categoryName) {
      case 'Dairy':
        return 'bg-blue-50 text-blue-700 border-blue-100/50';
      case 'Bakery':
        return 'bg-amber-50 text-amber-800 border-amber-200/50';
      case 'Grocery':
        return 'bg-emerald-50 text-brand-900 border-brand-100/30';
      case 'Snacks':
        return 'bg-pink-50 text-pink-700 border-pink-100/50';
      case 'Personal Care':
        return 'bg-purple-50 text-purple-700 border-purple-100/50';
      case 'Household':
        return 'bg-neutral-100 text-text-secondary border-neutral-200/50';
      default:
        return 'bg-neutral-50 text-text-secondary border-neutral-150';
    }
  };

  return (
    <tr className="hover:bg-neutral-50/50 border-b border-neutral-100/80 transition-colors font-inter group">
      
      {/* 1. Checkbox Select Column */}
      <td className="px-4 py-3.5 align-middle select-none">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectToggle(product.id)}
          className="w-4 h-4 rounded-md border-neutral-300 text-brand-900 focus:ring-brand-900/40 cursor-pointer shadow-3xs"
        />
      </td>

      {/* 2. Product Profile Column */}
      <td className="px-4 py-3.5 align-middle text-left min-w-[200px]">
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 shrink-0 flex items-center justify-center shadow-3xs">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Name and SKU */}
          <div className="min-w-0 flex flex-col text-left">
            <span className="font-poppins font-bold text-xs md:text-sm text-text-primary truncate">
              {product.name}
            </span>
            <span className="text-[9px] text-text-muted font-bold tracking-wide mt-0.5">
              SKU: {product.sku}
            </span>
          </div>
        </div>
      </td>

      {/* 3. Category badge Column */}
      <td className="px-4 py-3.5 align-middle text-left select-none">
        <span
          className={`inline-flex font-extrabold text-[9px] px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
            product.category
          )}`}
        >
          {product.category}
        </span>
      </td>

      {/* 4. Price & MRP Column */}
      <td className="px-4 py-3.5 align-middle text-left">
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-xs md:text-sm text-text-primary font-poppins">
            ₹{product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-[9px] text-text-muted font-bold line-through">
              MRP ₹{product.mrp}
            </span>
          )}
        </div>
      </td>

      {/* 5. Inventory Stock Status Column */}
      <td className="px-4 py-3.5 align-middle text-left min-w-[150px] select-none">
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <span
            className={`font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              product.stockAvailable
                ? 'bg-[#E6F4EA] text-brand-900 border border-[#12634B]/10'
                : 'bg-red-50 text-red-700 border border-red-100/50'
            }`}
          >
            {product.stockAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
          {/* Toggle */}
          <StockToggle
            checked={product.stockAvailable}
            onChange={() => onToggleStock(product.id)}
          />
        </div>
      </td>

      {/* 6. Product Views count Column */}
      <td className="px-4 py-3.5 align-middle text-left font-extrabold text-xs text-text-primary font-poppins">
        {product.views.toLocaleString()}
      </td>

      {/* 7. Last Updated relative date Column */}
      <td className="px-4 py-3.5 align-middle text-left text-[10px] md:text-xs font-bold text-text-secondary">
        {product.updatedRelative}
      </td>

      {/* 8. Action buttons Column */}
      <td className="px-4 py-3.5 align-middle text-left select-none">
        <div className="flex items-center gap-1.5 justify-start">
          {/* Pencil Edit button */}
          <button
            type="button"
            onClick={() => onEdit(product.id)}
            className="p-1.5 rounded-lg border border-neutral-200/60 hover:bg-neutral-50 hover:border-neutral-300 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          
          {/* Popover Actions Menu */}
          <ProductActionsMenu
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </td>

    </tr>
  );
}
