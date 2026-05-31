import React from 'react';
import { Package, ShieldCheck, ShieldAlert, Layers } from 'lucide-react';

export default function CatalogOverviewCard({ stats = {} }) {
  const {
    totalProducts = 128,
    inStock = 96,
    outOfStock = 32,
    categories = 14
  } = stats;

  const kpis = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      bg: 'bg-emerald-50 text-brand-900 border-brand-100/30'
    },
    {
      label: 'In Stock',
      value: inStock,
      icon: ShieldCheck,
      bg: 'bg-[#E6F4EA] text-brand-900 border-[#12634B]/10'
    },
    {
      label: 'Out of Stock',
      value: outOfStock,
      icon: ShieldAlert,
      bg: 'bg-red-50 text-red-700 border-red-100/50'
    },
    {
      label: 'Categories',
      value: categories,
      icon: Layers,
      bg: 'bg-teal-50 text-teal-700 border-teal-100/50'
    }
  ];

  return (
    <div className="w-full bg-white border border-neutral-100/80 rounded-2xl p-4 shadow-3xs text-left font-inter">
      {/* Title */}
      <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary mb-3.5">
        Catalog Overview
      </h3>

      {/* Grid cells */}
      <div className="grid grid-cols-2 gap-3.5">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="border border-neutral-150 rounded-xl p-3 flex flex-col items-start text-left shadow-3xs"
            >
              {/* Icon Container */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 mb-2 shadow-3xs ${kpi.bg}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              {/* Metric Values */}
              <span className="font-poppins font-extrabold text-base md:text-lg text-text-primary leading-tight">
                {kpi.value}
              </span>
              <span className="text-[9px] text-text-muted font-bold tracking-wide uppercase mt-0.5">
                {kpi.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
