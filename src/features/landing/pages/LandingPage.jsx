import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ForShopkeepers from '../components/ForShopkeepers';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
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
