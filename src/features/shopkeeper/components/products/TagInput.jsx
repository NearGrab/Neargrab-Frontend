import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ tags = [], onAddTag, onRemoveTag }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = inputValue.trim().replace(/,$/, '');
      if (trimmed) {
        if (tags.length >= 5) {
          alert('Maximum of 5 tags allowed!');
          return;
        }
        if (tags.includes(trimmed)) {
          alert('Tag already exists!');
          return;
        }
        onAddTag(trimmed);
        setInputValue('');
      }
    }
  };

  const handleRemove = (tagToRemove) => {
    onRemoveTag(tagToRemove);
  };

  return (
    <div className="flex flex-col gap-2 w-full text-left font-inter">
      {/* Label and Counter */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] md:text-xs font-bold text-text-secondary font-poppins">
          Tags <span className="text-text-muted font-normal">(Optional)</span>
        </label>
        <span className="text-[10px] text-text-muted font-bold font-poppins">
          {tags.length} / 5
        </span>
      </div>

      {/* Input container */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={tags.length >= 5}
          placeholder={
            tags.length >= 5
              ? 'Maximum tags reached'
              : 'Press Enter or comma (,) to add tags'
          }
          className="w-full text-xs font-bold font-inter bg-[#F9FAFB] border border-neutral-200/80 rounded-xl px-3 py-2.5 outline-hidden focus:border-brand-900/50 focus:bg-white placeholder-text-muted/70 transition-all duration-300 disabled:opacity-50"
        />

        {/* Selected Tags list */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-[#E6F4EA] border border-[#12634B]/10 text-brand-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full select-none shadow-3xs"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(tag)}
                  className="hover:text-red-600 transition-colors focus:outline-hidden cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="text-[9px] text-text-muted">
        Add tags to help customers find your product easily (e.g. Atta, Gluten Free).
      </span>
    </div>
  );
}
