import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AboutHero from '../components/about-us/AboutHero';
import WhyNeeded from '../components/about-us/WhyNeeded';
import ValuesSection from '../components/about-us/ValuesSection';
import TeamSection from '../components/about-us/TeamSection';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function AboutPage() {
  // Scroll to top on mount for seamless page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* About Hero Section */}
        <AboutHero />

        {/* Why Neargrab is Needed cards grid */}
        <WhyNeeded />

        {/* Vision & Core Principles layout */}
        <ValuesSection />

        {/* Team Co-founders Cards */}
        <TeamSection />
      </main>

      {/* Footer Banner */}
      <CTABanner />
      <Footer />
    </div>
  );
}
