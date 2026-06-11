import apiClient from '../../../shared/services/apiClient';

export const shopkeeperDashboardService = {
  getDashboardData: async () => {
    const res = await apiClient.get('/shopkeeper/dashboard');
    return res; // Return response which contains success and data
  }
};
