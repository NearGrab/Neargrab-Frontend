import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MessageSquare, 
  Users2, 
  Users, 
  Bookmark, 
  Clock, 
  Award, 
  Settings, 
  Loader2, 
  LogOut, 
  Trash2
} from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';
import ProfileSidebar from '../../profile/components/ProfileSidebar';
import { profileService } from '../../profile/services/profileService';

// Sub-components
import AccountSettings from '../components/AccountSettings';
import NotificationSettings from '../components/NotificationSettings';
import PrivacySettings from '../components/PrivacySettings';
import PreferencesSettings from '../components/PreferencesSettings';
import LanguageSettings from '../components/LanguageSettings';
import AboutSettings from '../components/AboutSettings';
import RightSidebarWidgets from '../components/RightSidebarWidgets';
import { Button } from '../../../shared/components/ui';

export default function SettingsPage() {
  const { user, logout, updateUserLocally } = useAuthStore();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Account'); // Account, Notifications, Privacy, Preferences, Language, About
  const [activeSidebarTab, setActiveSidebarTab] = useState('Settings');
 
  // Load profile data
  useEffect(() => {
    window.scrollTo(0, 0);
 
    const loadData = async () => {
      try {
        const data = await profileService.getProfileData();
        setProfileData(data);
      } catch (err) {
        console.error('Failed to load profile data in Settings', err);
      } finally {
        setLoading(false);
      }
    };
 
    loadData();
  }, []);
 
  // Listen to sidebar tab change
  useEffect(() => {
    if (activeSidebarTab !== 'Settings') {
      // Redirect to profile with active tab
      navigate(`/profile?tab=${activeSidebarTab}`);
    }
  }, [activeSidebarTab, navigate]);
 
  const handleUpdateUser = async (updatedInfo) => {
    try {
      const result = await profileService.updateAccount(updatedInfo);
      if (result) {
        // Sync local auth store reactively
        updateUserLocally({
          ...user,
          ...updatedInfo
        });
        
        // Update settings dashboard view
        setProfileData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            currentUser: {
              ...prev.currentUser,
              ...updatedInfo,
            },
          };
        });
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert(err.message || 'Failed to update profile information.');
    }
  };


  const handleLogOutClick = () => {
    if (confirm('Are you sure you want to log out from Neargrab?')) {
      logout();
      navigate('/login');
    }
  };

  const handleDeleteAccountClick = () => {
    if (confirm('WARNING: This action is irreversible. Are you sure you want to permanently delete your Neargrab account?')) {
      alert('Delete account requested. This will process in 24 hours. Verification email sent.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
        <span className="font-poppins font-semibold text-text-primary text-sm tracking-wide animate-pulse">
          Loading Neargrab Settings...
        </span>
      </div>
    );
  }

  const currentUser = profileData.currentUser;

  // Sidebar items mapped to icons and badges
  const sidebarItems = [
    { id: 'Overview', label: 'Overview', icon: <User className="w-4 h-4 shrink-0" /> },
    { id: 'Reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4 shrink-0" />, badge: currentUser.reviewsCount },
    { id: 'Following', label: 'Following', icon: <Users2 className="w-4 h-4 shrink-0" />, badge: currentUser.followingCount },
    { id: 'Followers', label: 'Followers', icon: <Users className="w-4 h-4 shrink-0" />, badge: currentUser.followersCount },
    { id: 'Saved', label: 'Saved', icon: <Bookmark className="w-4 h-4 shrink-0" />, badge: 32 },
    { id: 'Recently Visited', label: 'Recently Visited', icon: <Clock className="w-4 h-4 shrink-0" />, badge: 18 },
    { id: 'Badges', label: 'Badges', icon: <Award className="w-4 h-4 shrink-0" /> },
    { id: 'Settings', label: 'Settings', icon: <Settings className="w-4 h-4 shrink-0" /> }
  ];

  const tabs = ['Account', 'Notifications', 'Privacy', 'Preferences', 'Language', 'About'];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Navbar user={user || currentUser} />

      {/* 2. Main 3-Column Profile Layout Grid */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-10 mb-24">
        
        {/* Mobile Viewport Header priority render */}
        <div className="lg:hidden mb-6 text-left">
          <div className="bg-white rounded-3xl border border-neutral-200/50 p-6 shadow-sm">
            <h1 className="font-poppins font-extrabold text-2xl text-text-primary flex items-center gap-2">
              Settings <span className="text-xl">🍃</span>
            </h1>
            <p className="text-xs text-text-secondary mt-1">Manage your account, preferences and privacy settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (Avatar, Bio, Sidebar Nav Menu, Support Local Widget) */}
          <div className="lg:col-span-3 flex flex-col gap-6 w-full">
            <ProfileSidebar
              user={currentUser}
              sidebarItems={sidebarItems}
              activeSidebarTab={activeSidebarTab}
              setActiveSidebarTab={setActiveSidebarTab}
              onEditClick={() => alert('Change avatar option triggered')}
            />

            {/* Support Local Banner (matches look in screenshot perfectly) */}
            <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 text-center relative group hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center overflow-hidden border border-emerald-100">
                <span className="text-5xl group-hover:scale-105 transition-transform duration-300">🏪</span>
              </div>
              <h4 className="font-poppins font-extrabold text-sm text-text-primary mb-1">
                Support Local. Grow Together.
              </h4>
              <p className="text-[11px] leading-relaxed text-text-secondary mb-4 font-medium">
                Every review and visit helps your neighborhood grow stronger.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full font-bold flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => navigate('/explore')}
              >
                <span>Explore Shops</span>
                <span className="text-[10px]">➔</span>
              </Button>
            </div>
          </div>

          {/* COLUMN 2: CENTER WORKSPACE (Settings Dashboard) */}
          <div className="lg:col-span-6 flex flex-col gap-6 w-full overflow-hidden">
            {/* Desktop Viewport Header Card */}
            <div className="hidden lg:block bg-white rounded-3xl border border-neutral-200/50 p-6 shadow-sm text-left">
              <h1 className="font-poppins font-extrabold text-2xl md:text-3xl text-text-primary flex items-center gap-2">
                Settings <span className="text-xl">🍃</span>
              </h1>
              <p className="text-xs md:text-sm text-text-secondary mt-1">Manage your account, preferences and privacy settings.</p>
            </div>

            {/* Tab Navigation Menu */}
            <div className="bg-white rounded-3xl border border-neutral-200/50 p-3 shadow-sm flex items-center gap-1 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-2xl font-poppins font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-brand-50 text-brand-900 border border-brand-100/50 shadow-sm shadow-brand-900/5'
                      : 'text-text-secondary hover:bg-neutral-50 hover:text-brand-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Switchable Settings Content */}
            <div className="transition-all duration-300">
              {activeTab === 'Account' && (
                <AccountSettings user={currentUser} onUpdateUser={handleUpdateUser} />
              )}
              {activeTab === 'Notifications' && (
                <NotificationSettings />
              )}
              {activeTab === 'Privacy' && (
                <PrivacySettings />
              )}
              {activeTab === 'Preferences' && (
                <PreferencesSettings />
              )}
              {activeTab === 'Language' && (
                <LanguageSettings />
              )}
              {activeTab === 'About' && (
                <AboutSettings />
              )}
            </div>

            {/* Bottom Danger Action Panel */}
            <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all hover:shadow-md">
              <button
                type="button"
                onClick={handleLogOutClick}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-poppins font-bold text-xs md:text-sm w-full sm:w-auto cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log Out</span>
              </button>

              <div className="hidden sm:block w-px h-6 bg-neutral-200" />

              <button
                type="button"
                onClick={handleDeleteAccountClick}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-poppins font-bold text-xs md:text-sm w-full sm:w-auto cursor-pointer"
              >
                <Trash2 className="w-4 h-4 shrink-0" />
                <span>Delete Account</span>
              </button>
            </div>

          </div>

          {/* COLUMN 3: RIGHT SIDEBAR (Quick Actions, Your Plan, Connected Accounts, App Info) */}
          <div className="lg:col-span-3 flex flex-col gap-6 w-full">
            <RightSidebarWidgets />
          </div>

        </div>
      </main>

      {/* Spacer container to offset the overlap of footer's CTA card */}
      <div className="h-28 md:h-36"></div>

      {/* 3. Global Footer Component */}
      <Footer />
    </div>
  );
}
