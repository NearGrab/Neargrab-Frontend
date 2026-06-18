import React from 'react';
import { Edit, MapPin, Store, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '../../../shared/components/ui';

export default function ShopProfileSidebar({
  shopInfo = {},
  activeTab,
  setActiveTab,
  tabChoices = [],
  onEditClick,
  isManageMode = false
}) {
  const {
    name = '',
    username = '',
    logo = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
    category = 'Store',
    isVerified = false,
    openStatus = 'Closed Now',
    location = ''
  } = shopInfo;

  return (
    <div className="flex flex-col gap-6 w-full text-left font-inter">
      {/* Shop Info Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 relative group hover:shadow-md transition-shadow">
        
        {/* Logo with optional edit overlay */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-brand-50 shadow-sm bg-neutral-50 flex items-center justify-center">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
          
          {isManageMode && onEditClick && (
            <button
              onClick={onEditClick}
              className="absolute -top-1.5 -right-1.5 bg-white hover:bg-neutral-50 text-emerald-800 border border-neutral-200 w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
              aria-label="Edit Logo"
            >
              <Edit className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          )}
        </div>

        {/* Shop Name & Username/Slug */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h2 className="font-poppins font-bold text-lg md:text-xl text-text-primary leading-tight">
              {name}
            </h2>
            {isVerified && (
              <CheckCircle className="w-4.5 h-4.5 text-emerald-600 fill-emerald-100 shrink-0" />
            )}
          </div>
          <span className="block text-xs text-text-secondary font-medium mb-3">
            @{username}
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <Badge variant="neutral" className="text-[10px] font-bold py-0.5 px-2 bg-neutral-105/70 border-0 flex items-center gap-1">
              <Store className="w-3 h-3 text-text-muted" />
              {category}
            </Badge>
            <Badge 
              className={`text-[10px] font-bold py-0.5 px-2 border-0 ${
                openStatus.startsWith('Open') 
                  ? 'bg-emerald-50 text-emerald-800' 
                  : 'bg-rose-50 text-rose-800'
              }`}
            >
              <Clock className="w-3 h-3 mr-1 inline shrink-0" />
              {openStatus.startsWith('Open') ? 'Open Now' : 'Closed'}
            </Badge>
          </div>
        </div>

        {/* Contact/Location Details */}
        <div className="border-t border-neutral-100 pt-4 flex flex-col gap-2.5 text-xs text-text-secondary">
          {location && (
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
              <span className="leading-normal font-medium">{location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Menu for Desktop */}
      <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-4 hidden lg:flex flex-col gap-1">
        {tabChoices.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-poppins font-bold text-xs md:text-sm transition-all cursor-pointer ${
              activeTab === item.id
                ? 'bg-brand-50 text-brand-900 border border-brand-100/50 shadow-sm shadow-brand-900/5'
                : 'text-text-secondary hover:bg-neutral-50 hover:text-brand-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={activeTab === item.id ? 'text-brand-900' : 'text-text-secondary'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            
            {item.count !== null && item.count !== undefined && (
              <Badge
                variant={activeTab === item.id ? 'brand' : 'neutral'}
                size="sm"
                className="font-extrabold text-[10px] px-2 py-0.5 border-0"
              >
                {item.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
