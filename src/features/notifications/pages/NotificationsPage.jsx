import React, { useEffect, useState } from 'react';
import { Leaf, Check, Loader2, Users2, Bell, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';
import NotificationTabs from '../components/NotificationTabs';
import NotificationPreferences from '../components/NotificationPreferences';
import NotificationItem from '../components/NotificationItem';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNotificationStore } from '../../../store/useNotificationStore';
import { cn } from '../../../shared/utils/cn';

export default function NotificationsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('all');
  const {
    notifications,
    preferences,
    recommended,
    loading,
    fetchNotifications,
    markAllAsRead,
    togglePreference,
    followToggle
  } = useNotificationStore();

  // Load notifications data asynchronously on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNotifications(true); // Force fetch on mount
  }, []);

  // Mark all unread items as read
  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  // Toggle user preference switches
  const handleTogglePreference = async (key) => {
    await togglePreference(key);
  };

  // Toggle dynamic follow/following states on sidebar recommendations
  const handleFollowToggle = (id) => {
    followToggle(id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
        <span className="font-poppins font-semibold text-text-primary text-sm tracking-wide animate-pulse">
          Connecting to Neargrab Alerts...
        </span>
      </div>
    );
  }

  // Calculate live reactive counts for filters tabs
  const getTabCounts = () => {
    return {
      all: notifications.length,
      follows: notifications.filter(n => n.type === 'follows').length,
      likes: notifications.filter(n => n.type === 'likes').length,
      alerts: notifications.filter(n => n.type === 'alerts').length
    };
  };

  // Filter items matching selected tab
  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(n => n.type === activeTab);
  };

  const filtered = getFilteredNotifications();

  // Group filtered notifications by date headers
  const groupedDates = ['Today', 'Yesterday', 'This Week'];
  const getGroupedItems = (groupName) => {
    return filtered.filter(n => n.dateGroup === groupName);
  };

  const hasAnyUnread = notifications.some(n => !n.read);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Navbar user={user} />

      {/* 2. Main Workspace Layout */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-10 mb-24">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLUMNS: Notifications Header, Filter Tabs and Primary List */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
            
            {/* Header Title Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-neutral-100/50 rounded-[2rem] p-6 shadow-sm shadow-neutral-100/10">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-poppins font-bold text-brand-900 tracking-tight">
                    Notifications
                  </h1>
                  <div className="w-7 h-7 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-brand-900 fill-brand-900/10" />
                  </div>
                </div>
                <p className="text-text-secondary text-xs md:text-sm font-inter">
                  Stay updated with what's happening around you.
                </p>
              </div>

              {/* Mark as Read CTA */}
              <button
                onClick={handleMarkAllAsRead}
                disabled={!hasAnyUnread}
                className={cn(
                  "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold font-poppins transition-all duration-300 border select-none active:scale-98 cursor-pointer self-start md:self-center shrink-0",
                  hasAnyUnread 
                    ? "bg-brand-50 text-brand-900 border-brand-100 hover:bg-brand-100" 
                    : "bg-neutral-50 text-text-muted border-neutral-200/50 cursor-not-allowed opacity-80"
                )}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark all as read</span>
              </button>
            </div>

            {/* Filter Navigation Tabs */}
            <NotificationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              counts={getTabCounts()}
            />

            {/* Notification items grouped chronologically */}
            <div className="flex flex-col gap-6">
              {filtered.length === 0 ? (
                <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-2xl flex items-center justify-center text-text-muted">
                    <Bell className="w-7 h-7 text-text-secondary" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-poppins font-bold text-text-primary text-base md:text-lg">
                      No notifications found
                    </span>
                    <span className="text-xs md:text-sm text-text-muted font-inter max-w-sm">
                      There are no notifications in this category yet. We'll alert you when updates roll in!
                    </span>
                  </div>
                </div>
              ) : (
                groupedDates.map(groupName => {
                  const groupItems = getGroupedItems(groupName);
                  if (groupItems.length === 0) return null;

                  return (
                    <div key={groupName} className="flex flex-col gap-3">
                      {/* Section Chronological Group Name */}
                      <span className="font-poppins font-bold text-xs md:text-sm text-text-primary pl-1">
                        {groupName}
                      </span>

                      {/* Items stack */}
                      <div className="flex flex-col gap-3">
                        {groupItems.map(item => (
                          <NotificationItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Mobile Only: Notification Preferences Switch Widget */}
            <div className="block lg:hidden mt-6">
              <NotificationPreferences
                preferences={preferences}
                onToggle={handleTogglePreference}
              />
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: Sidebar Preferences, Suggestions, CTAs */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-8 w-full">
            
            {/* Widget 1: Live Interactive Preferences toggles */}
            <NotificationPreferences
              preferences={preferences}
              onToggle={handleTogglePreference}
            />

            {/* Widget 2: People & Shops You May Like */}
            <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm shadow-neutral-100/30 flex flex-col text-left">
              
              {/* Widget Header */}
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-neutral-50">
                <span className="font-poppins font-bold text-sm md:text-base text-text-primary flex items-center gap-2">
                  <Users2 className="w-4.5 h-4.5 text-brand-900" />
                  <span>People & Shops You May Like</span>
                </span>
                <button 
                  onClick={() => alert("Comprehensive directory page is coming soon!")}
                  className="text-xs font-bold text-brand-500 hover:text-brand-900 transition-colors"
                >
                  View all
                </button>
              </div>

              {/* Recommendations list */}
              <div className="flex flex-col gap-4">
                {recommended.map((store) => (
                  <div key={store.id} className="flex items-center justify-between gap-3 group">
                    {/* Left: Store Meta */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0 border border-neutral-200/30 transition-transform duration-300 group-hover:scale-105 select-none">
                        <span className="font-poppins font-bold text-sm text-text-secondary">
                          {store.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col leading-tight text-left">
                        <span className="font-poppins font-semibold text-xs md:text-sm text-text-primary group-hover:text-brand-900 transition-colors duration-300">
                          {store.name}
                        </span>
                        <span className="text-[10px] text-text-muted font-inter flex items-center gap-1">
                          <span>{store.category}</span>
                          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                          <span className="flex items-center gap-0.5 text-brand-700">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            {store.distance}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Toggle Button */}
                    <button
                      onClick={() => handleFollowToggle(store.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-bold font-poppins border transition-all duration-300 active:scale-95 cursor-pointer shadow-sm select-none",
                        store.following
                          ? "bg-brand-50 text-brand-900 border-brand-100 hover:bg-brand-100 flex items-center gap-1"
                          : "bg-white text-text-primary border-neutral-200 hover:bg-neutral-50"
                      )}
                    >
                      {store.following ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-900" />
                          <span>Following</span>
                        </>
                      ) : (
                        <span>Follow</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>

            </div>

            {/* Widget 3: Premium Green Push Notifications CTA banner */}
            <div className="bg-gradient-to-br from-brand-950 to-brand-900 border border-brand-800 rounded-[2rem] p-6 text-left relative overflow-hidden shadow-lg shadow-brand-950/20 group">
              
              {/* Dynamic decorative backdrop bubbles */}
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-brand-800/10 rounded-full blur-2xl group-hover:bg-brand-800/20 transition-all duration-500 pointer-events-none" />
              <div className="absolute left-6 top-6 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />

              {/* Graphic icon box */}
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 mb-5 border border-white/15 animate-bounce">
                <Bell className="w-5 h-5 fill-amber-400/20" />
              </div>

              {/* Title & info description */}
              <h3 className="font-poppins font-bold text-white text-base md:text-lg mb-2 leading-tight">
                Never miss important updates!
              </h3>
              <p className="text-brand-100 text-xs md:text-sm mb-6 leading-relaxed font-inter">
                Enable push notifications to stay updated with offers, reviews and shop alerts.
              </p>

              {/* Interactive green toggle CTA trigger */}
              <button
                onClick={() => alert("Push Notifications activated successfully! (High fidelity preview)")}
                className="w-full bg-white hover:bg-neutral-50 text-brand-900 py-3.5 rounded-2xl font-poppins font-bold text-xs md:text-sm shadow-md transition-all active:scale-98 cursor-pointer select-none"
              >
                Enable Notifications
              </button>

            </div>

          </div>

        </div>

      </main>

      {/* Spacer container to offset footer CTA card overlay */}
      <div className="h-28 md:h-36"></div>

      {/* 3. Global Footer Component */}
      <Footer />
    </div>
  );
}
