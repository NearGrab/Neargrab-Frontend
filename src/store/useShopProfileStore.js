import { create } from 'zustand';
import { shopProfileMockData } from '../features/shop/data/shopProfileMockData';

export const useShopProfileStore = create((set) => ({
  // Initialize state from mock database
  shopInfo: { ...shopProfileMockData.shopInfo },
  timings: { ...shopProfileMockData.timings },
  paymentMethods: { ...shopProfileMockData.paymentMethods },
  socialLinks: { ...shopProfileMockData.socialLinks },
  products: [...shopProfileMockData.products],
  reviews: [...shopProfileMockData.reviews],
  updates: [...shopProfileMockData.updates],
  photos: [...shopProfileMockData.photos],

  // Actions
  updateShopInfo: (info) =>
    set((state) => ({
      shopInfo: { ...state.shopInfo, ...info }
    })),

  updateTimings: (timingData) =>
    set((state) => ({
      timings: { ...state.timings, ...timingData }
    })),

  updatePayments: (paymentsData) =>
    set((state) => ({
      paymentMethods: { ...state.paymentMethods, ...paymentsData }
    })),

  updateSocials: (socialData) =>
    set((state) => ({
      socialLinks: { ...state.socialLinks, ...socialData }
    })),

  addUpdate: (newPost) =>
    set((state) => {
      const created = {
        id: 'upd_' + Date.now(),
        title: newPost.title,
        type: newPost.type || 'new_arrival',
        dateRelative: 'Just now',
        image: newPost.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
      };
      return { updates: [created, ...state.updates] };
    }),

  addPhoto: (src, type = 'inside') =>
    set((state) => {
      const newImg = {
        id: 'img_' + Date.now(),
        src,
        type
      };

      // If we are setting a cover or logo, update shopInfo reactively too
      if (type === 'cover') {
        state.updateShopInfo({ coverImage: src });
      } else if (type === 'logo') {
        state.updateShopInfo({ logo: src });
      }

      return { photos: [...state.photos, newImg] };
    }),

  deletePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id)
    })),

  toggleProductStock: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, stockAvailable: !p.stockAvailable } : p
      )
    })),

  resetProfile: () =>
    set({
      shopInfo: { ...shopProfileMockData.shopInfo },
      timings: { ...shopProfileMockData.timings },
      paymentMethods: { ...shopProfileMockData.paymentMethods },
      socialLinks: { ...shopProfileMockData.socialLinks },
      products: [...shopProfileMockData.products],
      reviews: [...shopProfileMockData.reviews],
      updates: [...shopProfileMockData.updates],
      photos: [...shopProfileMockData.photos]
    })
}));

export default useShopProfileStore;
