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

// Helper to clean phone numbers to 10 digits
function cleanPhoneNumber(phoneStr) {
  if (!phoneStr) return '';
  const digits = phoneStr.replace(/\D/g, '');
  return digits.slice(-10);
}

// Helper to parse location string to address object
function parseAddressString(addressStr, existingAddress = {}) {
  if (!addressStr) return undefined;
  
  const pincodeMatch = addressStr.match(/(\d{6})/);
  const pincode = pincodeMatch ? pincodeMatch[1] : (existingAddress.pincode || "396445");
  
  let cleanStr = addressStr.replace(/-?\s*\d{6}\s*$/, '').trim();
  if (cleanStr.endsWith('-')) cleanStr = cleanStr.slice(0, -1).trim();
  
  const parts = cleanStr.split(',').map(p => p.trim()).filter(Boolean);
  
  let street = existingAddress.street || '';
  let city = existingAddress.city || 'Navsari';
  let state = existingAddress.state || 'Gujarat';
  
  if (parts.length >= 3) {
    state = parts.pop();
    city = parts.pop();
    street = parts.join(', ');
  } else if (parts.length === 2) {
    city = parts[0];
    state = parts[1];
    street = parts[0];
  } else if (parts.length === 1) {
    street = parts[0];
  }
  
  return {
    street: street || 'Main Street',
    city: city || 'Navsari',
    state: state || 'Gujarat',
    pincode,
    latitude: existingAddress.latitude || 20.9467,
    longitude: existingAddress.longitude || 72.9520,
    serviceRadiusKm: existingAddress.serviceRadiusKm || 1.0
  };
}

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
  originalAddress: null,
  originalContact: null,

  fetchProfileData: async () => {
    set({ isLoading: true, error: null });
    try {
      // 1. Fetch Profile
      const profRes = await shopkeeperProfileService.getProfile();
      let info = { ...shopProfileMockData.shopInfo };
      let payments = { ...shopProfileMockData.paymentMethods };
      let socials = { ...shopProfileMockData.socialLinks };
      let origAddr = null;
      let origContact = null;
      
      if (profRes.success && profRes.data) {
        const d = profRes.data;
        origAddr = d.address || {};
        origContact = d.contact || {};
        
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
          phone: origContact.phone || '',
          whatsapp: origContact.whatsapp || '',
          email: origContact.email || '',
          location: `${origAddr.street || ''}, ${origAddr.city || ''} - ${origAddr.pincode || ''}`.replace(/^,\s*/, '').trim()
        };

        if (d.paymentMethods) {
          const hasUPI = d.paymentMethods.some(pm => pm.method === 'UPI' && pm.enabled);
          const hasCash = d.paymentMethods.some(pm => pm.method === 'CASH' && pm.enabled);
          payments = {
            upi: hasUPI,
            googlePay: hasUPI,
            phonePe: hasUPI,
            paytm: hasUPI,
            cashOnDelivery: hasCash
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
        if (timingsRes.success && Array.isArray(timingsRes.data) && timingsRes.data.length > 0) {
          const t = timingsRes.data;
          
          const convert24hTo12h = (timeStr) => {
            if (!timeStr) return '';
            const [hoursStr, minutesStr] = timeStr.split(':');
            let hours = parseInt(hoursStr, 10);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            if (hours === 0) hours = 12;
            return `${hours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
          };
          
          const firstOpenDay = t.find((item) => !item.isClosed) || t[0];
          const displayHours = firstOpenDay 
            ? `${convert24hTo12h(firstOpenDay.opensAt)} - ${convert24hTo12h(firstOpenDay.closesAt)}`
            : '08:00 AM - 10:00 PM';
            
          const openAll7Days = t.length >= 7 && t.every((item) => !item.isClosed);
          
          timingData = {
            isOpenNow: t.every((item) => !item.isClosed),
            displayHours,
            openAll7Days
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
        if (revRes.success) {
          const rawReviews = revRes.data || [];
          reviewList = rawReviews.map(r => ({
            id: r.id,
            reviewerName: r.authorName || 'Anonymous',
            avatar: r.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
            rating: r.rating || 0,
            comment: r.comment || '',
            dateRelative: r.dateRelative || 'Recent',
            isVerified: r.verifiedPurchase ?? false
          }));
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
        originalAddress: origAddr,
        originalContact: origContact,
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
      
      const origAddr = get().originalAddress || {};
      const origContact = get().originalContact || {};
      
      const parsedAddress = parseAddressString(updatedInfo.location, origAddr);
      
      const cleanedPhone = cleanPhoneNumber(updatedInfo.phone);
      const cleanedWhatsapp = cleanPhoneNumber(updatedInfo.whatsapp);
      
      const payload = {
        name: updatedInfo.name,
        username: updatedInfo.username,
        description: updatedInfo.description,
        address: parsedAddress,
        contact: {
          phone: cleanedPhone || origContact.phone || '',
          whatsapp: cleanedWhatsapp || origContact.whatsapp || null,
          email: updatedInfo.email ? updatedInfo.email.trim() : null
        }
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
      let opensAt = "08:00";
      let closesAt = "22:00";
      if (timingData.displayHours) {
        const parts = timingData.displayHours.split("-");
        if (parts.length === 2) {
          const rawOpen = parts[0].trim();
          const rawClose = parts[1].trim();
          
          const matchOpen = rawOpen.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
          if (matchOpen) {
            let h = parseInt(matchOpen[1], 10);
            const m = matchOpen[2];
            const ampm = matchOpen[3].toUpperCase();
            if (ampm === 'PM' && h < 12) h += 12;
            if (ampm === 'AM' && h === 12) h = 0;
            opensAt = `${h.toString().padStart(2, '0')}:${m}`;
          }
          
          const matchClose = rawClose.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
          if (matchClose) {
            let h = parseInt(matchClose[1], 10);
            const m = matchClose[2];
            const ampm = matchClose[3].toUpperCase();
            if (ampm === 'PM' && h < 12) h += 12;
            if (ampm === 'AM' && h === 12) h = 0;
            closesAt = `${h.toString().padStart(2, '0')}:${m}`;
          }
        }
      }

      const schedule = [
        { weekday: 1, opensAt, closesAt, isClosed: false },
        { weekday: 2, opensAt, closesAt, isClosed: false },
        { weekday: 3, opensAt, closesAt, isClosed: false },
        { weekday: 4, opensAt, closesAt, isClosed: false },
        { weekday: 5, opensAt, closesAt, isClosed: false },
        { weekday: 6, opensAt, closesAt, isClosed: false },
        { weekday: 0, opensAt, closesAt, isClosed: !timingData.openAll7Days }
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
      const paymentMethodsList = [];
      const upiEnabled = !!(paymentsData.upi || paymentsData.googlePay || paymentsData.phonePe || paymentsData.paytm);
      
      paymentMethodsList.push({
        method: 'UPI',
        enabled: upiEnabled,
        upiId: null
      });
      
      paymentMethodsList.push({
        method: 'CASH',
        enabled: !!paymentsData.cashOnDelivery
      });

      await shopkeeperProfileService.updateProfile({ paymentMethods: paymentMethodsList });
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
    photos: [],
    originalAddress: null,
    originalContact: null
  })
}));

export default useShopProfileStore;
