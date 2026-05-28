import React, { useState } from 'react';

// Crisp, colored high-fidelity SVG icon renderers matching the mockup
const CategoryIcons = {
  Grocery: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="14" width="32" height="26" rx="4" fill="#E6F4EA" stroke="#10B981" strokeWidth="2.5" />
      <path d="M16 14V10C16 7.79086 17.7909 6 20 6H28C30.2091 6 32 7.79086 32 10V14" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 20V30" stroke="#0B3B2C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M19 25H29" stroke="#0B3B2C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  Dairy: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M16 16C16 11.5817 19.5817 8 24 8C28.4183 8 32 11.5817 32 16V40H16V16Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
      <rect x="20" y="24" width="8" height="10" rx="1.5" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="#3B82F6" strokeWidth="2.5" />
    </svg>
  ),
  Snacks: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M10 6L38 6L35 42L13 42L10 6Z" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M10 6L14 10L18 6L22 10L26 6L30 10L34 6L38 10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
    </svg>
  ),
  PersonalCare: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="16" y="16" width="16" height="26" rx="3" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2.5" />
      <path d="M20 16V10C20 8.89543 20.8954 8 22 8H26C27.1046 8 28 8.89543 28 10V16" stroke="#EC4899" strokeWidth="2.5" />
      <circle cx="24" cy="28" r="3" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2" />
    </svg>
  ),
  Households: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M14 20V42H34V20" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 20H36L24 8L12 20Z" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="21" y="27" width="6" height="8" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
    </svg>
  ),
  Electronics: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="14" y="6" width="20" height="36" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      <circle cx="24" cy="36" r="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
      <line x1="20" y1="10" x2="28" y2="10" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Hardware: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M36 12L30 6L12 24L18 30L36 12Z" fill="#F5F5F5" stroke="#737373" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M15 27L9 33C7.34315 34.6569 7.34315 37.3431 9 39C10.6569 40.6569 13.3431 40.6569 15 39L21 33" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="33" cy="15" r="2" fill="#404040" />
    </svg>
  ),
  Stationery: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M12 10H36V40H12V10Z" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="22" x2="32" y2="22" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="28" x2="26" y2="28" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  More: () => (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <circle cx="12" cy="24" r="3" fill="#6B7280" />
      <circle cx="24" cy="24" r="3" fill="#6B7280" />
      <circle cx="36" cy="24" r="3" fill="#6B7280" />
    </svg>
  )
};

export default function CategoriesGrid({ categories }) {
  const [selectedCat, setSelectedCat] = useState('grocery');

  return (
    <div className="w-full mt-6 md:mt-8">
      {/* Scrollable Container Wrapper */}
      <div className="flex items-center gap-4 overflow-x-auto py-2 px-4 md:px-1 scrollbar-none snap-x snap-mandatory">
        {categories.map((cat) => {
          // Resolve custom visual SVG
          const IconComponent = CategoryIcons[cat.icon] || CategoryIcons.More;
          const isSelected = selectedCat === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`flex flex-col items-center justify-center p-3 w-20 h-24 rounded-2xl cursor-pointer snap-start shrink-0 transition-all duration-300 ${
                isSelected
                  ? 'bg-brand-50 border border-brand-200/50 shadow-md shadow-brand-900/5 scale-105'
                  : 'bg-white border border-neutral-100 hover:border-brand-100 hover:shadow-sm'
              }`}
            >
              {/* Category Icon Badge Container */}
              <div className="w-12 h-12 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110">
                <IconComponent />
              </div>
              
              {/* Category Label */}
              <span className={`text-[10px] md:text-xs font-bold truncate max-w-full text-center leading-none ${
                isSelected ? 'text-brand-900' : 'text-text-secondary'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
