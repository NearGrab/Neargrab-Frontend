import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/pages/LandingPage';
import FAQsPage from './features/landing/pages/FAQsPage';
import AboutPage from './features/landing/pages/AboutPage';
import PrivacyPolicyPage from './features/landing/pages/PrivacyPolicyPage';
import TermsPage from './features/landing/pages/TermsPage';
import NotFoundPage from './features/shared/pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
