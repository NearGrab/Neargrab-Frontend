import React from 'react';
import QuickActions from './QuickActions';
import YourPlan from './YourPlan';
import ConnectedAccounts from './ConnectedAccounts';
import AppInfo from './AppInfo';

import { useAuthStore } from '../../../store/useAuthStore';

export default function RightSidebarWidgets({ setActiveTab }) {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-6 w-full text-left">
      {/* Quick Actions List */}
      <QuickActions setActiveTab={setActiveTab} />

      {/* Subscription/Plan details */}
      <YourPlan />

      {/* OAuth / Account verifications */}
      <ConnectedAccounts user={user} />

      {/* Standard legal metadata and versioning */}
      <AppInfo />
    </div>
  );
}
