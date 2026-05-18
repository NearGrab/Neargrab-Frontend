import React from 'react';
import { Search, Store, MessageSquare, MapPin } from 'lucide-react';
import content from '../data/content.json';

export default function HowItWorks() {
  const { howItWorks } = content;
  
  // Map icons to the imported JSON data (since icons can't be in JSON)
  const stepIcons = [
    <Search className="w-10 h-10 text-emerald-500" />,
    <Store className="w-10 h-10 text-amber-500" />,
    <MessageSquare className="w-10 h-10 text-orange-500" />,
    <MapPin className="w-10 h-10 text-blue-500" />
  ];

  return (
    <section id="how-it-works" className="pt-24 pb-48 px-4 md:px-8 max-w-[90rem] mx-auto bg-gray-50">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">{howItWorks.heading}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          {howItWorks.description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative max-w-5xl mx-auto">
        {/* Connecting dashed line - Desktop only */}
        <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] border-t-2 border-dashed border-gray-300 -z-10"></div>
        
        {howItWorks.steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center max-w-[200px] mb-12 md:mb-0 relative bg-gray-50 pt-4 px-4 z-10">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mb-6 shadow-md absolute top-0 -translate-y-1/2">
              {step.number}
            </div>
            
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg shadow-black/5 mt-4">
              {stepIcons[idx]}
            </div>
            
            <h3 className="font-poppins font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            
            {/* Mobile connecting line */}
            {idx !== howItWorks.steps.length - 1 && (
              <div className="md:hidden h-12 border-l-2 border-dashed border-gray-300 my-4"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
