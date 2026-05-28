import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import content from '../../data/content.json';

export default function FAQContact() {
  const { faqs } = content;
  const { contact } = faqs;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-64 md:mb-80">
      <div className="bg-brand-900 rounded-[2.5rem] py-8 px-6 md:p-12 text-center relative overflow-hidden shadow-xl shadow-brand-900/10 border border-brand-800">
        {/* Subtle Decorative Gradient Blurs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Avatar Stack illustration or Support Badge */}
          <div className="flex justify-center -space-x-2 mb-6">
            <div className="w-12 h-12 rounded-full border-2 border-brand-900 bg-emerald-100 flex items-center justify-center font-bold text-brand-900 text-sm">
              AR
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-brand-900 bg-amber-100 flex items-center justify-center font-bold text-amber-900 text-sm">
              JD
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-brand-900 bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-sm">
              SP
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-poppins font-bold text-white mb-3">
            {contact.heading}
          </h2>

          {/* Description */}
          <p className="text-brand-100 text-sm md:text-base mb-8 leading-relaxed">
            {contact.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="w-full sm:w-auto bg-white text-brand-900 px-8 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-98 transition-all cursor-pointer shadow-lg shadow-black/5"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>{contact.button}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="w-full sm:w-auto bg-transparent border border-brand-600 hover:border-brand-500 text-white px-8 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-accent-400" />
              <span>{contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
