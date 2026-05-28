import React from 'react';
import { Bell, Mail, UserCheck, Star, Store, Settings, ArrowRight } from 'lucide-react';
import { cn } from '../../../shared/utils/cn';

export default function NotificationPreferences({ preferences = {}, onToggle }) {
  const settingsList = [
    {
      key: 'push',
      label: 'Push Notifications',
      description: 'Get notified on your device',
      icon: <Bell className="w-4 h-4 text-text-secondary" />
    },
    {
      key: 'email',
      label: 'Email Notifications',
      description: 'Receive updates on your email',
      icon: <Mail className="w-4 h-4 text-text-secondary" />
    },
    {
      key: 'follows',
      label: 'Follow Updates',
      description: 'When someone follows you',
      icon: <UserCheck className="w-4 h-4 text-text-secondary" />
    },
    {
      key: 'likes',
      label: 'Review Likes',
      description: 'When someone likes your review',
      icon: <Star className="w-4 h-4 text-text-secondary" />
    },
    {
      key: 'alerts',
      label: 'Shop Alerts',
      description: 'Alerts and offers from shops',
      icon: <Store className="w-4 h-4 text-text-secondary" />
    }
  ];

  return (
    <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm shadow-neutral-100/30 flex flex-col text-left">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-50">
        <span className="font-poppins font-bold text-sm md:text-base text-text-primary">
          Notification Preferences
        </span>
        <Settings className="w-4.5 h-4.5 text-text-muted hover:text-brand-900 transition-colors cursor-pointer" />
      </div>

      {/* Switch items list */}
      <div className="flex flex-col gap-5 mb-6">
        {settingsList.map((setting) => {
          const isActive = preferences[setting.key] ?? false;

          return (
            <div key={setting.key} className="flex items-start justify-between gap-3">
              {/* Left Column: Icon + Text info */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-50 flex items-center justify-center shrink-0">
                  {setting.icon}
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-poppins font-semibold text-xs md:text-sm text-text-primary">
                    {setting.label}
                  </span>
                  <span className="text-[10px] md:text-xs text-text-muted font-inter">
                    {setting.description}
                  </span>
                </div>
              </div>

              {/* Right Column: Custom Switch Toggle */}
              <button
                onClick={() => onToggle(setting.key)}
                className={cn(
                  "w-9 h-5 rounded-full p-0.5 transition-all duration-300 focus:outline-none flex items-center relative cursor-pointer",
                  isActive ? "bg-brand-900" : "bg-neutral-200"
                )}
                role="switch"
                aria-checked={isActive}
                aria-label={`Toggle ${setting.label}`}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 transform absolute",
                  isActive ? "left-[18px]" : "left-[2px]"
                )} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <button 
        onClick={() => alert("Comprehensive preference settings panel will be integrated soon!")}
        className="w-full bg-neutral-50 hover:bg-neutral-100 text-brand-900 hover:text-brand-800 py-3 rounded-2xl font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none active:scale-98"
      >
        <span>Manage Preferences</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
