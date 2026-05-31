import React, { useState, useRef } from 'react';
import { Megaphone, Calendar, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

export default function ShopUpdatesManager({
  updates = [],
  isManageMode = false,
  onAddUpdate
}) {
  const [isOpenCreator, setIsOpenCreator] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postType, setPostType] = useState('new_arrival');
  const [postImage, setPostImage] = useState('');
  
  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      alert('Please write an announcement text or title.');
      return;
    }
    if (onAddUpdate) {
      onAddUpdate({
        title: postTitle.trim(),
        type: postType,
        image: postImage
      });
      alert('Announcement successfully posted!');
      // Reset form
      setPostTitle('');
      setPostImage('');
      setIsOpenCreator(false);
    }
  };

  return (
    <div className="w-full text-left font-inter flex flex-col gap-5 bg-white border border-neutral-100/85 rounded-2xl p-5 shadow-3xs">
      
      {/* 1. Header toolbar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100/60 select-none">
        
        {/* Title */}
        <div>
          <h3 className="font-poppins font-bold text-xs md:text-sm text-text-primary uppercase tracking-wider">
            Store Announcements & Offers
          </h3>
          <span className="text-[10px] text-text-muted">
            {updates.length} postings active
          </span>
        </div>

        {/* Create Update Button (Shopkeeper only) */}
        {isManageMode && !isOpenCreator && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsOpenCreator(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 stroke-[2.5px]" />}
            className="font-bold text-[10px] md:text-xs h-8 cursor-pointer shadow-3xs"
          >
            Create Update
          </Button>
        )}

      </div>

      {/* 2. Collapsible Post Creator Form (Shopkeeper only) */}
      {isManageMode && isOpenCreator && (
        <form
          onSubmit={handleSubmitPost}
          className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/40 flex flex-col gap-3.5 shadow-3xs animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between select-none">
            <span className="font-poppins font-bold text-xs text-text-primary">
              Write New Announcement
            </span>
            <button
              type="button"
              onClick={() => setIsOpenCreator(false)}
              className="text-[10px] font-bold text-text-muted hover:text-text-primary cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {/* Announcement content input */}
          <textarea
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Write details... E.g., Fresh arrivals of organic Mangoes just stocked!"
            rows={2}
            className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs md:text-sm outline-hidden focus:border-brand-900/50 placeholder-text-muted/60 font-medium font-inter shadow-3xs"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 select-none">
            
            {/* Post Category/Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-text-muted">Tag:</span>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="appearance-none text-[10px] md:text-xs font-extrabold bg-white border border-neutral-200 rounded-lg px-2.5 py-1 outline-hidden cursor-pointer shadow-3xs"
              >
                <option value="new_arrival">✨ New Arrival</option>
                <option value="offer">🔥 Special Offer</option>
                <option value="stock_update">📦 Stock Update</option>
              </select>
            </div>

            {/* Photo Attachment upload */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleImageUploadClick}
                className="flex items-center gap-1 bg-white hover:bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-lg text-[10px] font-bold text-text-secondary transition-colors cursor-pointer shadow-3xs"
              >
                <ImageIcon className="w-3.5 h-3.5 text-text-muted" />
                <span>{postImage ? 'Change Image' : 'Attach Image'}</span>
              </button>
            </div>

          </div>

          {/* Image preview panel */}
          {postImage && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-neutral-200 relative shrink-0 select-none shadow-3xs">
              <img src={postImage} alt="Attachment" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Submit */}
          <Button
            variant="primary"
            size="sm"
            type="submit"
            className="w-full font-bold text-xs h-9 cursor-pointer shadow-3xs"
          >
            Post Announcement
          </Button>

        </form>
      )}

      {/* 3. Announcements List */}
      <div className="flex flex-col gap-3.5">
        {updates.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border border-neutral-150/50 hover:border-neutral-200 rounded-xl p-3.5 bg-neutral-50/20 shadow-3xs group transition-colors"
          >
            
            {/* Visual Icon container */}
            <div className="w-9 h-9 rounded-full bg-[#E6F4EA] flex items-center justify-center border border-brand-100/50 shadow-3xs shrink-0 select-none">
              {item.type === 'offer' ? (
                <Sparkles className="w-4 h-4 text-brand-900" />
              ) : (
                <Megaphone className="w-4 h-4 text-brand-900" />
              )}
            </div>

            {/* Post descriptions */}
            <div className="min-w-0 flex-grow text-left">
              
              {/* Category tag */}
              <span
                className={`font-extrabold text-[8px] px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1.5 inline-block select-none ${
                  item.type === 'offer'
                    ? 'bg-amber-50 text-amber-700 border border-amber-100/50'
                    : item.type === 'new_arrival'
                    ? 'bg-purple-50 text-purple-700 border border-purple-100/50'
                    : 'bg-blue-50 text-blue-700 border border-blue-100/50'
                }`}
              >
                {item.type === 'offer' ? 'Special Offer' : item.type === 'new_arrival' ? 'New Arrival' : 'Stock Update'}
              </span>

              {/* Title Content */}
              <p className="text-xs md:text-sm font-bold text-text-primary leading-normal pr-1 font-inter">
                {item.title}
              </p>

              {/* Date Metadata */}
              <div className="flex items-center gap-1 text-[9px] text-text-muted mt-2 select-none font-bold">
                <Calendar className="w-3 h-3 text-text-muted" />
                <span>{item.dateRelative}</span>
              </div>

            </div>

            {/* Attached Photo thumbnail */}
            {item.image && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-neutral-200 shrink-0 select-none shadow-3xs">
                <img src={item.image} alt="Update" className="w-full h-full object-cover" />
              </div>
            )}

          </div>
        ))}

        {updates.length === 0 && (
          <div className="text-center py-6 text-text-muted font-bold text-xs select-none">
            📢 No updates or offers posted recently.
          </div>
        )}
      </div>

    </div>
  );
}
