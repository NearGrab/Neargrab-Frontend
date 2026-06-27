import React from 'react';
import SEO from '../../../components/SEO';
import Navbar from '../components/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import ForShopkeepers from '../components/Landing/ForShopkeepers';
import HowItWorks from '../components/Landing/HowItWorks';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <Navbar />
      <Hero />
      <Features />
      <ForShopkeepers />
      {/* <Stats /> */}
      <HowItWorks />
      <CTABanner />
      <Footer />
    </div>
  );
}
