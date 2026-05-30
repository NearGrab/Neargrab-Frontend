import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button, Input } from '../../../shared/components/ui';

export default function ProfileInfoForm({ user, onUpdateUser }) {
  const [fullName, setFullName] = useState(user?.name || 'Meet Patel');
  const [username, setUsername] = useState(user?.username || 'meetee_patel');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser({ name: fullName, username });
    alert('Profile information updated successfully! (Local state synced)');
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Profile Information</h3>
          <p className="text-xs text-text-secondary mt-0.5">Update your personal details and profile information.</p>
        </div>
        <span className="text-xs text-text-muted cursor-pointer hover:text-brand-900 transition-colors">⚡ Auto-saved</span>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Avatar Edit Zone */}
        <div className="flex items-center gap-5">
          <div className="relative group w-20 h-20">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-brand-50 shadow-sm bg-neutral-100">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                alt="Profile"
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 bg-white hover:bg-neutral-50 text-brand-900 border border-neutral-200 w-7 h-7 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => alert("Trigger image selector mockup")}
            >
              <Camera className="w-3.5 h-3.5 text-brand-700" />
            </button>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-sm text-text-primary">Your Avatar</h4>
            <p className="text-xs text-text-secondary mt-0.5">PNG or JPG. Recommended size 250x250 pixels.</p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Meet Patel"
            className="bg-white border-neutral-200"
          />
          <Input
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. meetee_patel"
            className="bg-white border-neutral-200"
            leftElement={<span className="text-xs text-text-muted font-bold font-poppins">@</span>}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md" className="font-bold px-8">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
