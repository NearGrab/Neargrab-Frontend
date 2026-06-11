import { create } from 'zustand';
import { shopkeeperDashboardService } from '../features/shopkeeper/services/shopkeeperDashboardService';

export const useShopkeeperDashboardStore = create((set) => ({
  shopProfile: null,
  stats: [],
  performanceData: [],
  topActions: [],
  reviews: [],
  lowStockProducts: [],
  growthTips: [],
  qrPayload: '',
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await shopkeeperDashboardService.getDashboardData();
      if (res.success && res.data) {
        set({
          shopProfile: res.data.shopProfile || null,
          stats: res.data.stats || [],
          performanceData: res.data.performanceData || [],
          topActions: res.data.topActions || [],
          reviews: res.data.reviews || [],
          lowStockProducts: res.data.lowStockProducts || [],
          growthTips: res.data.growthTips || [],
          qrPayload: res.data.qrPayload || '',
          isLoading: false
        });
      } else {
        set({ error: 'Failed to retrieve dashboard data', isLoading: false });
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      set({ error: err.message || 'Failed to fetch dashboard data', isLoading: false });
    }
  }
}));
