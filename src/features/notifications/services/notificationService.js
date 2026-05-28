import mockData from '../data/tempNotifications.json';

// In-memory cache to simulate API state mutation during the current browser session
let notificationsCache = [...mockData.notifications];
let preferencesCache = { ...mockData.preferences };

export const notificationService = {
  /**
   * Fetch all notifications, preference configuration, and recommendations
   */
  async getNotificationsData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          notifications: [...notificationsCache],
          preferences: { ...preferencesCache },
          recommended: [...mockData.recommended]
        });
      }, 150);
    });
  },

  /**
   * Mark all unread notifications as read
   */
  async markAllAsRead() {
    return new Promise((resolve) => {
      setTimeout(() => {
        notificationsCache = notificationsCache.map(item => ({
          ...item,
          read: true
        }));
        resolve([...notificationsCache]);
      }, 100);
    });
  },

  /**
   * Toggle a specific preference parameter
   */
  async togglePreference(key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (preferencesCache[key] !== undefined) {
          preferencesCache[key] = !preferencesCache[key];
        }
        resolve({ ...preferencesCache });
      }, 80);
    });
  }
};
