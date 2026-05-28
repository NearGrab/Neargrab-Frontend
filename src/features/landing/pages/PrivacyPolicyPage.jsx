import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: (
      <>
        <p className="mb-4">
          Welcome to Neargrab. We value your trust and are fully committed to protecting your personal data and privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our local discovery platform.
        </p>
        <p>
          By accessing or using the Neargrab platform, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this policy.
        </p>
      </>
    )
  },
  {
    id: 'info-collection',
    title: '2. Information We Collect',
    content: (
      <>
        <p className="mb-4">
          To provide a seamless real-time local search and inventory experience, we collect specific categories of data:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Real-Time Location Data:</strong> Precise GPS coordinates (with your permission) to display stores and product availability closest to you.
          </li>
          <li>
            <strong className="text-text-primary">Account Details:</strong> Name, email address, phone number, and preferences entered during registration.
          </li>
          <li>
            <strong className="text-text-primary">Search & Activity Logs:</strong> Product search keywords, store profiles visited, and items reserved.
          </li>
          <li>
            <strong className="text-text-primary">Device Metainfo:</strong> IP address, operating system, browser type, and cookie logs for security.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'data-usage',
    title: '3. How We Use Your Data',
    content: (
      <>
        <p className="mb-4">
          Neargrab utilizes your data to power localized commerce tools and deliver a tailored shopping experience:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>To find, sort, and display physical inventories in your immediate radius.</li>
          <li>To process reservation requests and coordinate product pickups between you and local shopkeepers.</li>
          <li>To compile anonymous, aggregated statistics to help local stores understand community demand.</li>
          <li>To secure our APIs and block automated crawlers or fraudulent coordinate spoofing.</li>
        </ul>
      </>
    )
  },
  {
    id: 'data-sharing',
    title: '4. Information Sharing & Disclosure',
    content: (
      <>
        <p className="mb-4">
          <strong className="text-brand-900">We do not sell, rent, or trade your personal data.</strong> Your information is only shared under restricted conditions to fulfill service operations:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">With Local Shopkeepers:</strong> Fulfilling product reservations requires sharing your profile name to verify item collection.
          </li>
          <li>
            <strong className="text-text-primary">With Mapping Partners:</strong> Coordinate routing requests are processed via third-party maps API (e.g. Google Maps) anonymously.
          </li>
          <li>
            <strong className="text-text-primary">For Legal Protection:</strong> If required by law, subpoena, or to protect the safety of the Neargrab community.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'security-retention',
    title: '5. Data Security & Retention',
    content: (
      <>
        <p className="mb-4">
          Neargrab implements robust physical and digital security measures to keep your archives safe. We use standard TLS encryption for all data in transit and AES-256 encryption at rest.
        </p>
        <p>
          We retain active location logs for a maximum of 30 days, after which they are irreversibly anonymized. Account credentials and search records are retained as long as your profile remains active.
        </p>
      </>
    )
  },
  {
    id: 'your-rights',
    title: '6. Your Rights & Choices',
    content: (
      <>
        <p className="mb-4">
          You hold full sovereignty over your digital trail on Neargrab:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Location Access:</strong> You can disable location tracking at any time in your device preferences (though search will require manual zip entry).
          </li>
          <li>
            <strong className="text-text-primary">Data Export:</strong> Request a complete structural archive of all personal records we have on file.
          </li>
          <li>
            <strong className="text-text-primary">Account Deletion:</strong> Close your account and request full purge of personal history through our settings console.
          </li>
        </ul>
      </>
    )
  }
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // accounting for sticky nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-grow pt-10 pb-48 md:pb-64 mb-16 md:mb-24">
        {/* Hero Header */}
        <div className="relative py-20 px-6 text-center overflow-hidden bg-white border-b border-neutral-200/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[25rem] bg-gradient-to-b from-brand-50/40 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-3xl mx-auto">
            <span className="text-brand-600 text-xs font-bold tracking-widest uppercase mb-3 block">
              LEGAL DOCUMENT
            </span>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-brand-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-text-secondary text-sm md:text-base">
              Last updated: May 2026 • 5 min read
            </p>
          </div>
        </div>

        {/* Dynamic Dual-Column Grid */}
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Table of Contents */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 bg-white border border-neutral-200/60 p-6 rounded-2xl shadow-sm hidden lg:block">
            <h2 className="font-poppins font-bold text-text-primary text-sm tracking-wide uppercase mb-4 pb-2 border-b border-neutral-100">
              On This Page
            </h2>
            <nav className="flex flex-col gap-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left text-sm py-2 px-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-brand-50 text-brand-900 pl-4 border-l-2 border-brand-500'
                      : 'text-text-secondary hover:text-brand-900 hover:bg-neutral-50'
                  }`}
                >
                  {sec.title.substring(3)}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Column: Content Body */}
          <article className="lg:col-span-9 bg-white border border-neutral-200/60 p-8 md:p-12 rounded-3xl shadow-sm max-w-4xl">
            {/* Visual Callout Key Summary Card */}
            <div className="bg-brand-900 text-white rounded-2xl p-6 mb-12 relative overflow-hidden shadow-md">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-800/60 blur-xl rounded-full pointer-events-none"></div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center shrink-0 border border-brand-700/50">
                  <ShieldCheck className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg mb-1.5 text-white">
                    Our Privacy Commitment
                  </h3>
                  <p className="text-neutral-200 text-xs md:text-sm leading-relaxed">
                    We believe your location is your personal property. Neargrab is built with strict privacy guards: we never sell your usage trail, we do not tracks your background coordinates, and we limit retention logs to 30 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Content Sections */}
            <div className="space-y-12">
              {sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-32 pb-8 border-b border-neutral-100 last:border-b-0 last:pb-0"
                >
                  <h2 className="font-poppins font-bold text-text-primary text-xl md:text-2xl mb-4 text-brand-900">
                    {sec.title}
                  </h2>
                  <div className="text-text-secondary text-sm md:text-base leading-relaxed space-y-4">
                    {sec.content}
                  </div>
                </section>
              ))}
            </div>
          </article>

        </div>
      </main>

      <CTABanner />
      <Footer />
    </div>
  );
}
