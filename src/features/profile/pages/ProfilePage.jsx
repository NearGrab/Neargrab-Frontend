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
  Loader2 
} from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../landing/components/Footer';
import ProfileHeader from '../components/ProfileHeader';
import ReviewsList from '../components/ReviewsList';
import BadgesSection from '../components/BadgesSection';
import WhoToFollow from '../components/WhoToFollow';
import ProfileSidebar from '../components/ProfileSidebar';
import YourImpact from '../components/YourImpact';
import ProfileGlance from '../components/ProfileGlance';
import { profileService } from '../services/profileService';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState('Overview');

  // Load mock profile data asynchronously
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProfileData = async () => {
      try {
        const profileData = await profileService.getProfileData();
        setData(profileData);
      } catch (err) {
        console.error('Failed to resolve customer profile data', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // Listen to sidebar tab change and redirect to settings if Settings is clicked
  useEffect(() => {
    if (activeSidebarTab === 'Settings') {
      navigate('/settings');
    }
  }, [activeSidebarTab, navigate]);

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleAvatarEdit = () => {
    alert('Avatar upload triggered! (High fidelity image selector mockup)');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
        <span className="font-poppins font-semibold text-text-primary text-sm tracking-wide animate-pulse">
          Loading Neargrab Profile...
        </span>
      </div>
    );
  }

  const currentUserDetails = data.currentUser;
  
  // Sidebar items mapped to icons and badges
  const sidebarItems = [
    { id: 'Overview', label: 'Overview', icon: <User className="w-4 h-4 shrink-0" /> },
    { id: 'Reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4 shrink-0" />, badge: currentUserDetails.reviewsCount },
    { id: 'Following', label: 'Following', icon: <Users2 className="w-4 h-4 shrink-0" />, badge: currentUserDetails.followingCount },
    { id: 'Followers', label: 'Followers', icon: <Users className="w-4 h-4 shrink-0" />, badge: currentUserDetails.followersCount },
    { id: 'Saved', label: 'Saved', icon: <Bookmark className="w-4 h-4 shrink-0" />, badge: 32 },
    { id: 'Recently Visited', label: 'Recently Visited', icon: <Clock className="w-4 h-4 shrink-0" />, badge: 18 },
    { id: 'Badges', label: 'Badges', icon: <Award className="w-4 h-4 shrink-0" /> },
    { id: 'Settings', label: 'Settings', icon: <Settings className="w-4 h-4 shrink-0" /> }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Navbar user={user || currentUserDetails} />

      {/* 2. Main 3-Column Profile Layout Grid */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-10 mb-24">
        {/* Mobile Viewport Header priority render */}
        <div className="lg:hidden mb-6">
          <ProfileHeader 
            user={currentUserDetails} 
            onSettingsClick={handleSettingsClick} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (Avatar, Bio, Sidebar Nav Menu, Impact Widget) */}
          <div className="lg:col-span-3 flex flex-col gap-6 w-full">
            {/* Extracted ProfileSidebar Component */}
            <ProfileSidebar
              user={currentUserDetails}
              sidebarItems={sidebarItems}
              activeSidebarTab={activeSidebarTab}
              setActiveSidebarTab={setActiveSidebarTab}
              onEditClick={handleAvatarEdit}
            />

            {/* Extracted YourImpact Sprout Component */}
            <YourImpact impact={data.impact} />
          </div>

          {/* COLUMN 2: CENTER WORKSPACE (ProfileHeader banner, ReviewsList feed) */}
          <div className="lg:col-span-6 flex flex-col gap-0 w-full overflow-hidden">
            {/* Desktop Viewport Header card */}
            <div className="hidden lg:block">
              <ProfileHeader 
                user={currentUserDetails} 
                onSettingsClick={handleSettingsClick} 
              />
            </div>

            {/* List Reviews customer feed */}
            <ReviewsList initialReviews={data.reviews} />
          </div>

          {/* COLUMN 3: RIGHT SIDEBAR (At a Glance Details, Badges board, Who to follow) */}
          <div className="lg:col-span-3 flex flex-col gap-6 w-full">
            {/* Extracted ProfileGlance details component */}
            <ProfileGlance user={currentUserDetails} />

            {/* Achievement Badges Board */}
            <BadgesSection badges={data.badges} />

            {/* Who to Follow Widget */}
            <WhoToFollow initialUsers={data.whoToFollow} />
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
