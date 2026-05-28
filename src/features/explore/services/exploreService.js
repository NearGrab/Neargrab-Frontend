import tempExploreData from '../data/temp.json';

/**
 * Service mock simulating API requests to query local items, shops, metrics, and reviews.
 */
export const exploreService = {
  /**
   * Fetches all home page explore dashboard content models.
   * @returns {Promise<typeof tempExploreData>}
   */
  async getExploreDashboardData() {
    return new Promise((resolve) => {
      // Simulate real-time network latency (200ms)
      setTimeout(() => {
        resolve(tempExploreData);
      }, 200);
    });
  }
};
