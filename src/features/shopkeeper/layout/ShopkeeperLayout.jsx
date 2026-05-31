import React, { useState } from 'react';
import Navbar from '../../../shared/components/layout/Navbar';
import ShopkeeperSidebar from './ShopkeeperSidebar';
import ShopkeeperHeader from './ShopkeeperHeader';

export default function ShopkeeperLayout({ children, rightSidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12 font-inter">
      {/* 1. Global Shared Customer Navbar */}
      <Navbar />

      {/* 2. Layout Wrapper Grid */}
      <div className="max-w-[115rem] w-full mx-auto px-4 md:px-6 mt-6 flex-grow flex flex-col gap-6 relative">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full relative">
          
          {/* LEFT SIDEBAR (Desktop) */}
          <aside className="hidden lg:block sticky top-24 self-start w-[280px] shrink-0">
            <ShopkeeperSidebar onClose={() => {}} />
          </aside>

          {/* LEFT SIDEBAR DRAWER (Mobile/Tablet overlays) */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-xs transition-opacity duration-300">
              <div className="w-[280px] bg-white h-full shadow-2xl p-5 relative animate-in slide-in-from-left duration-300">
                <ShopkeeperSidebar onClose={toggleSidebar} />
              </div>
              <div className="flex-grow" onClick={toggleSidebar} />
            </div>
          )}

          {/* CENTER WORKSPACE & RIGHT SIDEBAR SECTION */}
          <div className="flex-grow min-w-0 flex flex-col gap-6 w-full">
            {/* Mobile Header Toolbar */}
            <ShopkeeperHeader onMenuToggle={toggleSidebar} />

            <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
              {/* Dynamic Center Work Area */}
              <main className="bg-white border border-neutral-100/80 rounded-3xl p-4 md:p-6 shadow-2xs flex flex-col min-w-0 flex-grow w-full">
                {children}
              </main>

              {/* Collapsed/Tablet Right Sidebar (visible here on lg but hidden on xl, rendering below center content) */}
              {rightSidebar && (
                <div className="block xl:hidden w-full shrink-0">
                  {rightSidebar}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR (Desktop XL - 350px sticky) */}
          {rightSidebar && (
            <aside className="hidden xl:block sticky top-24 self-start w-[350px] shrink-0">
              {rightSidebar}
            </aside>
          )}

        </div>
      </div>
    </div>
  );
}
