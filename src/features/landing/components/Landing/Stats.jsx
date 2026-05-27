import React from 'react';
import { Store, Users, Package, MapPin } from 'lucide-react';
import content from '../data/content.json';

export default function Stats() {
  const { stats } = content;
  
  // Map icons to the imported JSON data (since icons can't be in JSON)
  const statsIcons = [
    <Store className="w-8 h-8 text-emerald-600" />,
    <Users className="w-8 h-8 text-blue-600" />,
    <Package className="w-8 h-8 text-amber-600" />,
    <MapPin className="w-8 h-8 text-orange-600" />
  ];
  
  const statsBgColors = [
    "bg-emerald-100",
    "bg-blue-100",
    "bg-amber-100",
    "bg-orange-100"
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-[90rem] mx-auto border-t border-b border-gray-100 bg-white">
      <div className="text-center mb-12">
        <span className="text-emerald-600 text-xs font-bold tracking-wider uppercase">{stats.tagline}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.items.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-4 justify-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${statsBgColors[idx]}`}>
              {statsIcons[idx]}
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-poppins font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
