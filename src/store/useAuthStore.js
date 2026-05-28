import { useState, useEffect } from 'react';

// Reactive listeners subscription deck for a true global state behavior without external libraries
const listeners = new Set();
let globalState = {
  user: JSON.parse(localStorage.getItem('neargrab_user') || 'null'),
  isAuthenticated: !!localStorage.getItem('neargrab_user'),
  isLoading: false,
  error: null
};

const setGlobalState = (nextState) => {
  globalState = { ...globalState, ...nextState };
  listeners.forEach((listener) => listener(globalState));
};

/**
 * A highly professional reactive Auth Store hook.
 * Mimics a Zustand-like reactive global state model cleanly.
 */
export function useAuthStore() {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const login = async (usernameOrEmail, password) => {
    setGlobalState({ isLoading: true, error: null });
    
    // Simulate minor network validation latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock verification
    if (!usernameOrEmail || !password) {
      setGlobalState({ isLoading: false, error: 'Please enter valid credentials' });
      return false;
    }

    const mockUser = {
      name: 'Rahul Patel',
      username: usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail,
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@example.com`,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      location: {
        city: 'Navsari',
        state: 'Gujarat',
        radius: 'Within 3 km'
      }
    };

    localStorage.setItem('neargrab_user', JSON.stringify(mockUser));
    setGlobalState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
    return true;
  };

  const signup = async (fullName, username, email, password) => {
    setGlobalState({ isLoading: true, error: null });

    // Simulate minor network validation latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!fullName || !username || !email || !password) {
      setGlobalState({ isLoading: false, error: 'All fields are required' });
      return false;
    }

    const mockUser = {
      name: fullName,
      username: username,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      location: {
        city: 'Navsari',
        state: 'Gujarat',
        radius: 'Within 3 km'
      }
    };

    localStorage.setItem('neargrab_user', JSON.stringify(mockUser));
    setGlobalState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('neargrab_user');
    setGlobalState({
      user: null,
      isAuthenticated: false,
      error: null
    });
  };

  return {
    ...state,
    login,
    signup,
    logout
  };
}
