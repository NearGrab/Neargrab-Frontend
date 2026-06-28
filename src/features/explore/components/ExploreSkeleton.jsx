import React from 'react';
import Navbar from '../../../shared/components/layout/Navbar';

export default function ExploreSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Grid Wrapper */}
      <main className="flex-grow max-w-[115rem] w-full mx-auto px-4 md:px-8 py-6 md:py-10 mb-24 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Skeleton */}
          <div className="lg:col-span-9 flex flex-col gap-8 w-full overflow-hidden">
            
            {/* HeroBanner Skeleton */}
            <div className="w-full h-44 md:h-64 bg-neutral-200 rounded-3xl" />

            {/* CategoriesGrid Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-5 w-32 bg-neutral-200 rounded-md" />
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-neutral-200" />
                    <div className="h-3 w-10 bg-neutral-100 rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            {/* ValueProps Skeleton */}
            <div className="hidden md:grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-20 bg-white border border-neutral-150 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-200 shrink-0" />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-3.5 w-1/2 bg-neutral-200 rounded-md" />
                    <div className="h-2.5 w-3/4 bg-neutral-100 rounded-md" />
                  </div>
                </div>
              ))}
            </div>

            {/* NearbyStores Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-5 w-40 bg-neutral-200 rounded-md" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="bg-white border border-neutral-150 rounded-3xl p-4 flex flex-col gap-4">
                    <div className="w-full h-32 bg-neutral-200 rounded-2xl" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-200 shrink-0" />
                      <div className="flex flex-col gap-2 w-full">
                        <div className="h-4 w-3/4 bg-neutral-200 rounded-md" />
                        <div className="h-3 w-1/2 bg-neutral-100 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TopPicks Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-5 w-28 bg-neutral-200 rounded-md" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="bg-white border border-neutral-150 rounded-2xl p-3 flex flex-col gap-3">
                    <div className="w-full h-32 bg-neutral-200 rounded-xl" />
                    <div className="h-3.5 w-3/4 bg-neutral-200 rounded-md" />
                    <div className="h-3 w-1/2 bg-neutral-100 rounded-md" />
                    <div className="flex justify-between items-center mt-2">
                      <div className="h-4 w-12 bg-neutral-200 rounded-md" />
                      <div className="w-7 h-7 rounded-lg bg-neutral-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar Skeleton */}
          <aside className="lg:col-span-3 w-full flex flex-col gap-6">
            
            {/* List Shop CTA Skeleton */}
            <div className="bg-white border border-neutral-150 rounded-3xl p-5 flex flex-col gap-3">
              <div className="h-4 w-1/2 bg-neutral-200 rounded-md" />
              <div className="h-3 w-full bg-neutral-100 rounded-md" />
              <div className="h-9 w-full bg-neutral-200 rounded-xl mt-2" />
            </div>

            {/* Offers/Promotions Skeleton */}
            <div className="bg-white border border-neutral-150 rounded-3xl p-5 flex flex-col gap-4">
              <div className="h-4 w-1/3 bg-neutral-200 rounded-md" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="h-20 bg-neutral-100 rounded-2xl" />
                ))}
              </div>
            </div>

            {/* Customer Reviews Skeleton */}
            <div className="bg-white border border-neutral-150 rounded-3xl p-5 flex flex-col gap-4">
              <div className="h-4 w-1/3 bg-neutral-200 rounded-md" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neutral-200" />
                      <div className="h-3 w-20 bg-neutral-200 rounded-md" />
                    </div>
                    <div className="h-2.5 w-full bg-neutral-100 rounded-md" />
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}
