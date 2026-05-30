import React from 'react';
import QuickActions from './QuickActions';
import YourPlan from './YourPlan';
import ConnectedAccounts from './ConnectedAccounts';
import AppInfo from './AppInfo';

export default function RightSidebarWidgets() {
  return (
    <div className="flex flex-col gap-6 w-full text-left">
      {/* Quick Actions List */}
      <QuickActions />

      {/* Subscription/Plan details */}
      <YourPlan />

      {/* OAuth / Account verifications */}
      <ConnectedAccounts />

      {/* Standard legal metadata and versioning */}
      <AppInfo />
    </div>
  );
}
