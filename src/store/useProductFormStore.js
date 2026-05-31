import { create } from 'zustand';

const initialFormState = {
  productName: '',
  brand: '',
  category: '',
  subCategory: '',
  description: '',
  tags: [],
  price: '',
  mrp: '',
  unit: '1_piece', // Default unit ID
  stockAvailable: true,
  hsnCode: '',
  expiryDate: '',
  minimumOrderQty: '1',
  returnable: 'Yes',
  needsRefrigeration: false,
  images: [] // Holds { id, src, isPrimary }
};

export const useProductFormStore = create((set) => ({
  ...initialFormState,

  updateField: (name, value) => set({ [name]: value }),

  addTag: (tag) =>
    set((state) => {
      const cleaned = tag.trim();
      if (!cleaned || state.tags.includes(cleaned) || state.tags.length >= 5) {
        return state;
      }
      return { tags: [...state.tags, cleaned] };
    }),

  removeTag: (tag) =>
    set((state) => ({
      tags: state.tags.filter((t) => t !== tag)
    })),

  addImage: (imgObj) =>
    set((state) => {
      if (state.images.length >= 6) return state;

      // Create new image entry
      const newImg = {
        id: imgObj.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        src: imgObj.src,
        isPrimary: state.images.length === 0 ? true : !!imgObj.isPrimary
      };

      return { images: [...state.images, newImg] };
    }),

  removeImage: (id) =>
    set((state) => {
      const filtered = state.images.filter((img) => img.id !== id);
      
      // If we deleted the primary, make the first remaining image primary automatically
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }

      return { images: filtered };
    }),

  setPrimaryImage: (id) =>
    set((state) => ({
      images: state.images.map((img) => ({
        ...img,
        isPrimary: img.id === id
      }))
    })),

  resetForm: () => set(initialFormState),

  saveDraft: () => {
    // Save draft log
    console.log('Product draft saved successfully!');
    return Promise.resolve(true);
  }
}));

export default useProductFormStore;
