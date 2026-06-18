import { useState, useEffect } from 'react';
import apiClient from '../shared/services/apiClient';

const listeners = new Set();

const getInitialCity = () => {
  const localCity = localStorage.getItem('neargrab_preferred_city');
  if (localCity) return localCity;
  try {
    const user = JSON.parse(localStorage.getItem('neargrab_user') || 'null');
    if (user?.preferredCity) {
      localStorage.setItem('neargrab_preferred_city', user.preferredCity);
      return user.preferredCity;
    }
  } catch (e) {}
  return '';
};

let globalState = {
  location: {
    city: getInitialCity(),
    state: 'Gujarat',
    radius: 'Within 3 km',
    coordinates: { lat: 20.9467, lng: 72.9520 } // default coordinates
  }
};

const setGlobalState = (nextState) => {
  globalState = { ...globalState, ...nextState };
  listeners.forEach((listener) => listener(globalState));
};

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

  const setLocation = async (city, stateName = 'Gujarat', radius = 'Within 3 km') => {
    localStorage.setItem('neargrab_preferred_city', city);
    
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

    // Synchronize to the backend if logged in
    try {
      const accessToken = localStorage.getItem('neargrab_access_token');
      if (accessToken) {
        const response = await apiClient.patch('/api/v1/me', {
          preferredCity: city
        });
        if (response.data) {
          localStorage.setItem('neargrab_user', JSON.stringify(response.data));
        }
      }
    } catch (error) {
      console.error('Failed to sync preferredCity to backend:', error);
    }
  };

  return {
    ...state,
    setRadius,
    setLocation
  };
}
