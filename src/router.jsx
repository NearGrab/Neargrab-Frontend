import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/product/:productId/map" element={<ProductMapPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/shopkeeper/onboarding" element={<ShopOnboardingPage />} />
      <Route path="/shopkeeper/dashboard" element={<ShopkeeperDashboardPage />} />
      <Route path="/shopkeeper/products" element={<ProductCatalogPage />} />
      <Route path="/shopkeeper/products/add" element={<AddProductPage />} />
      <Route path="/shopkeeper/profile" element={<ShopProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}


