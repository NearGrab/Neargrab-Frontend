import React, { useState } from 'react';
import { Bell, Mail, Users, Heart } from 'lucide-react';

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState({
    push: true,
    email: true,
    follow: true,
    likes: true,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationCards = [
    {
      key: 'push',
      label: 'Push Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Receive real-time alerts on your device',
    },
    {
      key: 'email',
      label: 'Email Notifications',
      icon: <Mail className="w-5 h-5" />,
      description: 'Get weekly updates and activity summaries',
    },
    {
      key: 'follow',
      label: 'Follow Updates',
      icon: <Users className="w-5 h-5" />,
      description: 'Notify when people follow your activities',
    },
    {
      key: 'likes',
      label: 'Review Likes',
      icon: <Heart className="w-5 h-5" />,
      description: 'Notify when someone likes your reviews',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Notification Settings</h3>
          <p className="text-xs text-text-secondary mt-0.5">Choose what updates you want to receive.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {notificationCards.map((card) => {
          const isActive = preferences[card.key];
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => togglePreference(card.key)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all duration-300 relative group cursor-pointer hover:shadow-sm ${
                isActive
                  ? 'bg-brand-50/40 border-brand-200 shadow-sm shadow-brand-900/5'
                  : 'bg-white border-neutral-200/80 hover:border-neutral-300'
              }`}
            >
              {/* Top Row: Icon and Status Dot */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isActive ? 'bg-brand-100 text-brand-900' : 'bg-neutral-100 text-text-secondary'
                  }`}
                >
                  {card.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold font-poppins tracking-wider uppercase ${
                    isActive ? 'text-brand-900' : 'text-text-secondary'
                  }`}>
                    {isActive ? 'On' : 'Off'}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300'}`} />
                </div>
              </div>

              {/* Bottom Info Row */}
              <div className="mt-3">
                <span className="block font-poppins font-extrabold text-xs md:text-sm text-text-primary group-hover:text-brand-900 transition-colors">
                  {card.label}
                </span>
                <span className="block text-[10px] leading-normal text-text-secondary mt-1 font-medium">
                  {card.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
