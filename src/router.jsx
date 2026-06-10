import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// Pages
import LandingPage from './features/landing/pages/LandingPage';
import FAQsPage from './features/landing/pages/FAQsPage';
import AboutPage from './features/landing/pages/AboutPage';
import PrivacyPolicyPage from './features/landing/pages/PrivacyPolicyPage';
import TermsPage from './features/landing/pages/TermsPage';
import ExplorePage from './features/explore/pages/ExplorePage';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ProfilePage from './features/profile/pages/ProfilePage';
import NotificationsPage from './features/notifications/pages/NotificationsPage';
import NotFoundPage from './features/shared/pages/NotFoundPage';
import SearchPage from './features/search/pages/SearchPage';
import ProductPage from './features/product/pages/ProductPage';
import ProductMapPage from './features/product/pages/ProductMapPage';
import SettingsPage from './features/settings/pages/SettingsPage';
import CartPage from './features/cart/pages/CartPage';
import ShopOnboardingPage from './features/shopkeeper/pages/ShopOnboardingPage';
import ShopkeeperDashboardPage from './features/shopkeeper/pages/ShopkeeperDashboardPage';
import AddProductPage from './features/shopkeeper/pages/AddProductPage';
import ProductCatalogPage from './features/shopkeeper/pages/ProductCatalogPage';
import ShopProfilePage from './features/shop/pages/ShopProfilePage';
import PublicShopProfilePage from './features/shop/pages/PublicShopProfilePage';

// A lightweight, premium loading screen for session boot
function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFBEB]/10 via-[#E6F4EA]/10 to-white">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin"></div>
        <img src="/nobg-Logo.png" alt="Neargrab" className="absolute w-6 h-6 object-contain" />
      </div>
      <p className="text-xs md:text-sm font-semibold text-brand-900 font-poppins animate-pulse">Initializing session...</p>
    </div>
  );
}

// Protected wrapper for authenticated customer pages
function ProtectedRoute({ children }) {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const location = useLocation();

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Public-only wrapper for guest pages (login/signup)
function PublicOnlyRoute({ children }) {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/explore" replace />;
  }

  return children;
}

// Shopkeeper-only wrapper
function ShopkeeperRoute({ children }) {
  const { isAuthenticated, user, hasHydrated } = useAuthStore();
  const location = useLocation();

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'SHOPKEEPER') {
    return <Navigate to="/shopkeeper/onboarding" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/product/:productId/map" element={<ProductMapPage />} />
      <Route path="/shops/:shopId" element={<PublicShopProfilePage />} />

      {/* Guest Only Pages */}
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />

      {/* Authenticated Customer Pages */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/profile/:username" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />

      {/* Authenticated Shopkeeper Onboarding Page */}
      <Route path="/shopkeeper/onboarding" element={<ProtectedRoute><ShopOnboardingPage /></ProtectedRoute>} />

      {/* Authenticated Shopkeeper Pages */}
      <Route path="/shopkeeper/dashboard" element={<ShopkeeperRoute><ShopkeeperDashboardPage /></ShopkeeperRoute>} />
      <Route path="/shopkeeper/products" element={<ShopkeeperRoute><ProductCatalogPage /></ShopkeeperRoute>} />
      <Route path="/shopkeeper/products/add" element={<ShopkeeperRoute><AddProductPage /></ShopkeeperRoute>} />
      <Route path="/shopkeeper/profile" element={<ShopkeeperRoute><ShopProfilePage /></ShopkeeperRoute>} />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
