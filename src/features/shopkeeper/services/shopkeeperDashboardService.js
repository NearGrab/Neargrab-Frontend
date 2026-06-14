import apiClient from '../../../shared/services/apiClient';

export const shopkeeperDashboardService = {
  getDashboardData: async () => {
    const res = await apiClient.get('/shopkeeper/dashboard');
    return res; // Return response which contains success and data
  },
  getReviews: async (page = 1, limit = 20) => {
    const res = await apiClient.get(`/shopkeeper/reviews?page=${page}&limit=${limit}`);
    return res;
  }
};
