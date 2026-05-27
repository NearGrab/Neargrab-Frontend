import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FAQHeader from '../components/FAQ/FAQHeader';
import FAQCategories from '../components/FAQ/FAQCategories';
import FAQAccordion from '../components/FAQ/FAQAccordion';
import FAQContact from '../components/FAQ/FAQContact';
import Footer from '../components/Footer';
import content from '../data/content.json';

export default function FAQsPage() {
  const { faqs } = content;
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on component mount for seamless route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter logic: active category items OR global keyword matching
  const getFilteredItems = () => {
    if (!searchQuery.trim()) {
      const category = faqs.categories.find((cat) => cat.id === activeCategory);
      return category ? category.items : [];
    }

    // Global Search across all categories
    const allItems = faqs.categories.flatMap((cat) => cat.items);
    const query = searchQuery.toLowerCase().trim();

    return allItems.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  };

  const filteredItems = getFilteredItems();
  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Header Hero Section with Search bar */}
        <FAQHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Category Tabs Filter */}
        <FAQCategories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isSearchActive={isSearchActive}
        />

        {/* Dynamic Accordion Questions */}
        <FAQAccordion items={filteredItems} searchQuery={searchQuery} />

        {/* Support Help outreach card */}
        <FAQContact />
      </main>

      {/* Footer Banner & Site links */}
      <Footer />
    </div>
  );
}
