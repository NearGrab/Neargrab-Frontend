import React, { useMemo } from 'react';
import ProductTableRow from './ProductTableRow';

export default function ProductCatalogTable({
  products = [],
  selectedProducts = [],
  onSelectToggle,
  onSelectAllToggle,
  onEdit,
  onDelete,
  onToggleStock
}) {
  
  // Verify if all visible product rows are selected currently
  const isAllSelected = useMemo(() => {
    if (products.length === 0) return false;
    return products.every((prod) => selectedProducts.includes(prod.id));
  }, [products, selectedProducts]);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    const visibleIds = products.map((p) => p.id);
    onSelectAllToggle(checked, visibleIds);
  };

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl shadow-3xs overflow-hidden font-inter text-left">
      
      {/* Scrollable table container */}
      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full border-collapse">
          
          {/* Table Headers */}
          <thead className="bg-[#F9FAFB] border-b border-neutral-100 select-none">
            <tr>
              {/* Checkbox Header */}
              <th className="px-4 py-3.5 w-10 align-middle text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAllChange}
                  className="w-4 h-4 rounded-md border-neutral-300 text-brand-900 focus:ring-brand-900/40 cursor-pointer shadow-3xs"
                />
              </th>
              
              {/* Column labels */}
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Views
              </th>
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Updated
              </th>
              <th className="px-4 py-3.5 text-left font-poppins font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Rows Body */}
          <tbody className="divide-y divide-neutral-100 bg-white">
            {products.length > 0 ? (
              products.map((prod) => (
                <ProductTableRow
                  key={prod.id}
                  product={prod}
                  isSelected={selectedProducts.includes(prod.id)}
                  onSelectToggle={onSelectToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStock={onToggleStock}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-text-muted font-bold text-xs select-none">
                  🔍 No products found matching your search filters.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}
