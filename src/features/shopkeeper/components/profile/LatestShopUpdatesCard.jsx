import React from 'react';

export default function LatestShopUpdatesCard({ updates = [], onViewAll }) {
  // Grab top 3 updates for the sidebar mini list
  const miniList = updates.slice(0, 3);

  return (
    <div className="w-full bg-white border border-neutral-100/85 rounded-2xl p-4 shadow-3xs text-left font-inter flex flex-col gap-3.5 select-none animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
          Latest Updates
        </h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[10px] md:text-xs font-bold text-brand-900 hover:underline cursor-pointer"
          >
            View all
          </button>
        )}
      </div>

      {/* Mini postings Feed */}
      <div className="flex flex-col gap-3">
        {miniList.map((item) => (
          <div key={item.id} className="flex gap-2.5 items-start text-left group">
            
            {/* Attachment preview */}
            {item.image && (
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 shrink-0 shadow-3xs">
                <img src={item.image} alt="Update" className="w-full h-full object-cover group-hover:scale-103 transition-transform" />
              </div>
            )}

            {/* Announcement blurb */}
            <div className="min-w-0 flex-grow text-left">
              <span className="text-[10px] md:text-[11px] font-bold text-text-secondary line-clamp-2 leading-tight">
                {item.title}
              </span>
              <span className="text-[8px] text-text-muted font-bold block mt-1">
                {item.dateRelative}
              </span>
            </div>

          </div>
        ))}

        {miniList.length === 0 && (
          <div className="text-center py-4 text-text-muted font-bold text-[10px]">
            📢 No recent updates active
          </div>
        )}
      </div>

    </div>
  );
}
