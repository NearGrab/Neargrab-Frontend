import apiClient from '../../../shared/services/apiClient';

export const shopkeeperDashboardService = {
  getDashboardData: async () => {
    const res = await apiClient.get('/shopkeeper/dashboard');
    return res; // Return response which contains success and data
  },
  getReviews: async (page = 1, limit = 20) => {
    const res = await apiClient.get(`/shopkeeper/reviews?page=${page}&limit=${limit}`);
    return res;
  },
  getPromotions: async () => {
    const res = await apiClient.get('/shopkeeper/promotions');
    return res;
  },
  createPromotion: async (data) => {
    const res = await apiClient.post('/shopkeeper/promotions', data);
    return res;
  },
  getShopProfile: async () => {
    const res = await apiClient.get('/shop/me');
    return res;
  },
  updateShopProfile: async (data) => {
    const res = await apiClient.patch('/shop/me', data);
    return res;
  }
};
