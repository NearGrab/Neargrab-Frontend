import React, { useEffect, useState } from 'react';
import { Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <>
        <p className="mb-4">
          By downloading, installing, browsing, or using the Neargrab platform (including our mobile discovery utilities, website directories, and related APIs), you enter a legally binding contract with Neargrab.
        </p>
        <p>
          If you do not agree to all terms and conditions set forth in this document, you are immediately prohibited from accessing or using our services. We reserve the right to revise or update these terms at our discretion.
        </p>
      </>
    )
  },
  {
    id: 'user-accounts',
    title: '2. User Accounts & Verification',
    content: (
      <>
        <p className="mb-4">
          Accessing specialized local search tools or creating product reservations requires registering an account profile. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>Provide accurate, current, and complete registration details.</li>
          <li>Safeguard your authentication credentials and account tokens.</li>
          <li>Notify support immediately in the event of unauthorized profile entries.</li>
          <li>Accept responsibility for all requests, bookings, or reviews submitted under your identity.</li>
        </ul>
      </>
    )
  },
  {
    id: 'discovery-engine',
    title: '3. Discoverability & Marketplace Role',
    content: (
      <>
        <p className="mb-4">
          <strong className="text-brand-900">Neargrab is a localized discovery index, not a merchant.</strong> Our technology pulls real-time store inventories and maps physical distances to nearby brick-and-mortar storefronts:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">Inventory Fluctuations:</strong> While we query physical shops in real-time, Neargrab does not guarantee stock quantities, size availability, or pricing accuracy.
          </li>
          <li>
            <strong className="text-text-primary">Final Purchase Contracts:</strong> Product reservations made through our platform are final transaction agreements completed directly inside the merchant's physical storefront.
          </li>
          <li>
            <strong className="text-text-primary">Merchant Performance:</strong> Neargrab holds no liability or responsibility for physical quality, customer experiences, or refunds inside partner shops.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'prohibited-conduct',
    title: '4. Prohibited Conduct',
    content: (
      <>
        <p className="mb-4">
          To maintain a safe, fair, and reliable directory for local communities, you agree not to engage in the following restricted activities:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>
            <strong className="text-text-primary">API Scraping:</strong> Using bots, crawlers, or automated scripts to harvest shopkeeper locations, inventory catalogs, or pricing parameters.
          </li>
          <li>
            <strong className="text-text-primary">Coordinate Spoofing:</strong> Falsifying GPS vectors or location tokens to spoof inventory availability or fake reservation check-ins.
          </li>
          <li>
            <strong className="text-text-primary">Fake Inquiries:</strong> Booking high-volume physical reservations with no intent of completing checkout at the store.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'intellectual-property',
    title: '5. Intellectual Property Rights',
    content: (
      <>
        <p className="mb-4">
          All proprietary source code, matching algorithms, database structures, interface UI designs, brand marks, and visual design assets displayed on the platform are the exclusive intellectual property of Neargrab and are protected under global copyright, trademark, and patents systems.
        </p>
        <p>
          You are granted a limited, personal, revocable, non-exclusive, and non-transferable license to access our platform solely for personal localized search discovery purposes.
        </p>
      </>
    )
  },
  {
    id: 'limitation-liability',
    title: '6. Limitation of Liability',
    content: (
      <>
        <p className="mb-4">
          In no event shall Neargrab, its founders, directors, employees, or retail partners be held liable for any direct, indirect, incidental, punitive, or consequential damages resulting from:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>System downtime, location matching latency, or search engine inaccuracies.</li>
          <li>Discrepancies in listed product parameters (e.g. pricing, descriptions, pictures).</li>
          <li>Interactions, transactions, disputes, or incidents occurring inside physical partner retail stores.</li>
        </ul>
      </>
    )
  }
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

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
              PLATFORM RULES
            </span>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-brand-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-text-secondary text-sm md:text-base">
              Last updated: May 2026 • 6 min read
            </p>
          </div>
        </div>

        {/* Dynamic Dual-Column Grid */}
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Table of Contents */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 bg-white border border-neutral-200/60 p-6 rounded-2xl shadow-sm hidden lg:block">
            <h2 className="font-poppins font-bold text-text-primary text-sm tracking-wide uppercase mb-4 pb-2 border-b border-neutral-100">
              Contract Chapters
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
            {/* Visual Callout Key Legal Card */}
            <div className="bg-brand-900 text-white rounded-2xl p-6 mb-12 relative overflow-hidden shadow-md">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-800/60 blur-xl rounded-full pointer-events-none"></div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center shrink-0 border border-brand-700/50">
                  <Scale className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg mb-1.5 text-white">
                    Important: Discovery Conduit Only
                  </h3>
                  <p className="text-neutral-200 text-xs md:text-sm leading-relaxed">
                    Neargrab acts strictly as a search discovery index mapping local store inventories. All transactions, collections, warranties, and payments are final agreements made in-person between you and the physical storefront merchant.
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

      <Footer />
    </div>
  );
}
