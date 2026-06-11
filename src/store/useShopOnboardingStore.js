import { create } from 'zustand';
import shopkeeperOnboardingService from '../features/shopkeeper/services/shopkeeperOnboardingService';
import mediaService from '../shared/services/mediaService';
import { loadCurrentUser } from './useAuthStore';

const DRAFT_KEY = 'neargrab_onboarding_draft';

const initialStoreState = {
  currentStep: 1,
  isLoading: false,
  error: null,
  backendErrors: {},
  categories: [],
  shopId: null,
  status: 'DRAFT',
  shopDetails: {
    name: '',
    username: '',
    category: '',   // holds categoryId from backend, or name string from fallback
    categoryId: '',
    type: '',
    establishedYear: '',
    gstNumber: '',
    description: '',
    logo: ''        // URL string or File object
  },
  address: {
    street: '',
    landmark: '',
    city: 'Navsari',
    pincode: '',
    state: 'Gujarat',
    coordinates: { lat: 20.9467, lng: 72.9520 },
    radius: '1 km'
  },
  contact: {
    phone: '',
    whatsapp: '',
    alternatePhone: '',
    email: '',
    openingTime: '08:00 AM',
    closingTime: '10:00 PM',
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    preferences: {
      acceptCalls: true,
      enableStockRequests: true,
      receiveNotifications: true
    }
  },
  businessInfo: {
    gstNumber: '',
    panNumber: '',
    registrationDoc: '', // URL string or File object
    languages: ['Hindi', 'Gujarati'],
    priceRange: 'Budget Friendly',
    tags: ['Groceries', 'Daily Needs'],
    homeDelivery: true,
    digitalPayments: true,
    upiId: ''
  },
  photos: {
    front: '',       // URL string or File object
    inside: '',
    logo: '',
    cover: '',
    additional: []  // Array of URL strings or File objects
  }
};

// ---------------------------------------------------------------------------
// localStorage helpers — File objects are stripped (not serialisable)
// ---------------------------------------------------------------------------

function serializeField(val) {
  return typeof val === 'string' ? val : null;
}

