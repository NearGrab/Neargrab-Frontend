import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Edit,
  Package,
  Star,
  QrCode,
  Megaphone
} from 'lucide-react';
import { useShopkeeperDashboardStore } from '../../../../store/useShopkeeperDashboardStore';

export default function QuickActions() {
  const navigate = useNavigate();
  const { setQRModalOpen } = useShopkeeperDashboardStore();

  const actions = [
    {
      title: 'Add Product',
      desc: 'List a new product',
      icon: PlusCircle,
      path: '/shopkeeper/products/add',
      color: 'text-brand-900 bg-brand-50 border-brand-100/50'
    },
    {
      title: 'Edit Product',
      desc: 'Update product details',
      icon: Edit,
      path: '/shopkeeper/products',
      color: 'text-brand-900 bg-brand-50 border-brand-100/50'
    },
    {
      title: 'Product Catalog',
      desc: 'Manage all products',
      icon: Package,
      path: '/shopkeeper/products',
      color: 'text-brand-900 bg-brand-50 border-brand-100/50'
    },
    {
      title: 'Reviews',
      desc: 'See customer reviews',
      icon: Star,
      path: '/shopkeeper/reviews',
      color: 'text-brand-900 bg-brand-50 border-brand-100/50'
    },
    {
      title: 'QR Code',
      desc: 'Share your shop',
      icon: QrCode,
      path: '/shopkeeper/qr',
      color: 'text-brand-900 bg-brand-50 border-brand-100/50'
    },
    {
      title: 'Promotions',
      desc: 'Create offers',
      icon: Megaphone,
      path: '/shopkeeper/promotions',
      color: 'text-brand-900 bg-brand-50 border-brand-100/50'
    }
  ];

  const handleActionClick = (title, path) => {
    if (title === 'QR Code') {
      setQRModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full text-left font-inter">
      {/* Title */}
      <h3 className="font-poppins font-bold text-sm md:text-base text-brand-900 mb-4">
        Quick Actions
      </h3>

      {/* Grid: 2 cols on mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {actions.map((act) => {
          const IconComponent = act.icon;

          return (
            <div
              key={act.title}
              onClick={() => handleActionClick(act.title, act.path)}
              className="flex items-center gap-3.5 p-3.5 bg-white border border-neutral-150/70 hover:border-brand-900 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xs active:scale-97 select-none group"
            >
              {/* Icon Container */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${act.color} transition-colors group-hover:bg-brand-900 group-hover:text-white`}>
                <IconComponent className="w-4.5 h-4.5" />
              </div>

              {/* Text metadata */}
              <div className="min-w-0 text-left">
                <span className="text-[11px] md:text-xs font-bold text-text-primary font-poppins block truncate group-hover:text-brand-900 transition-colors">
                  {act.title}
                </span>
                <span className="text-[9px] text-text-muted mt-0.5 block truncate">
                  {act.desc}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
