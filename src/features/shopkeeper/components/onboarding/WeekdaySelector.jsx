import React from 'react';

export default function WeekdaySelector({ selectedDays = [], onChange }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };

  const handleSundayHolidayToggle = (e) => {
    if (e.target.checked) {
      onChange(selectedDays.filter((d) => d !== 'Sun'));
    } else {
      if (!selectedDays.includes('Sun')) {
        onChange([...selectedDays, 'Sun']);
      }
    }
  };

  const isSundayHoliday = !selectedDays.includes('Sun');

  return (
    <div className="w-full text-left">
      <label className="block text-xs font-bold text-text-primary mb-2 font-poppins">
        Open on
      </label>

      {/* Weekday pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {days.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all active:scale-95 cursor-pointer font-poppins border ${
                isSelected
                  ? 'bg-brand-900 border-brand-900 text-white shadow-sm'
                  : 'bg-white border-neutral-200 text-text-secondary hover:bg-neutral-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Mark Sunday as Holiday checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="sunday_holiday"
          type="checkbox"
          checked={isSundayHoliday}
          onChange={handleSundayHolidayToggle}
          className="w-4 h-4 text-brand-900 border-neutral-300 rounded focus:ring-brand-500 accent-brand-900 cursor-pointer"
        />
        <label htmlFor="sunday_holiday" className="text-xs font-bold text-text-secondary cursor-pointer select-none">
          Mark Sunday as Holiday
        </label>
      </div>
    </div>
  );
}
