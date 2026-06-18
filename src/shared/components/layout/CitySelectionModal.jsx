import React from 'react';
import Modal from '../ui/Modal';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLocationStore } from '../../../store/useLocationStore';

const CITIES = [
  { name: 'Surat', description: 'The Diamond City of India', count: '120+ Shops' },
  { name: 'Navsari', description: 'The Twin City near Dandi', count: '45+ Shops' },
  { name: 'Bardoli', description: 'The Hub of Sugar and Satyagraha', count: '30+ Shops' },
  { name: 'Vyara', description: 'The Gateway to Eastern Hills', count: '15+ Shops' }
];

export default function CitySelectionModal({ isOpen, onClose, forceSelect = false }) {
  const { setLocation, location } = useLocationStore();

  const handleSelect = (city) => {
    setLocation(city);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={forceSelect ? () => {} : onClose}
      title={forceSelect ? "Select Your City to Continue" : "Switch City"}
      showCloseButton={!forceSelect}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-4 text-center">
        {forceSelect && (
          <div className="flex flex-col items-center mb-2">
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-3 text-primary-500 animate-bounce">
              <MapPin className="w-8 h-8" />
            </div>
            <p className="text-sm text-neutral-500 font-poppins">
              Welcome to Neargrab! We filter shopkeeper offerings and product discovery by city. Please choose a preferred city to get started.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2 text-left">
          {CITIES.map((city) => {
            const isSelected = location?.city?.toLowerCase() === city.name.toLowerCase();
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelect(city.name)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all duration-300 group ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/40 shadow-sm'
                    : 'border-neutral-200/80 hover:border-primary-300 hover:bg-neutral-50/50 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isSelected ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-500 group-hover:bg-primary-50 group-hover:text-primary-500'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 text-sm md:text-base font-poppins flex items-center gap-2">
                      {city.name}
                      {isSelected && (
                        <span className="text-xs bg-primary-100 text-primary-700 font-medium px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5 font-poppins">
                      {city.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 font-medium font-poppins">
                    {city.count}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    isSelected ? 'text-primary-500' : 'text-neutral-300 group-hover:translate-x-1 group-hover:text-primary-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
