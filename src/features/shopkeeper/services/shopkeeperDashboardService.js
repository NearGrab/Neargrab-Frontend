import { dashboardMockData } from '../data/dashboardMockData';

export const shopkeeperDashboardService = {
  getDashboardData: () => {
    return Promise.resolve(dashboardMockData);
  },
  getShopProfile: () => {
    return Promise.resolve(dashboardMockData.shopProfile);
  },
  getNavigation: () => {
    return Promise.resolve(dashboardMockData.navigation);
  },
  getStats: () => {
    return Promise.resolve(dashboardMockData.stats);
  },
  getPerformanceData: () => {
    return Promise.resolve(dashboardMockData.performanceData);
  },
  getLowStockProducts: () => {
    return Promise.resolve(dashboardMockData.lowStockProducts);
  },
  getRecentReviews: () => {
    return Promise.resolve(dashboardMockData.reviews);
  }
};
