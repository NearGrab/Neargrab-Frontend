import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../shared/components/ui/Badge';
import { dashboardMockData } from '../../data/dashboardMockData';

export default function LowStockAlerts() {
  const { lowStockProducts } = dashboardMockData;

  return (
    <div className="w-full text-left font-inter flex flex-col justify-between h-full bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-1">
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Low Stock Alerts
        </h3>
        <Link
          to="/shopkeeper/products"
          className="text-[11px] font-bold text-brand-900 hover:text-brand-700 font-poppins transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Low Stock List */}
      <div className="flex flex-col gap-3 flex-grow">
        {lowStockProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-between gap-4 p-3 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-150/40 rounded-xl transition-all duration-300 shadow-3xs"
          >
            {/* Left image and name */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-10 h-10 object-cover rounded-lg border border-neutral-200/80 shadow-3xs shrink-0 bg-neutral-100"
              />
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold text-text-primary font-poppins block truncate">
                  {prod.name}
                </span>
                <span className="text-[9px] text-text-muted mt-1 block">
                  Stock left: <strong className="text-red-600 font-extrabold">{prod.stockLeft}</strong>
                </span>
              </div>
            </div>

            {/* Right Danger Badge */}
            <Badge variant="danger" size="sm" className="font-extrabold shadow-3xs uppercase shrink-0">
              {prod.status}
            </Badge>

          </div>
        ))}
      </div>
    </div>
  );
}