function saveDraft(state) {
  try {
    const draft = {
      currentStep: state.currentStep,
      shopId: state.shopId,
      shopDetails: { ...state.shopDetails, logo: serializeField(state.shopDetails.logo) },
      address: state.address,
      contact: state.contact,
      businessInfo: {
        ...state.businessInfo,
        registrationDoc: serializeField(state.businessInfo.registrationDoc)
      },
      photos: {
        ...state.photos,
        logo: serializeField(state.photos.logo),
        cover: serializeField(state.photos.cover),
        front: serializeField(state.photos.front),
        inside: serializeField(state.photos.inside),
        additional: (state.photos.additional || []).filter(p => typeof p === 'string')
      }
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    console.warn('Failed to persist onboarding draft to localStorage', e);
  }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useShopOnboardingStore = create((set, get) => ({
  ...initialStoreState,

  // ---- Step navigation ----
  setCurrentStep: (step) => {
    set({ currentStep: step });
    saveDraft({ ...get(), currentStep: step });
  },

  // ---- Local field updaters (persist to localStorage) ----
  updateShopDetails: (details) =>
    set((state) => {
      const next = { shopDetails: { ...state.shopDetails, ...details } };
      saveDraft({ ...state, ...next });
      return next;
    }),

  updateAddress: (addressData) =>
    set((state) => {
      const next = { address: { ...state.address, ...addressData } };
      saveDraft({ ...state, ...next });
      return next;
    }),

  updateContact: (contactData) =>
    set((state) => {
      const next = { contact: { ...state.contact, ...contactData } };
      saveDraft({ ...state, ...next });
      return next;
    }),

  updateBusinessInfo: (infoData) =>
    set((state) => {
      const next = { businessInfo: { ...state.businessInfo, ...infoData } };
      saveDraft({ ...state, ...next });
      return next;
    }),

  updatePhotos: (photosData) =>
    set((state) => {
      const next = { photos: { ...state.photos, ...photosData } };
      saveDraft({ ...state, ...next });
      return next;
    }),

  reset: () => {
    clearDraft();
    set(initialStoreState);
  },

  // ---- Category fetch ----
  fetchCategories: async () => {
    try {
      const res = await shopkeeperOnboardingService.getCategories();
      if (res.success && res.data) {
        set({ categories: res.data });
      }
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  },

  // ---- Draft restore: localStorage first, then backend ----
  fetchDraft: async () => {
    set({ isLoading: true, error: null });
    try {
      await get().fetchCategories();

      // Prefer localStorage draft (faster, preserves File-less state)
      const saved = loadDraft();
      if (saved) {
        set({
          currentStep: saved.currentStep || 1,
          shopId: saved.shopId || null,
          shopDetails: { ...initialStoreState.shopDetails, ...(saved.shopDetails || {}) },
          address: { ...initialStoreState.address, ...(saved.address || {}) },
          contact: { ...initialStoreState.contact, ...(saved.contact || {}) },
          businessInfo: { ...initialStoreState.businessInfo, ...(saved.businessInfo || {}) },
          photos: { ...initialStoreState.photos, ...(saved.photos || {}) }
        });
        return;
      }

      // No local draft — try backend (for users who previously partially submitted)
      const res = await shopkeeperOnboardingService.getOnboardingState();
      if (res.success && res.data?.shop) {
        const { shop } = res.data;
        const restored = {
          shopId: shop.id,
          status: shop.status,
          shopDetails: {
            name: shop.name || '',
            username: shop.username || '',
            category: shop.categoryId || '',
            categoryId: shop.categoryId || '',
            type: shop.type || '',
            establishedYear: shop.establishedYear || '',
            gstNumber: shop.gstNumber || '',
            description: shop.description || '',
            logo: shop.logo || ''
          },
          address: {
            street: shop.address?.street || '',
            landmark: shop.address?.landmark || '',
            city: shop.address?.city || 'Navsari',
            pincode: shop.address?.pincode || '',
            state: shop.address?.state || 'Gujarat',
            coordinates: {
              lat: shop.address?.latitude || 20.9467,
              lng: shop.address?.longitude || 72.9520
            },
            radius: shop.address?.radius || '1 km'
          },
          contact: {
            phone: shop.contact?.phone || '',
            whatsapp: shop.contact?.whatsapp || '',
            alternatePhone: shop.contact?.alternatePhone || '',
            email: shop.contact?.email || '',
            openingTime: shop.timings?.openingTime || '08:00 AM',
            closingTime: shop.timings?.closingTime || '10:00 PM',
            weekdays: shop.timings?.weekdays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            preferences: {
              acceptCalls: shop.contact?.preferences?.acceptCalls ?? true,
              enableStockRequests: shop.contact?.preferences?.enableStockRequests ?? true,
              receiveNotifications: shop.contact?.preferences?.receiveNotifications ?? true
            }
          },
          businessInfo: {
            gstNumber: shop.gstNumber || '',
            panNumber: shop.panNumber || '',
            registrationDoc: '',
            languages: shop.business?.languages || ['Hindi', 'Gujarati'],
            priceRange: shop.business?.priceRange || 'Budget Friendly',
            tags: shop.business?.tags || ['Groceries', 'Daily Needs'],
            homeDelivery: shop.business?.homeDelivery ?? true,
            digitalPayments: shop.business?.digitalPayments ?? true,
            upiId: shop.business?.upiId || ''
          },
          photos: {
            logo: shop.logo || '',
            cover: shop.cover || '',
            front: shop.photos?.find(p => p.kind === 'front')?.url || '',
            inside: shop.photos?.find(p => p.kind === 'inside')?.url || '',
            additional: shop.photos
              ?.filter(p => p.kind !== 'front' && p.kind !== 'inside')
              .map(p => p.url) || []
          }
        };
        set(restored);
        saveDraft({ ...get(), ...restored });
      }
    } catch (err) {
      console.error('Failed to load onboarding draft', err);
      set({ error: err.message || 'Failed to load onboarding draft' });
    } finally {
      set({ isLoading: false });
    }
  },

  // ---- Upload helper ----
  uploadFileIfNew: async (fileOrUrl) => {
    if (fileOrUrl instanceof File) {
      const res = await mediaService.uploadSingle(fileOrUrl);
      if (res.success && res.data) return res.data.id;
    }
    return null;
  },

  // ---- Final submit — the ONLY function that calls the backend ----
  submitForReview: async () => {
    set({ isLoading: true, error: null, backendErrors: {} });
    try {
      const { shopDetails, address, contact, businessInfo, photos, shopId } = get();

      // A. Upload logo if it's a new File
      const logoMediaId = await get().uploadFileIfNew(shopDetails.logo);

      // B. Create shop draft if it doesn't exist yet
      let currentShopId = shopId;
      if (!currentShopId) {
        const startRes = await shopkeeperOnboardingService.startOnboarding({
          name: shopDetails.name,
          username: shopDetails.username
        });
        if (!startRes.success || !startRes.data?.shop) {
          throw new Error('Failed to create shop draft. Check your shop name and handle.');
        }
        currentShopId = startRes.data.shop.id;
        set({ shopId: currentShopId });
      }

      // C. Save details
      const detailsRes = await shopkeeperOnboardingService.updateDetails({
        name: shopDetails.name,
        username: shopDetails.username,
        categoryId: shopDetails.category || shopDetails.categoryId || undefined,
        type: shopDetails.type,
        establishedYear: shopDetails.establishedYear
          ? parseInt(shopDetails.establishedYear, 10)
          : undefined,
        description: shopDetails.description,
        ...(logoMediaId && { logoMediaId })
      });
      if (!detailsRes.success) throw new Error('Failed to save shop details');

      // D. Save address
      const addressRes = await shopkeeperOnboardingService.updateAddress({
        street: address.street,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        coordinates: address.coordinates,
        serviceRadiusKm: parseFloat(address.radius) || 1.0
      });
      if (!addressRes.success) throw new Error('Failed to save address');

      // E. Save contact
      const contactRes = await shopkeeperOnboardingService.updateContact({
        phone: contact.phone,
        whatsapp: contact.whatsapp,
        alternatePhone: contact.alternatePhone || undefined,
        email: contact.email || undefined,
        openingTime: contact.openingTime,
        closingTime: contact.closingTime,
        weekdays: contact.weekdays,
        preferences: contact.preferences
      });
      if (!contactRes.success) throw new Error('Failed to save contact details');

      // F. Upload registration doc if new File
      const registrationDocMediaId = await get().uploadFileIfNew(businessInfo.registrationDoc);

      // G. Save business info
      const businessRes = await shopkeeperOnboardingService.updateBusiness({
        gstNumber: businessInfo.gstNumber || undefined,
        panNumber: businessInfo.panNumber || undefined,
        languages: businessInfo.languages,
        priceRange: businessInfo.priceRange,
        homeDelivery: businessInfo.homeDelivery,
        digitalPayments: businessInfo.digitalPayments,
        upiId: businessInfo.upiId || undefined,
        tags: businessInfo.tags,
        ...(registrationDocMediaId && { registrationDocMediaId })
      });
      if (!businessRes.success) throw new Error('Failed to save business information');

      // H. Upload photos
      const frontMediaId = await get().uploadFileIfNew(photos.front);
      const insideMediaId = await get().uploadFileIfNew(photos.inside);
      const coverMediaId = await get().uploadFileIfNew(photos.cover);

      const photosArray = [];
      if (frontMediaId) photosArray.push({ mediaId: frontMediaId, kind: 'front', sortOrder: 0 });
      if (insideMediaId) photosArray.push({ mediaId: insideMediaId, kind: 'inside', sortOrder: 0 });
      if (Array.isArray(photos.additional)) {
        for (let i = 0; i < photos.additional.length; i++) {
          const addId = await get().uploadFileIfNew(photos.additional[i]);
          if (addId) photosArray.push({ mediaId: addId, kind: 'additional', sortOrder: i + 1 });
        }
      }

      const photosRes = await shopkeeperOnboardingService.updatePhotos({
        ...(coverMediaId && { coverMediaId }),
        photos: photosArray
      });
      if (!photosRes.success) throw new Error('Failed to save photos');

      // I. Final submit
      const submitRes = await shopkeeperOnboardingService.submitOnboarding();
      if (!submitRes.success) {
        throw new Error(submitRes.data?.message || 'Submission failed');
      }

      // J. Clean up and refresh auth role
      clearDraft();
      await loadCurrentUser();
      return true;

    } catch (err) {
      console.error('Onboarding submission failed:', err);
      // Surface missing-field details from backend 400 response
      const missingFields = err.details?.missing;
      const errorMsg = missingFields?.length
        ? `Missing required fields: ${missingFields.map(f => f.replace('.', ' → ')).join(', ')}`
        : (err.message || 'Failed to submit. Please try again.');
      set({ error: errorMsg });
      return false;
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useShopOnboardingStore;
