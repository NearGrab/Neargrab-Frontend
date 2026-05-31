import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Plus } from 'lucide-react';
import Button from '../../../../shared/components/ui/Button';

export default function ProductCatalogToolbar() {
  const navigate = useNavigate();

  const handleAddNewProduct = () => {
    navigate('/shopkeeper/products/add');
  };

  const handleExportCSV = () => {
    alert('Catalog data successfully formatted and downloaded as CSV!');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5 text-left font-inter">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-poppins font-bold text-lg md:text-2xl text-text-primary leading-tight">
          Product Catalog
        </h1>
        <p className="text-[11px] md:text-xs text-text-muted mt-1 font-medium">
          Manage, edit and track all your products in one place.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 self-start sm:self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          leftIcon={<Download className="w-3.5 h-3.5 text-text-muted" />}
          className="font-bold text-[11px] h-9 md:h-10 cursor-pointer shadow-3xs hover:bg-[#F0FDF4]/30"
        >
          Export
        </Button>
        
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddNewProduct}
          leftIcon={<Plus className="w-4 h-4 text-white stroke-[2.5px]" />}
          className="font-bold text-[11px] h-9 md:h-10 cursor-pointer shadow-3xs"
        >
          Add New Product
        </Button>
      </div>
    </div>
  );
}
