import { create } from 'zustand';
import { shopkeeperProfileService } from '../features/shopkeeper/services/shopkeeperProfileService';
import { productCatalogService } from '../features/shopkeeper/services/productCatalogService';
import apiClient from '../shared/services/apiClient';
import { shopProfileMockData } from '../features/shop/data/shopProfileMockData';

const mapBackendProductToFrontend = (p) => ({
  id: p.id,
  name: p.name,
  sku: p.sku || '',
  category: p.category?.name || p.categoryName || 'General',
  price: (p.pricePaise || 0) / 100,
  mrp: (p.mrpPaise || 0) / 100,
  stockCount: p.stockCount || 0,
  stockAvailable: p.stockAvailable ?? (p.stockCount > 0),
  image: p.images?.[0]?.url || p.images?.[0]?.media?.url || p.imageUrl || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150',
  views: p.views || p.clicks || 0
});

export const useShopProfileStore = create((set, get) => ({
  shopInfo: { ...shopProfileMockData.shopInfo },
  timings: { ...shopProfileMockData.timings },
  paymentMethods: { ...shopProfileMockData.paymentMethods },
  socialLinks: { ...shopProfileMockData.socialLinks },
  products: [],
  reviews: [],
  updates: [...shopProfileMockData.updates],
  photos: [],
  isLoading: false,
  error: null,

  fetchProfileData: async () => {
    set({ isLoading: true, error: null });
    try {
      // 1. Fetch Profile
      const profRes = await shopkeeperProfileService.getProfile();
      let info = { ...shopProfileMockData.shopInfo };
      let payments = { ...shopProfileMockData.paymentMethods };
      let socials = { ...shopProfileMockData.socialLinks };
      
      if (profRes.success && profRes.data) {
        const d = profRes.data;
        info = {
          name: d.name || '',
          username: d.username || d.slug || '',
          logo: d.logo?.url || d.logoUrl || shopProfileMockData.shopInfo.logo,
          coverImage: d.coverImage?.url || d.coverImageUrl || shopProfileMockData.shopInfo.coverImage,
          rating: d.ratingAvg || d.rating || 4.5,
          reviewCount: d.reviewCount || 0,
          isVerified: d.verificationStatus === 'VERIFIED',
          distance: '0.8 km',
          description: d.description || '',
          phone: d.phone || '',
          whatsapp: d.whatsapp || '',
          email: d.email || '',
          location: d.address || d.city || '',
          address: d.address || ''
        };

        if (d.paymentMethods) {
          payments = {
            upi: d.paymentMethods.includes('UPI'),
            googlePay: d.paymentMethods.includes('GOOGLE_PAY') || d.paymentMethods.includes('UPI'),
            phonePe: d.paymentMethods.includes('PHONEPE') || d.paymentMethods.includes('UPI'),
            paytm: d.paymentMethods.includes('PAYTM') || d.paymentMethods.includes('UPI'),
            cashOnDelivery: d.paymentMethods.includes('CASH') || d.paymentMethods.includes('COD')
          };
        }

        if (d.socialLinks) {
          socials = {
            instagram: d.socialLinks.instagram || '',
            facebook: d.socialLinks.facebook || '',
            twitter: d.socialLinks.twitter || ''
          };
        }
      }

      // 2. Fetch Timings
      let timingData = { ...shopProfileMockData.timings };
      try {
        const timingsRes = await shopkeeperProfileService.getTimings();
        if (timingsRes.success && timingsRes.data) {
          const t = timingsRes.data;
          // Map backend schedule to frontend representation
          timingData = {
            displayHours: t[0]?.displayHours || '08:00 AM - 10:00 PM',
            openAll7Days: t.length >= 7 || t.every((item) => item.isOpen)
          };
        }
      } catch (err) {
        console.warn('Timings endpoint failed or empty, utilizing default mock timing structure.', err);
      }

      // 3. Fetch Products
      let productList = [];
      try {
        const prodRes = await productCatalogService.getProducts({ page: 1, limit: 10 });
        if (prodRes.success && prodRes.data) {
          const raw = prodRes.data.products || prodRes.data || [];
          productList = raw.map(mapBackendProductToFrontend);
        }
      } catch (err) {
        console.warn('Failed to load products list for profile.', err);
      }

      // 4. Fetch Reviews
      let reviewList = [];
      try {
        const revRes = await apiClient.get('/shopkeeper/reviews');
        if (revRes.data?.success) {
          reviewList = revRes.data.data || [];
        }
      } catch (err) {
        console.warn('Reviews endpoint failed, fallback to mock reviews.', err);
        reviewList = [...shopProfileMockData.reviews];
      }

      // 5. Photos
      const photoList = info.logo || info.coverImage 
        ? [
            ...(info.logo ? [{ id: 'logo', src: info.logo, type: 'logo' }] : []),
            ...(info.coverImage ? [{ id: 'cover', src: info.coverImage, type: 'cover' }] : [])
          ]
        : [...shopProfileMockData.photos];

      set({
        shopInfo: info,
        timings: timingData,
        paymentMethods: payments,
        socialLinks: socials,
        products: productList,
        reviews: reviewList,
        photos: photoList,
        isLoading: false
      });
    } catch (err) {
      console.error('Failed to load shop profile data:', err);
      set({ error: err.message || 'Failed to load shop profile details', isLoading: false });
    }
  },

  updateShopInfo: async (info) => {
    set({ isLoading: true });
    try {
      const current = get().shopInfo;
      const updatedInfo = { ...current, ...info };
      
      const payload = {
        name: updatedInfo.name,
        username: updatedInfo.username,
        description: updatedInfo.description,
        phone: updatedInfo.phone,
        whatsapp: updatedInfo.whatsapp,
        email: updatedInfo.email,
        address: updatedInfo.location || updatedInfo.address
      };

      await shopkeeperProfileService.updateProfile(payload);
      await get().fetchProfileData();
    } catch (err) {
      console.error('Failed to update shop details:', err);
      set({ error: err.message || 'Failed to update shop details', isLoading: false });
    }
  },

  updateTimings: async (timingData) => {
    set({ isLoading: true });
    try {
      const schedule = [
        { dayOfWeek: 'MONDAY', openTime: '08:00', closeTime: '22:00', isOpen: true, displayHours: timingData.displayHours },
        { dayOfWeek: 'TUESDAY', openTime: '08:00', closeTime: '22:00', isOpen: true, displayHours: timingData.displayHours },
        { dayOfWeek: 'WEDNESDAY', openTime: '08:00', closeTime: '22:00', isOpen: true, displayHours: timingData.displayHours },
        { dayOfWeek: 'THURSDAY', openTime: '08:00', closeTime: '22:00', isOpen: true, displayHours: timingData.displayHours },
        { dayOfWeek: 'FRIDAY', openTime: '08:00', closeTime: '22:00', isOpen: true, displayHours: timingData.displayHours },
        { dayOfWeek: 'SATURDAY', openTime: '08:00', closeTime: '22:00', isOpen: true, displayHours: timingData.displayHours },
        { dayOfWeek: 'SUNDAY', openTime: '08:00', closeTime: '22:00', isOpen: timingData.openAll7Days, displayHours: timingData.displayHours }
      ];

      await shopkeeperProfileService.updateTimings(schedule);
      await get().fetchProfileData();
    } catch (err) {
      console.error('Failed to update operating hours:', err);
      set({ error: err.message || 'Failed to update operating hours', isLoading: false });
    }
  },

  updatePayments: async (paymentsData) => {
    set({ isLoading: true });
    try {
      const methods = [];
      if (paymentsData.upi) methods.push('UPI');
      if (paymentsData.googlePay) methods.push('GOOGLE_PAY');
      if (paymentsData.phonePe) methods.push('PHONEPE');
      if (paymentsData.paytm) methods.push('PAYTM');
      if (paymentsData.cashOnDelivery) methods.push('CASH');

      await shopkeeperProfileService.updateProfile({ paymentMethods: methods });
      await get().fetchProfileData();
    } catch (err) {
      console.error('Failed to update payment methods:', err);
      set({ error: err.message || 'Failed to update payment methods', isLoading: false });
    }
  },

  updateSocials: async (socialData) => {
    set({ isLoading: true });
    try {
      await shopkeeperProfileService.updateProfile({ socialLinks: socialData });
      await get().fetchProfileData();
    } catch (err) {
      console.error('Failed to update social channels:', err);
      set({ error: err.message || 'Failed to update social channels', isLoading: false });
    }
  },

  addUpdate: (newPost) => {
    set((state) => {
      const created = {
        id: 'upd_' + Date.now(),
        title: newPost.title,
        type: newPost.type || 'new_arrival',
        dateRelative: 'Just now',
        image: newPost.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
      };
      return { updates: [created, ...state.updates] };
    });
  },

  addPhoto: async (src, type = 'inside') => {
    // Media upload helper
    if (type === 'cover') {
      await get().updateShopInfo({ coverImage: src });
    } else if (type === 'logo') {
      await get().updateShopInfo({ logo: src });
    }
  },

  deletePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id)
    })),

  toggleProductStock: async (id) => {
    try {
      const prod = get().products.find((p) => p.id === id);
      if (prod) {
        const nextStock = !prod.stockAvailable;
        await productCatalogService.toggleStockStatus(id, {
          stockAvailable: nextStock,
          stockCount: nextStock ? 25 : 0,
          stockStatus: nextStock ? 'IN_STOCK' : 'OUT_OF_STOCK'
        });
        await get().fetchProfileData();
      }
    } catch (err) {
      console.error('Failed to toggle product stock:', err);
    }
  },

  resetProfile: () => set({
    shopInfo: { ...shopProfileMockData.shopInfo },
    timings: { ...shopProfileMockData.timings },
    paymentMethods: { ...shopProfileMockData.paymentMethods },
    socialLinks: { ...shopProfileMockData.socialLinks },
    products: [],
    reviews: [],
    updates: [...shopProfileMockData.updates],
    photos: []
  })
}));

export default useShopProfileStore;
