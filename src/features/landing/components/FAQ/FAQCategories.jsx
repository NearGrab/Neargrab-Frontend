import React from 'react';
import { HelpCircle, ShoppingBag, Store } from 'lucide-react';
import content from '../../data/content.json';

const iconMap = {
  HelpCircle: HelpCircle,
  ShoppingBag: ShoppingBag,
  Store: Store,
};

export default function FAQCategories({ activeCategory, setActiveCategory, isSearchActive }) {
  const { faqs } = content;

  if (isSearchActive) return null; // Hide categories when active search filtering is in progress

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-12">
      {/* Scrollable Container on Mobile, Center Flex on Desktop */}
      <div className="flex gap-3 overflow-x-auto pb-3 md:pb-0 scrollbar-none justify-start md:justify-center -mx-4 px-4 md:mx-0 md:px-0">
        {faqs.categories.map((category) => {
          const IconComponent = iconMap[category.icon] || HelpCircle;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-medium text-sm md:text-base cursor-pointer shrink-0 transition-all duration-300 border ${isActive
                  ? 'bg-brand-900 text-white border-brand-900 shadow-md shadow-brand-900/10'
                  : 'bg-white text-text-secondary border-neutral-200 hover:border-brand-600 hover:text-brand-600'
                }`}
            >
              <IconComponent className={`w-5 h-5 shrink-0 ${isActive ? 'text-accent-500' : 'text-text-muted group-hover:text-brand-600'}`} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
