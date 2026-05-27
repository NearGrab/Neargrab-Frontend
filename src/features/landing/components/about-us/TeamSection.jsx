import React from 'react';
import { Plus } from 'lucide-react';
import content from '../../data/content.json';

const memberThemes = [
  {
    banner: 'from-emerald-100 to-teal-50',
    ring: 'from-brand-500 via-emerald-400 to-teal-300',
    avatarBg: 'bg-emerald-50 text-brand-900 border-brand-200',
    roleColor: 'text-brand-600',
    stats: [
      { value: '10+', label: 'Partners' },
      { value: '5+', label: 'Years' },
      { value: '100K+', label: 'Reach' }
    ]
  },
  {
    banner: 'from-amber-100 to-orange-50',
    ring: 'from-amber-500 via-orange-400 to-yellow-300',
    avatarBg: 'bg-amber-50 text-amber-900 border-amber-200',
    roleColor: 'text-amber-600',
    stats: [
      { value: '50+', label: 'Repos' },
      { value: '6+', label: 'Years' },
      { value: '99.9%', label: 'Uptime' }
    ]
  },
  {
    banner: 'from-blue-100 to-indigo-50',
    ring: 'from-blue-500 via-indigo-400 to-purple-300',
    avatarBg: 'bg-blue-50 text-blue-900 border-blue-200',
    roleColor: 'text-blue-600',
    stats: [
      { value: '30+', label: 'Projects' },
      { value: '4+', label: 'Years' },
      { value: '98%', label: 'NPS' }
    ]
  }
];

export default function TeamSection() {
  const { about } = content;
  const { team } = about;

  return (
    <section className="pt-24 pb-48 md:pb-64 px-6 md:px-8 bg-neutral-50 border-t border-neutral-100 mb-24 md:mb-32">
      <div className="max-w-[90rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-brand-600 text-xs font-bold tracking-widest uppercase mb-3 block">
            {team.tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-text-primary mb-4">
            {team.heading}
          </h2>
          <p className="text-text-secondary text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {team.description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.members.map((member, idx) => {
            const theme = memberThemes[idx];
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-[2rem] border border-neutral-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden text-center"
              >
                {/* 1. Banner Header */}
                <div className={`h-32 w-full bg-gradient-to-tr ${theme.banner} relative rounded-t-[2rem]`}>
                  {/* Floating Action Button */}
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-neutral-700 hover:text-brand-900 transition-colors duration-200 cursor-pointer focus:outline-none">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Boundary-Overlapping Circular Avatar */}
                <div className={`relative -mt-12 mb-4 w-24 h-24 rounded-full mx-auto p-[3px] bg-gradient-to-tr ${theme.ring} shadow-md transition-transform duration-300 group-hover:scale-105`}>
                  <div className={`w-full h-full rounded-full ${theme.avatarBg} border-2 border-white flex items-center justify-center font-poppins font-bold text-2xl shadow-inner`}>
                    {member.initials}
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="px-6 pb-6 pt-2 flex flex-col flex-grow items-center">
                  {/* Name */}
                  <h3 className="font-poppins font-bold text-text-primary text-xl mb-1 transition-colors duration-200 group-hover:text-brand-900">
                    {member.name}
                  </h3>

                  {/* Role Sub-heading */}
                  <span className={`${theme.roleColor} font-semibold text-xs uppercase tracking-wider mb-3`}>
                    {member.role}
                  </span>

                  {/* Description/Bio */}
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[240px] mx-auto mb-6 flex-grow">
                    {member.bio}
                  </p>

                  {/* 3. Stats Counter block */}
                  <div className="w-full bg-neutral-50/80 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-2 border border-neutral-100/50">
                    {theme.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col items-center">
                        <span className="font-poppins font-bold text-text-primary text-sm md:text-base leading-none mb-1">
                          {stat.value}
                        </span>
                        <span className="text-[9px] text-text-secondary font-semibold tracking-widest uppercase leading-none">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 4. Footer Social Icons */}
                  <div className="w-full flex justify-center gap-5 border-t border-neutral-100 pt-5 mt-auto">
                    <a
                      href={member.social.linkedin}
                      className="text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
                      title={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
                      title={`${member.name} on Twitter`}
                    >
                      <TwitterIcon className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href={member.social.github}
                      className="text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
                      title={`${member.name} on GitHub`}
                    >
                      <GitHubIcon className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Inline Social Icon Components
function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

