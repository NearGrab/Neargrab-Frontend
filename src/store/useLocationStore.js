import { useState, useEffect } from 'react';

const listeners = new Set();
let globalState = {
  location: {
    city: 'Navsari',
    state: 'Gujarat',
    radius: 'Within 3 km',
    coordinates: { lat: 20.9467, lng: 72.9520 } // Coordinates of Navsari
  }
};

const setGlobalState = (nextState) => {
  globalState = { ...globalState, ...nextState };
  listeners.forEach((listener) => listener(globalState));
};

/**
 * A professional reactive Location Store hook.
 * Allows components to reactively read/write current location settings.
 */
export function useLocationStore() {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const setRadius = (radius) => {
    setGlobalState({
      location: {
        ...globalState.location,
        radius
      }
    });
  };

  const setLocation = (city, stateName, radius = 'Within 3 km') => {
    setGlobalState({
      location: {
        city,
        state: stateName,
        radius,
        coordinates: city === 'Navsari' 
          ? { lat: 20.9467, lng: 72.9520 }
          : { lat: 21.1702, lng: 72.8311 } // fallback/Surat coordinates
      }
    });
  };

  return {
    ...state,
    setRadius,
    setLocation
  };
}
