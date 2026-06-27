import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import ErrorBoundary from './shared/components/ErrorBoundary';

// Lazy Loaded Pages
const LandingPage = React.lazy(() => import('./features/landing/pages/LandingPage'));
const FAQsPage = React.lazy(() => import('./features/landing/pages/FAQsPage'));
const AboutPage = React.lazy(() => import('./features/landing/pages/AboutPage'));
const PrivacyPolicyPage = React.lazy(() => import('./features/landing/pages/PrivacyPolicyPage'));
const TermsPage = React.lazy(() => import('./features/landing/pages/TermsPage'));
const ExplorePage = React.lazy(() => import('./features/explore/pages/ExplorePage'));
const LoginPage = React.lazy(() => import('./features/auth/pages/LoginPage'));
const SignupPage = React.lazy(() => import('./features/auth/pages/SignupPage'));
const ProfilePage = React.lazy(() => import('./features/profile/pages/ProfilePage'));
const NotificationsPage = React.lazy(() => import('./features/notifications/pages/NotificationsPage'));
const NotFoundPage = React.lazy(() => import('./features/shared/pages/NotFoundPage'));
const SearchPage = React.lazy(() => import('./features/search/pages/SearchPage'));
const ProductPage = React.lazy(() => import('./features/product/pages/ProductPage'));
const ProductMapPage = React.lazy(() => import('./features/product/pages/ProductMapPage'));
const SettingsPage = React.lazy(() => import('./features/settings/pages/SettingsPage'));
const CartPage = React.lazy(() => import('./features/cart/pages/CartPage'));
const ShopOnboardingPage = React.lazy(() => import('./features/shopkeeper/pages/ShopOnboardingPage'));
const ShopkeeperDashboardPage = React.lazy(() => import('./features/shopkeeper/pages/ShopkeeperDashboardPage'));
const AddProductPage = React.lazy(() => import('./features/shopkeeper/pages/AddProductPage'));
const ProductCatalogPage = React.lazy(() => import('./features/shopkeeper/pages/ProductCatalogPage'));
const ShopProfilePage = React.lazy(() => import('./features/shop/pages/ShopProfilePage'));
const PublicShopProfilePage = React.lazy(() => import('./features/shop/pages/PublicShopProfilePage'));
const PromotionsPage = React.lazy(() => import('./features/shopkeeper/pages/PromotionsPage'));
const ShopkeeperSettingsPage = React.lazy(() => import('./features/shopkeeper/pages/ShopkeeperSettingsPage'));

// A lightweight, premium loading screen for session boot
function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFBEB]/10 via-[#E6F4EA]/10 to-white">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin"></div>
        <img src="/nobg-logo.png" alt="Neargrab logo — local shop discovery platform" width="663" height="663" className="absolute w-6 h-6 object-contain pointer-events-none" />
      </div>
      <p className="text-xs md:text-sm font-semibold text-brand-900 font-poppins animate-pulse">Loading Neargrab...</p>
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
  const location = useLocation();

  useEffect(() => {
    const getPageName = (pathname) => {
      if (pathname === '/') return 'Welcome';
      if (pathname === '/explore') return 'Explore';
      if (pathname === '/search') return 'Search';
      if (pathname === '/login') return 'Login';
      if (pathname === '/signup') return 'Sign Up';
      if (pathname === '/profile') return 'Profile';
      if (pathname.startsWith('/profile/')) return 'User Profile';
      if (pathname === '/notifications') return 'Notifications';
      if (pathname === '/settings') return 'Settings';
      if (pathname === '/cart') return 'Cart';
      if (pathname === '/about') return 'About Us';
      if (pathname === '/faqs') return 'FAQs';
      if (pathname === '/privacy') return 'Privacy Policy';
      if (pathname === '/terms') return 'Terms of Service';
      if (pathname.startsWith('/product/') && pathname.endsWith('/map')) return 'Product Map';
      if (pathname.startsWith('/product/')) return 'Product Detail';
      if (pathname.startsWith('/shops/')) return 'Shop Profile';
      if (pathname === '/shopkeeper/onboarding') return 'Shopkeeper Onboarding';
      if (pathname === '/shopkeeper/dashboard') return 'Shopkeeper Dashboard';
      if (pathname === '/shopkeeper/products') return 'Product Catalog';
      if (pathname === '/shopkeeper/products/add') return 'Add Product';
      if (pathname.includes('/shopkeeper/products/') && pathname.endsWith('/edit')) return 'Edit Product';
      if (pathname === '/shopkeeper/profile') return 'Manage Shop Profile';
      if (pathname === '/shopkeeper/settings') return 'Shopkeeper Settings';
      if (pathname === '/shopkeeper/promotions') return 'Promotions';
      return '';
    };

    const pageName = getPageName(location.pathname);
    if (location.pathname !== '/') {
      document.title = pageName ? `Neargrab | ${pageName}` : 'Neargrab';
    }
  }, [location]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<PublicOnlyRoute><LandingPage /></PublicOnlyRoute>} />
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
          <Route path="/shopkeeper/products/:productId/edit" element={<ShopkeeperRoute><AddProductPage /></ShopkeeperRoute>} />
          <Route path="/shopkeeper/profile" element={<ShopkeeperRoute><ShopProfilePage /></ShopkeeperRoute>} />
          <Route path="/shopkeeper/settings" element={<ShopkeeperRoute><ShopkeeperSettingsPage /></ShopkeeperRoute>} />
          <Route path="/shopkeeper/promotions" element={<ShopkeeperRoute><PromotionsPage /></ShopkeeperRoute>} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

