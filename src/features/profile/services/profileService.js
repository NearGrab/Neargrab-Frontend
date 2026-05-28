import tempProfileData from '../data/tempProfile.json';

/**
 * Service mock simulating API requests to query customer profile data, reviews, and metrics.
 */
export const profileService = {
  /**
   * Fetches all customer profile dashboard models.
   * @returns {Promise<typeof tempProfileData>}
   */
  async getProfileData() {
    return new Promise((resolve) => {
      // Simulate real-time network latency (200ms)
      setTimeout(() => {
        resolve(tempProfileData);
      }, 200);
    });
  }
};
