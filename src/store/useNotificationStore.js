import { useState, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';
import { notificationService } from '../features/notifications/services/notificationService';

const listeners = new Set();
let globalState = {
  notifications: [],
  unreadCount: 0,
  preferences: {},
  recommended: [],
  loading: false,
  fetched: false
};

let lastFetchedToken = null;

const setGlobalState = (nextState) => {
  globalState = {
    ...globalState,
    ...nextState
  };
  listeners.forEach((listener) => listener(globalState));
};

export function useNotificationStore() {
  const [state, setState] = useState(globalState);
  const { isAuthenticated } = useAuthStore();

  const fetchNotifications = async (force = false) => {
    const token = localStorage.getItem('neargrab_access_token');
    if (!token) {
      setGlobalState({
        notifications: [],
        unreadCount: 0,
        preferences: {},
        recommended: [],
        fetched: false
      });
      return;
    }

    if (!force && token === lastFetchedToken && globalState.fetched) {
      return;
    }

    setGlobalState({ loading: true });
    try {
      const data = await notificationService.getNotificationsData();
      const unreadCount = data.notifications.filter(n => !n.read).length;
      lastFetchedToken = token;
      setGlobalState({
        notifications: data.notifications,
        unreadCount,
        preferences: data.preferences,
        recommended: data.recommended,
        loading: false,
        fetched: true
      });
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setGlobalState({ loading: false });
    }
  };

  useEffect(() => {
    listeners.add(setState);

    if (isAuthenticated) {
      fetchNotifications();
    } else {
      setGlobalState({
        notifications: [],
        unreadCount: 0,
        preferences: {},
        recommended: [],
        fetched: false
      });
      lastFetchedToken = null;
    }

    return () => {
      listeners.delete(setState);
    };
  }, [isAuthenticated]);

  const markAllAsRead = async () => {
    try {
      const updatedList = await notificationService.markAllAsRead();
      setGlobalState({
        notifications: updatedList,
        unreadCount: 0
      });
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const togglePreference = async (key) => {
    try {
      const updatedPrefs = await notificationService.togglePreference(key);
      setGlobalState({
        preferences: updatedPrefs
      });
    } catch (err) {
      console.error('Failed to toggle notification preference:', err);
    }
  };

  const followToggle = (id) => {
    const updatedRecommended = globalState.recommended.map(item =>
      item.id === id ? { ...item, following: !item.following } : item
    );
    setGlobalState({
      recommended: updatedRecommended
    });
  };

  return {
    ...state,
    fetchNotifications,
    markAllAsRead,
    togglePreference,
    followToggle
  };
}
