import { useState, useEffect } from 'react';
import { supabase } from '../shared/services/supabase';
import { authService } from '../features/auth/services/authService';
import apiClient from '../shared/services/apiClient';

const listeners = new Set();
let globalState = {
  user: JSON.parse(localStorage.getItem('neargrab_user') || 'null'),
  accessToken: localStorage.getItem('neargrab_access_token') || null,
  refreshToken: localStorage.getItem('neargrab_refresh_token') || null,
  isAuthenticated: !!localStorage.getItem('neargrab_access_token'),
  isLoading: false,
  error: null,
  hasHydrated: false
};

const setGlobalState = (nextState) => {
  globalState = { ...globalState, ...nextState };
  listeners.forEach((listener) => listener(globalState));
};

// Handle global 401 unauthorization events from apiClient
apiClient.onUnauthorized = () => {
  clearSession();
  setGlobalState({
    error: 'Session expired. Please log in again.'
  });
};

const clearSession = () => {
  localStorage.removeItem('neargrab_access_token');
  localStorage.removeItem('neargrab_refresh_token');
  localStorage.removeItem('neargrab_user');
  setGlobalState({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    hasHydrated: true
  });
};

// Singleton Supabase auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    setGlobalState({ isLoading: true });
    try {
      // Store token immediately to avoid race conditions on initial api calls
      localStorage.setItem('neargrab_access_token', session.access_token);
      if (session.refresh_token) {
        localStorage.setItem('neargrab_refresh_token', session.refresh_token);
      }

      // Sync or fetch profile details from our backend (token will be sent in headers by apiClient)
      const user = await authService.getMe();
      localStorage.setItem('neargrab_user', JSON.stringify(user));
      
      setGlobalState({
        user,
        accessToken: session.access_token,
        refreshToken: session.refresh_token || localStorage.getItem('neargrab_refresh_token'),
        isAuthenticated: true,
        isLoading: false,
        hasHydrated: true,
        error: null
      });
    } catch (err) {
      console.error('Session sync verification failed:', err);
      clearSession();
      setGlobalState({
        error: 'Authentication synchronization failed. Please try again.'
      });
    }
  } else {
    clearSession();
  }
});

export const loadCurrentUser = async () => {
  setGlobalState({ isLoading: true });
  try {
    const user = await authService.getMe();
    setGlobalState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
    localStorage.setItem('neargrab_user', JSON.stringify(user));
    return user;
  } catch (err) {
    setGlobalState({ isLoading: false });
    throw err;
  }
};

export function useAuthStore() {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    listeners.add(setState);
    
    // If Supabase has already determined the session is loaded, mark as hydrated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !globalState.hasHydrated) {
        setGlobalState({ hasHydrated: true });
      }
    });

    return () => {
      listeners.delete(setState);
    };
  }, []);

  const login = async (email, password) => {
    setGlobalState({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return true;
    } catch (err) {
      setGlobalState({
        isLoading: false,
        error: err.message || 'Login failed'
      });
      return false;
    }
  };

  const signup = async (fullName, username, email, password) => {
    setGlobalState({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username
          }
        }
      });
      if (error) throw error;
      return true;
    } catch (err) {
      setGlobalState({
        isLoading: false,
        error: err.message || 'Registration failed'
      });
      return false;
    }
  };

  const googleLogin = async () => {
    setGlobalState({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/explore'
        }
      });
      if (error) throw error;
      return true;
    } catch (err) {
      setGlobalState({
        isLoading: false,
        error: err.message || 'Google Sign-In failed'
      });
      return false;
    }
  };

  const logout = async () => {
    setGlobalState({ isLoading: true });
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      clearSession();
    }
  };

  const logoutAll = async () => {
    setGlobalState({ isLoading: true });
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.error('Logout all request failed:', err);
    } finally {
      clearSession();
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (err) {
      clearSession();
      throw err;
    }
  };

  const setSession = (data) => {
    // Legacy support for manually setting session if needed (e.g. from local mocks)
    localStorage.setItem('neargrab_access_token', data.accessToken);
    if (data.refreshToken) {
      localStorage.setItem('neargrab_refresh_token', data.refreshToken);
    }
    localStorage.setItem('neargrab_user', JSON.stringify(data.user));
    setGlobalState({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || localStorage.getItem('neargrab_refresh_token'),
      isAuthenticated: true,
      isLoading: false,
      error: null,
      hasHydrated: true
    });
  };

  const updateUserLocally = (updatedUser) => {
    localStorage.setItem('neargrab_user', JSON.stringify(updatedUser));
    setGlobalState({
      user: updatedUser
    });
  };

  return {
    ...state,
    login,
    signup,
    googleLogin,
    logout,
    logoutAll,
    refreshSession,
    loadCurrentUser,
    setSession,
    clearSession,
    updateUserLocally
  };
}
