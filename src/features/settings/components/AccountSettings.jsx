import React from 'react';
import ProfileInfoForm from './ProfileInfoForm';
import SecuritySettings from './SecuritySettings';

export default function AccountSettings({ user, onUpdateUser }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile Details Edit Form */}
      <ProfileInfoForm user={user} onUpdateUser={onUpdateUser} />

      {/* Security Credentials Edit Form */}
      <SecuritySettings />
    </div>
  );
}
