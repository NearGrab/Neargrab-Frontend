import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/pages/LandingPage';
import FAQsPage from './features/landing/pages/FAQsPage';
import AboutPage from './features/landing/pages/AboutPage';
import NotFoundPage from './features/shared/pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
