import apiClient from '../../../shared/services/apiClient';

/**
 * Generate a cryptographically secure random UUID or fallback to high-entropy random string.
 */
function generateUUID() {
  try {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
  } catch (e) {
    // Fallback if randomUUID is not supported
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Retrieve or initialize a persistent, unique visitor ID for this device.
 */
function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('neargrab_visitor_id');
  if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem('neargrab_visitor_id', visitorId);
  }
  return visitorId;
}

export const analyticsService = {
  /**
   * Send page visit analytics event to the backend.
   */
  async trackVisit(path) {
    try {
      const visitorId = getOrCreateVisitorId();
      
      // Fire-and-forget call to ensure page transition/rendering remains completely unaffected
      apiClient.post('/analytics/visit', {
        visitorId,
        path
      }).catch(err => {
        console.warn('Failed to record page visit analytics:', err);
      });
    } catch (err) {
      console.warn('Error inside page visit tracking utility:', err);
    }
  }
};
