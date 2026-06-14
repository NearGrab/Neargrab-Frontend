import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../shared/components/ui/Badge';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function OutOfStockAlerts() {
  const { lowStockProducts } = useShopkeeperDashboardStore();

  // Filter only products that are out of stock or have lowStockProducts mapped as out of stock
  const outOfStockItems = lowStockProducts.filter(
    (prod) => prod.status === 'Out of Stock' || prod.stockLeft === 0
  );

  return (
    <div className="w-full text-left font-inter flex flex-col justify-between h-full bg-white border border-neutral-100/80 rounded-2xl p-5 shadow-3xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-1">
        <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 leading-none">
          Out of Stock Alerts
        </h3>
        <Link
          to="/shopkeeper/products"
          className="text-[11px] font-bold text-brand-900 hover:text-brand-700 font-poppins transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Out of Stock List */}
      <div className="flex flex-col gap-3 flex-grow">
        {outOfStockItems.length === 0 ? (
          <div className="text-center py-6 text-xs text-text-muted font-medium">
            No out of stock alerts. All good!
          </div>
        ) : (
          outOfStockItems.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center justify-between gap-4 p-3 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-150/40 rounded-xl transition-all duration-300 shadow-3xs"
            >
              {/* Left image and name */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={prod.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80'}
                  alt={prod.name}
                  className="w-10 h-10 object-cover rounded-lg border border-neutral-200/80 shadow-3xs shrink-0 bg-neutral-100"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-extrabold text-text-primary font-poppins block truncate">
                    {prod.name}
                  </span>
                  <span className="text-[9px] text-text-muted mt-1 block">
                    Status: <strong className="text-red-650 font-bold">Out of stock</strong>
                  </span>
                </div>
              </div>

              {/* Right Danger Badge */}
              <Badge variant="danger" size="sm" className="font-extrabold shadow-3xs uppercase shrink-0">
                OUT OF STOCK
              </Badge>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
