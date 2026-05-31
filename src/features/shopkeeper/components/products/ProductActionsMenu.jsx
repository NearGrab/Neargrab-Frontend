import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit2, Copy, Eye, Trash2 } from 'lucide-react';

export default function ProductActionsMenu({ product, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = (type) => {
    setIsOpen(false);
    if (type === 'edit') {
      if (onEdit) onEdit(product.id);
      else alert(`Editing "${product.name}"...`);
    } else if (type === 'duplicate') {
      alert(`Successfully duplicated "${product.name}"!`);
    } else if (type === 'view') {
      alert(`Redirecting to public details page for "${product.name}"...`);
    } else if (type === 'delete') {
      if (onDelete) onDelete(product.id);
      else if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
        alert('Product deleted successfully!');
      }
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger dots */}
      <button
        type="button"
        onClick={toggleMenu}
        className="p-1.5 rounded-lg border border-neutral-200/60 hover:bg-neutral-50 hover:border-neutral-300 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {/* Popover Action list */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-neutral-100/90 rounded-xl shadow-md py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          
          {/* Edit */}
          <button
            type="button"
            onClick={() => handleAction('edit')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] font-bold text-text-secondary hover:bg-neutral-50 hover:text-text-primary transition-colors text-left cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Product</span>
          </button>

          {/* Duplicate */}
          <button
            type="button"
            onClick={() => handleAction('duplicate')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] font-bold text-text-secondary hover:bg-neutral-50 hover:text-text-primary transition-colors text-left cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicate Product</span>
          </button>

          {/* View details */}
          <button
            type="button"
            onClick={() => handleAction('view')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] font-bold text-text-secondary hover:bg-neutral-50 hover:text-text-primary transition-colors text-left cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Product</span>
          </button>

          {/* Delete divider */}
          <div className="border-t border-neutral-100 my-1" />

          {/* Delete */}
          <button
            type="button"
            onClick={() => handleAction('delete')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Delete Product</span>
          </button>

        </div>
      )}
    </div>
  );
}
