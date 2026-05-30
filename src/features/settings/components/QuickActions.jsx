import React from 'react';
import { User, Lock, MapPin, CreditCard, UserX, ChevronRight } from 'lucide-react';

export default function QuickActions() {
  const quickActions = [
    { label: 'Edit Profile', icon: <User className="w-4 h-4" />, action: () => alert('Edit profile details trigger') },
    { label: 'Change Password', icon: <Lock className="w-4 h-4" />, action: () => alert('Password update expander trigger') },
    { label: 'Manage Addresses', icon: <MapPin className="w-4 h-4" />, action: () => alert('Directing to manage addresses...') },
    { label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" />, action: () => alert('Opening saved cards and UPIs...') },
    { label: 'Blocked Users', icon: <UserX className="w-4 h-4" />, action: () => alert('Showing blocked users list...') },
  ];

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-5 transition-all hover:shadow-md">
      <h4 className="font-poppins font-bold text-text-primary text-sm mb-4">Quick Actions</h4>
      <div className="flex flex-col gap-1">
        {quickActions.map((action, i) => (
          <button
            key={i}
            type="button"
            onClick={action.action}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-text-secondary hover:bg-neutral-50 hover:text-brand-900 transition-all cursor-pointer font-medium text-xs md:text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-text-secondary shrink-0">{action.icon}</span>
              <span>{action.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
