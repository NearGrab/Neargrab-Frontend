import { create } from 'zustand';

const initialStoreState = {
  currentStep: 1,
  shopDetails: {
    name: '',
    username: '',
    category: '',
    type: '',
    establishedYear: '',
    gstNumber: '',
    description: '',
    logo: ''
  },
  address: {
    street: '',
    landmark: '',
    city: 'Navsari',
    pincode: '',
    state: 'Gujarat',
    coordinates: { lat: 20.9467, lng: 72.9520 }, // Default Navsari coordinates
    radius: '1 km' // Default 1km radius
  },
  contact: {
    phone: '',
    whatsapp: '',
    alternatePhone: '',
    email: '',
    openingTime: '08:00 AM',
    closingTime: '10:00 PM',
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Sunday is holiday by default
    preferences: {
      acceptCalls: true,
      enableStockRequests: true,
      receiveNotifications: true
    }
  },
  businessInfo: {
    gstNumber: '', // Optional verification GST
    panNumber: '',
    registrationDoc: '', // JPG/PNG/PDF base64 or object
    languages: ['Hindi', 'Gujarati'], // Default spoken languages
    priceRange: 'Budget Friendly',
    tags: ['Groceries', 'Daily Needs'],
    homeDelivery: true,
    digitalPayments: true,
    upiId: ''
  },
  photos: {
    front: '',
    inside: '',
    logo: '',
    additional: []
  }
};

export const useShopOnboardingStore = create((set) => ({
  ...initialStoreState,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateShopDetails: (details) =>
    set((state) => ({
      shopDetails: { ...state.shopDetails, ...details }
    })),

  updateAddress: (addressData) =>
    set((state) => ({
      address: { ...state.address, ...addressData }
    })),

  updateContact: (contactData) =>
    set((state) => ({
      contact: { ...state.contact, ...contactData }
    })),

  updateBusinessInfo: (infoData) =>
    set((state) => ({
      businessInfo: { ...state.businessInfo, ...infoData }
    })),

  updatePhotos: (photosData) =>
    set((state) => ({
      photos: { ...state.photos, ...photosData }
    })),

  reset: () => set(initialStoreState)
}));

export default useShopOnboardingStore;
