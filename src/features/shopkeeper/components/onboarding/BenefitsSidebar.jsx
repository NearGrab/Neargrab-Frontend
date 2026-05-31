import React from 'react';
import { Eye, TrendingUp, ShieldCheck, Megaphone, MapPin, Navigation, Phone, MessageSquare, Award, CheckCircle2, FileText, Check } from 'lucide-react';

export default function BenefitsSidebar({ step }) {
  // Define benefits content for each step
  const contentByStep = {
    1: {
      title: "Why list your shop on Neargrab?",
      bullets: [
        {
          icon: <Eye className="w-5 h-5 text-brand-900" />,
          heading: "Get Discovered",
          text: "Reach thousands of nearby customers actively looking for products like yours."
        },
        {
          icon: <TrendingUp className="w-5 h-5 text-brand-900" />,
          heading: "Increase Footfall",
          text: "More visibility means more walk-ins and more sales for your business."
        },
        {
          icon: <Award className="w-5 h-5 text-brand-900" />,
          heading: "Build Trust",
          text: "Show reviews, ratings and your best products to build trust in the community."
        },
        {
          icon: <Megaphone className="w-5 h-5 text-brand-900" />,
          heading: "Promote Easily",
          text: "Post offers, update stock and keep customers informed in just a few clicks."
        }
      ],
      illustration: (
        <svg viewBox="0 0 200 120" className="w-full h-auto mt-6">
          {/* Sky background */}
          <rect width="200" height="120" rx="16" fill="#F0FDF4" />
          
          {/* Ground */}
          <path d="M 0 100 Q 100 95 200 100 L 200 120 L 0 120 Z" fill="#DCFCE7" />
          
          {/* Store Body */}
          <rect x="50" y="50" width="100" height="50" rx="4" fill="#FFFFFF" stroke="#0B3B2C" strokeWidth="2" />
          
          {/* Shop Windows & Door */}
          <rect x="60" y="65" width="20" height="25" rx="2" fill="#E6F4EA" stroke="#0B3B2C" strokeWidth="1.5" />
          <rect x="120" y="65" width="20" height="25" rx="2" fill="#E6F4EA" stroke="#0B3B2C" strokeWidth="1.5" />
          <rect x="90" y="60" width="20" height="40" rx="2" fill="#F9FAFB" stroke="#0B3B2C" strokeWidth="1.5" />
          <circle cx="94" cy="80" r="1.5" fill="#0B3B2C" />
          
          {/* Awning (Stripes) */}
          <path d="M 45 42 L 155 42 L 150 55 L 50 55 Z" fill="#0B3B2C" />
          <path d="M 45 42 L 60 42 L 57 55 L 50 55 Z M 70 42 L 85 42 L 80 55 L 73 55 Z M 95 42 L 110 42 L 105 55 L 98 55 Z M 120 42 L 135 42 L 130 55 L 123 55 Z M 145 42 L 155 42 L 150 55 L 148 55 Z" fill="#10B981" />
          
          {/* Sign board */}
          <rect x="75" y="28" width="50" height="12" rx="2" fill="#F59E0B" stroke="#0B3B2C" strokeWidth="1.5" />
          <line x1="85" y1="34" x2="115" y2="34" stroke="#0B3B2C" strokeWidth="2" strokeLinecap="round" />
          
          {/* Decorative Trees */}
          <circle cx="30" cy="70" r="12" fill="#10B981" />
          <rect x="28" y="70" width="4" height="30" fill="#78350F" />
          
          <circle cx="170" cy="75" r="10" fill="#15795C" />
          <rect x="168" y="75" width="4" height="25" fill="#78350F" />
        </svg>
      )
    },
    2: {
      title: "Why accurate location matters",
      bullets: [
        {
          icon: <MapPin className="w-5 h-5 text-brand-900" />,
          heading: "Reach More Customers",
          text: "Appear in nearby searches and get discovered by local customers easily."
        },
        {
          icon: <Navigation className="w-5 h-5 text-brand-900" />,
          heading: "Accurate Directions",
          text: "Ensure customers get the exact route and distance directly to your storefront."
        },
        {
          icon: <ShieldCheck className="w-5 h-5 text-brand-900" />,
          heading: "Build Local Trust",
          text: "A physically verified location builds strong trust and brings more repeat visits."
        }
      ],
      illustration: (
        <svg viewBox="0 0 200 120" className="w-full h-auto mt-6">
          <rect width="200" height="120" rx="16" fill="#F0FDF4" />
          {/* Ground */}
          <path d="M 0 100 Q 100 95 200 100 L 200 120 L 0 120 Z" fill="#DCFCE7" />
          
          {/* Grid lines */}
          <line x1="20" y1="20" x2="180" y2="100" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="180" y1="20" x2="20" y2="100" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Radar Circles */}
          <circle cx="100" cy="60" r="40" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          <circle cx="100" cy="60" r="20" fill="none" stroke="#10B981" strokeWidth="1" />
          <circle cx="100" cy="60" r="4" fill="#10B981" />
          
          {/* Big Map Pin */}
          <g transform="translate(100, 60) scale(1)">
            <path d="M 0 0 C -12 -12 -12 -30 0 -30 C 12 -30 12 -12 0 0 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1.5" />
            <circle cx="0" cy="-18" r="5" fill="#FFFFFF" />
          </g>
          
          {/* Small Shop building next to it */}
          <rect x="25" y="60" width="30" height="25" rx="2" fill="#FFFFFF" stroke="#0B3B2C" strokeWidth="1.5" />
          <path d="M 20 60 L 40 48 L 60 60 Z" fill="#0B3B2C" />
        </svg>
      )
    },
    3: {
      title: "Stay connected, gain trust",
      bullets: [
        {
          icon: <Phone className="w-5 h-5 text-brand-900" />,
          heading: "Quick Response",
          text: "Answer customer queries faster and convert incoming leads into sales immediately."
        },
        {
          icon: <MessageSquare className="w-5 h-5 text-brand-900" />,
          heading: "Multiple Channels",
          text: "Support WhatsApp messaging, mobile calls, and digital email inquiries."
        },
        {
          icon: <TrendingUp className="w-5 h-5 text-brand-900" />,
          heading: "More Trust & Sales",
          text: "Verified phone numbers ensure transparency and reduce customer friction."
        }
      ],
      illustration: (
        <svg viewBox="0 0 200 120" className="w-full h-auto mt-6">
          <rect width="200" height="120" rx="16" fill="#F0FDF4" />
          {/* Phone Shell */}
          <rect x="75" y="15" width="50" height="90" rx="8" fill="#FFFFFF" stroke="#0B3B2C" strokeWidth="3" />
          <rect x="85" y="20" width="30" height="4" rx="2" fill="#E5E7EB" />
          
          {/* Chat bubbles */}
          <rect x="40" y="35" width="50" height="20" rx="6" fill="#0B3B2C" />
          <polygon points="80,55 85,58 83,50" fill="#0B3B2C" />
          <line x1="50" y1="45" x2="80" y2="45" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          
          <rect x="110" y="60" width="50" height="20" rx="6" fill="#E6F4EA" stroke="#0B3B2C" strokeWidth="1" />
          <polygon points="120,80 115,83 117,75" fill="#E6F4EA" />
          <polygon points="120,80 115,83 117,75" fill="none" stroke="#0B3B2C" strokeWidth="1" />
          <line x1="120" y1="70" x2="150" y2="70" stroke="#0B3B2C" strokeWidth="2" strokeLinecap="round" />
          
          <circle cx="100" cy="93" r="4" fill="#0B3B2C" />
        </svg>
      )
    },
    4: {
      title: "Build credibility, attract customers",
      bullets: [
        {
          icon: <ShieldCheck className="w-5 h-5 text-brand-900" />,
          heading: "Verified Shop Badge",
          text: "Verified shops stand out in the search listing and earn double user engagement."
        },
        {
          icon: <FileText className="w-5 h-5 text-brand-900" />,
          heading: "Share Key Details",
          text: "Spoken languages, digital payment UPIs and clear photos elevate conversion."
        },
        {
          icon: <CheckCircle2 className="w-5 h-5 text-brand-900" />,
          heading: "Secure Verification",
          text: "Safe and swift processing guarantees maximum data privacy for your license details."
        }
      ],
      illustration: (
        <svg viewBox="0 0 200 120" className="w-full h-auto mt-6">
          <rect width="200" height="120" rx="16" fill="#F0FDF4" />
          {/* Shield */}
          <path d="M 100 25 C 130 25 140 35 140 60 C 140 85 100 100 100 100 C 100 100 60 85 60 60 C 60 35 70 25 100 25 Z" fill="#FFFFFF" stroke="#0B3B2C" strokeWidth="3" />
          
          {/* Emerald Check inside Shield */}
          <path d="M 85 60 L 95 70 L 120 45" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Sparkles */}
          <path d="M 50 30 L 53 35 L 58 36 L 53 37 L 50 42 L 47 37 L 42 36 L 47 35 Z" fill="#FBBF24" />
          <path d="M 150 75 L 152 78 L 157 79 L 152 80 L 150 85 L 148 80 L 143 79 L 148 78 Z" fill="#FBBF24" />
        </svg>
      )
    },
    5: {
      title: "Almost there! Review and publish",
      bullets: [
        {
          icon: <CheckCircle2 className="w-5 h-5 text-brand-900" />,
          heading: "Review Everything",
          text: "Double-check your descriptions, addresses, hours and documents easily."
        },
        {
          icon: <FileText className="w-5 h-5 text-brand-900" />,
          heading: "Make Quick Changes",
          text: "Instantly navigate back to edit any section with modular step buttons."
        },
        {
          icon: <Megaphone className="w-5 h-5 text-brand-900" />,
          heading: "Go Live Instantly",
          text: "Launch your store catalog, and start serving nearby customers in real-time."
        }
      ],
      illustration: (
        <svg viewBox="0 0 200 120" className="w-full h-auto mt-6">
          <rect width="200" height="120" rx="16" fill="#F0FDF4" />
          <path d="M 0 100 Q 100 95 200 100 L 200 120 L 0 120 Z" fill="#DCFCE7" />
          
          {/* Rocket shooting up */}
          <g transform="translate(100, 50) rotate(-45)">
            <rect x="-10" y="-30" width="20" height="45" rx="6" fill="#FFFFFF" stroke="#0B3B2C" strokeWidth="2" />
            <path d="M -10 -30 Q 0 -45 10 -30 Z" fill="#EF4444" stroke="#0B3B2C" strokeWidth="2" />
            <path d="M -10 5 L -15 15 L -10 15 Z M 10 5 L 15 15 L 10 15 Z" fill="#EF4444" stroke="#0B3B2C" strokeWidth="2" />
            
            {/* Fire flame */}
            <path d="M -5 15 Q 0 30 5 15 Q 2 22 0 15 Z" fill="#F59E0B" />
          </g>
          
          {/* Confetti */}
          <circle cx="40" cy="30" r="2.5" fill="#EF4444" />
          <rect x="150" y="20" width="4" height="4" fill="#3B82F6" transform="rotate(45)" />
          <circle cx="160" cy="70" r="2" fill="#10B981" />
        </svg>
      )
    }
  };

  const currentContent = contentByStep[step] || contentByStep[1];

  return (
    <aside className="w-full bg-[#FAFAFA] border border-neutral-200/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
      <div className="text-left">
        <h3 className="text-base font-bold text-brand-900 font-poppins mb-6">
          {currentContent.title}
        </h3>

        <div className="flex flex-col gap-6">
          {currentContent.bullets.map((bullet, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-9 h-9 bg-[#E6F4EA] rounded-full flex items-center justify-center shrink-0 border border-brand-100/50">
                {bullet.icon}
              </div>
              <div className="flex flex-col text-left justify-start">
                <h4 className="text-xs font-bold text-text-primary font-poppins mb-0.5">
                  {bullet.heading}
                </h4>
                <p className="text-[10px] md:text-xs text-text-secondary leading-normal">
                  {bullet.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentContent.illustration}
    </aside>
  );
}
