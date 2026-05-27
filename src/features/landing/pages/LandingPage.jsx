import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import ForShopkeepers from '../components/Landing/ForShopkeepers';
import HowItWorks from '../components/Landing/HowItWorks';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ForShopkeepers />
      {/* <Stats /> */}
      <HowItWorks />
      <Footer />
    </div>
  );
}
