import { useState, useEffect } from 'react';
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
  localStorage.removeItem('neargrab_access_token');
  localStorage.removeItem('neargrab_refresh_token');
  localStorage.removeItem('neargrab_user');
  setGlobalState({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: 'Session expired. Please log in again.',
    hasHydrated: true
  });
};

const initSession = async () => {
  const token = localStorage.getItem('neargrab_access_token');
  if (!token) {
    setGlobalState({ hasHydrated: true, isLoading: false, isAuthenticated: false });
    return;
  }

  setGlobalState({ isLoading: true });
  try {
    const user = await authService.getMe();
    setGlobalState({
      user,
      accessToken: token,
      refreshToken: localStorage.getItem('neargrab_refresh_token'),
      isAuthenticated: true,
      isLoading: false,
      hasHydrated: true
    });
  } catch (err) {
    console.error('Session boot verification failed:', err);
    // Clear local storage and update state
    localStorage.removeItem('neargrab_access_token');
    localStorage.removeItem('neargrab_refresh_token');
    localStorage.removeItem('neargrab_user');
    setGlobalState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: true
    });
  }
};

export function useAuthStore() {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    listeners.add(setState);

    // Auto-boot session verification on first hook instantiation
    if (!globalState.hasHydrated && !globalState.isLoading) {
      initSession();
    }

    return () => {
      listeners.delete(setState);
    };
  }, []);

  const login = async (usernameOrEmail, password) => {
    setGlobalState({ isLoading: true, error: null });
    try {
      const data = await authService.login({ email: usernameOrEmail, password });
      setSession(data);
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
      // Map fullName to name required by backend signup schema
      const data = await authService.signup({ name: fullName, username, email, password });
      setSession(data);
      return true;
    } catch (err) {
      setGlobalState({
        isLoading: false,
        error: err.message || 'Registration failed'
      });
      return false;
    }
  };

  const googleLogin = async (payload) => {
    setGlobalState({ isLoading: true, error: null });
    try {
      const data = await authService.googleLogin(payload);
      setSession(data);
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
      await authService.logout();
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      clearSession();
    }
  };

  const logoutAll = async () => {
    setGlobalState({ isLoading: true });
    try {
      await authService.logoutAll();
    } catch (err) {
      console.error('Logout all request failed:', err);
    } finally {
      clearSession();
    }
  };

  const refreshSession = async () => {
    const token = localStorage.getItem('neargrab_refresh_token');
    if (!token) return null;
    try {
      const data = await authService.refresh(token);
      setSession(data);
      return data;
    } catch (err) {
      clearSession();
      throw err;
    }
  };

  const loadCurrentUser = async () => {
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

  const setSession = (data) => {
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
    clearSession
  };
}
