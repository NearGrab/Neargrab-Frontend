import React from 'react';
import { User, Lock, MapPin, CreditCard, UserX, ChevronRight } from 'lucide-react';

export default function QuickActions({ setActiveTab }) {
  const quickActions = [
    { 
      label: 'Edit Profile', 
      icon: <User className="w-4 h-4" />, 
      action: () => {
        if (setActiveTab) {
          setActiveTab('Account');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } 
    },
    { 
      label: 'Change Password', 
      icon: <Lock className="w-4 h-4" />, 
      action: () => {
        if (setActiveTab) {
          setActiveTab('Account');
          setTimeout(() => {
            const el = document.getElementById('security-settings-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }
          }, 100);
        }
      } 
    },
    // { 
    //   label: 'Manage Addresses', 
    //   icon: <MapPin className="w-4 h-4" />, 
    //   action: () => {
    //     if (setActiveTab) {
    //       setActiveTab('Privacy');
    //       setTimeout(() => {
    //         alert('Neargrab: Manage your delivery addresses. You can add or edit your primary delivery coordinates here!');
    //       }, 100);
    //     }
    //   } 
    // },
    // { 
    //   label: 'Payment Methods', 
    //   icon: <CreditCard className="w-4 h-4" />, 
    //   action: () => {
    //     alert('Neargrab Payments: No saved cards found. You can link UPI wallets or cards during checkout!');
    //   } 
    // },
    // { 
    //   label: 'Blocked Users', 
    //   icon: <UserX className="w-4 h-4" />, 
    //   action: () => {
    //     if (setActiveTab) {
    //       setActiveTab('Privacy');
    //       setTimeout(() => {
    //         alert('Neargrab Privacy: You have not blocked any neighbors or stores yet.');
    //       }, 100);
    //     }
    //   } 
    // },
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
