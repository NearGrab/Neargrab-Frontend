import React from 'react';
import { Bell, Heart, UserPlus, Star } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

export default function NotificationTabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { id: 'all', label: 'All', icon: <Bell className="w-3.5 h-3.5" />, count: counts.all },
    { id: 'follows', label: 'Follows', icon: <UserPlus className="w-3.5 h-3.5" />, count: counts.follows },
    { id: 'likes', label: 'Review Likes', icon: <Star className="w-3.5 h-3.5" />, count: counts.likes },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-3.5 h-3.5" />, count: counts.alerts }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 py-2 overflow-x-auto no-scrollbar select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-poppins border transition-all duration-300 active:scale-98 shadow-sm",
              isActive 
                ? "bg-brand-900 text-white border-brand-900" 
                : "bg-white text-text-secondary border-neutral-200/80 hover:bg-neutral-50"
            )}
          >
            {/* Custom tab icon */}
            <span className={cn(
              isActive ? "text-brand-100" : "text-text-muted"
            )}>
              {tab.icon}
            </span>
            
            <span>{tab.label}</span>
            
            {/* Embedded count bubble */}
            <span className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded-md font-inter transition-colors",
              isActive 
                ? "bg-brand-800 text-white" 
                : "bg-neutral-100 text-text-secondary"
            )}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
