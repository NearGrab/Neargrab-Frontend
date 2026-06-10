import apiClient from '../../../shared/services/apiClient';
import mockData from '../data/tempNotifications.json';

export const notificationService = {
  /**
   * Fetch all notifications, preference configuration, and recommendations
   */
  async getNotificationsData() {
    try {
      const [notifsRes, prefsRes] = await Promise.all([
        apiClient.get('/api/v1/notifications'),
        apiClient.get('/api/v1/notifications/preferences')
      ]);

      // Map backend notifications to frontend expected format
      const notifications = (notifsRes?.data || []).map(n => ({
        id: n.id,
        userInitials: n.title ? n.title.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'NG',
        userName: n.title || 'Neargrab Alert',
        type: n.type === 'SHOP' || n.type === 'PRODUCT' ? 'alerts' : n.type === 'REVIEW' ? 'likes' : 'follows',
        title: n.title,
        description: n.message,
        time: n.timeAgo || new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dateGroup: n.dateGroup || 'Today',
        read: !!n.readAt
      }));

      // Map backend ui preferences to frontend structure
      const backendPrefs = prefsRes?.data?.ui || {};
      const preferences = {
        push: backendPrefs.push ?? true,
        email: backendPrefs.email ?? true,
        follows: backendPrefs.follows ?? true,
        follow: backendPrefs.follows ?? true,
        likes: backendPrefs.likes ?? true,
        alerts: backendPrefs.alerts ?? true
      };

      return {
        notifications,
        preferences,
        recommended: mockData.recommended
      };
    } catch (err) {
      console.warn('Failed to load notifications from backend, falling back to mock:', err);
      return {
        notifications: mockData.notifications,
        preferences: mockData.preferences,
        recommended: mockData.recommended
      };
    }
  },

  /**
   * Mark all unread notifications as read
   */
  async markAllAsRead() {
    try {
      await apiClient.patch('/api/v1/notifications/read-all');
      const data = await this.getNotificationsData();
      return data.notifications;
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      return mockData.notifications.map(item => ({ ...item, read: true }));
    }
  },

  /**
   * Toggle a specific preference parameter
   */
  async togglePreference(key) {
    try {
      const backendKey = key === 'follow' ? 'follows' : key;
      const data = await this.getNotificationsData();
      const nextVal = !data.preferences[key];

      const res = await apiClient.patch('/api/v1/notifications/preferences', {
        key: backendKey,
        enabled: nextVal
      });

      const backendPrefs = res?.data?.ui || {};
      return {
        push: backendPrefs.push ?? true,
        email: backendPrefs.email ?? true,
        follows: backendPrefs.follows ?? true,
        follow: backendPrefs.follows ?? true,
        likes: backendPrefs.likes ?? true,
        alerts: backendPrefs.alerts ?? true
      };
    } catch (err) {
      console.error('Failed to toggle notification preference:', err);
      return mockData.preferences;
    }
  }
};
