import { shopProfileMockData } from '../data/shopProfileMockData';

/**
 * Simple asynchronous network client to manage Shop Profile API updates.
 * Decouples presentation layers from backend networking for clean server migrations later.
 */
export const shopProfileService = {
  /**
   * Fetch full shop profile details.
   * @returns {Promise<Object>}
   */
  getShopProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...shopProfileMockData });
      }, 500);
    });
  },

  /**
   * Save updated profile details.
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  updateProfile: async (data) => {
    console.log('[API] Saving updated shop profile data...', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Profile updated successfully' });
      }, 600);
    });
  },

  /**
   * Fetch customer ratings reviews.
   * @returns {Promise<Array>}
   */
  getReviews: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...shopProfileMockData.reviews]);
      }, 400);
    });
  },

  /**
   * Fetch live listed products.
   * @returns {Promise<Array>}
   */
  getProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...shopProfileMockData.products]);
      }, 400);
    });
  },

  /**
   * Fetch relative announcements updates.
   * @returns {Promise<Array>}
   */
  getUpdates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...shopProfileMockData.updates]);
      }, 300);
    });
  }
};

export default shopProfileService;
