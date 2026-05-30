import React, { useState } from 'react';
import { Lock, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { Button, Input } from '../../../shared/components/ui';

export default function SecuritySettings() {
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  
  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsPasswordExpanded(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-left transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="font-poppins font-bold text-text-primary text-base">Account & Security</h3>
          <p className="text-xs text-text-secondary mt-0.5">Manage your password and security preferences.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Change Password Card Button */}
        <div className="border border-neutral-100 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setIsPasswordExpanded(!isPasswordExpanded)}
            className="w-full flex items-center justify-between p-4 bg-neutral-50/50 hover:bg-neutral-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
                <Lock className="w-4 h-4 text-brand-700" />
              </div>
              <div>
                <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Change Password</span>
                <span className="block text-[11px] text-text-secondary">Update your password regularly for better security</span>
              </div>
            </div>
            {isPasswordExpanded ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
          </button>

          {isPasswordExpanded && (
            <form onSubmit={handlePasswordSubmit} className="p-4 border-t border-neutral-100 space-y-4 bg-white">
              {passwordSuccess ? (
                <div className="bg-brand-50 text-brand-900 border border-brand-100 rounded-xl p-3.5 text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0 animate-bounce" />
                  <span>Password updated successfully!</span>
                </div>
              ) : (
                <>
                  <Input
                    label="Current Password"
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <Input
                    label="New Password"
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <div className="flex justify-end pt-2 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPasswordExpanded(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm">
                      Update Password
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between p-4 border border-neutral-100 rounded-2xl bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-900 shadow-sm shadow-brand-900/5">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
            </div>
            <div>
              <span className="block font-poppins font-bold text-xs md:text-sm text-text-primary">Two-Factor Authentication</span>
              <span className="block text-[11px] text-text-secondary">Add an extra layer of security to your account</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold font-poppins ${twoFactor ? 'text-brand-900' : 'text-text-secondary'}`}>
              {twoFactor ? 'On' : 'Off'}
            </span>
            <button
              type="button"
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 relative focus:outline-none cursor-pointer ${
                twoFactor ? 'bg-brand-900' : 'bg-neutral-200'
              }`}
              aria-label="Toggle Two-Factor Authentication"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  twoFactor ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
