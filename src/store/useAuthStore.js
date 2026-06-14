import { useState, useEffect } from 'react';
import { supabase } from '../shared/services/supabase';
import { authService } from '../features/auth/services/authService';
import apiClient from '../shared/services/apiClient';

const listeners = new Set();
const initialProvider = localStorage.getItem('neargrab_auth_provider');
let globalState = {
  user: JSON.parse(localStorage.getItem('neargrab_user') || 'null'),
  accessToken: localStorage.getItem('neargrab_access_token') || null,
  refreshToken: localStorage.getItem('neargrab_refresh_token') || null,
  isAuthenticated: !!localStorage.getItem('neargrab_access_token'),
  isLoading: false,
  error: null,
  hasHydrated: initialProvider === 'local'
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
  localStorage.removeItem('neargrab_auth_provider');
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
      localStorage.setItem('neargrab_auth_provider', 'google');
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
    const provider = localStorage.getItem('neargrab_auth_provider');
    if (provider === 'google' || !provider) {
      clearSession();
    }
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

  const login = async (usernameOrEmail, password) => {
    setGlobalState({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email: usernameOrEmail, password });
      setSession(response);
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
      const response = await authService.signup({
        name: fullName,
        username,
        email,
        password
      });
      setSession(response);
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
      const provider = localStorage.getItem('neargrab_auth_provider');
      if (provider === 'google') {
        await supabase.auth.signOut();
      } else {
        await authService.logout();
      }
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      clearSession();
    }
  };

  const logoutAll = async () => {
    setGlobalState({ isLoading: true });
    try {
      const provider = localStorage.getItem('neargrab_auth_provider');
      if (provider === 'google') {
        await supabase.auth.signOut({ scope: 'global' });
      } else {
        await authService.logoutAll();
      }
    } catch (err) {
      console.error('Logout all request failed:', err);
    } finally {
      clearSession();
    }
  };

  const refreshSession = async () => {
    try {
      const provider = localStorage.getItem('neargrab_auth_provider');
      if (provider === 'google') {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
      } else {
        const localRefreshToken = localStorage.getItem('neargrab_refresh_token');
        if (!localRefreshToken) throw new Error('No refresh token');
        const response = await authService.refresh(localRefreshToken);
        setSession(response);
        return { access_token: response.accessToken, refresh_token: response.refreshToken };
      }
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
    localStorage.setItem('neargrab_auth_provider', 'local');
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
