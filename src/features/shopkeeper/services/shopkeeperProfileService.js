import apiClient from '../../../shared/services/apiClient';

/**
 * Service to fetch and update merchant shop profile configurations and timings.
 */
export const shopkeeperProfileService = {
  /**
   * Get authenticated merchant shop profile.
   * @returns {Promise<Object>}
   */
  getProfile: async () => {
    const res = await apiClient.get('/shopkeeper/profile');
    return res;
  },

  /**
   * Update shop profile details.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  updateProfile: async (data) => {
    const res = await apiClient.put('/shopkeeper/profile', data);
    return res;
  },

  /**
   * Get operating timings.
   * @returns {Promise<Object>}
   */
  getTimings: async () => {
    const res = await apiClient.get('/shopkeeper/profile/timings');
    return res;
  },

  /**
   * Update operating timings.
   * @param {Array} timings
   * @returns {Promise<Object>}
   */
  updateTimings: async (timings) => {
    const res = await apiClient.put('/shopkeeper/profile/timings', timings);
    return res;
  }
};

export default shopkeeperProfileService;
