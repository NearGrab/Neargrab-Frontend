import { create } from 'zustand';
import { productService } from '../features/shopkeeper/services/productService';
import { mediaService } from '../shared/services/mediaService';

const initialFormState = {
  productName: '',
  brand: '',
  category: '',
  subCategory: '',
  description: '',
  tags: [],
  price: '',
  mrp: '',
  unit: '1 Piece', // Default unit name
  stockAvailable: true,
  hsnCode: '',
  expiryDate: '',
  minimumOrderQty: '1',
  returnable: 'Yes',
  needsRefrigeration: false,
  images: [], // Holds { id, src, isPrimary, file }
  isLoading: false,
  error: null,
  categories: [] // Cached backend categories list
};

export const useProductFormStore = create((set, get) => ({
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
        isPrimary: state.images.length === 0 ? true : !!imgObj.isPrimary,
        file: imgObj.file || null
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

  fetchCategories: async () => {
    try {
      const res = await productService.getCategories();
      if (res.success && res.data) {
        set({ categories: res.data });
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  },

  fetchProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Fetch categories cache
      await get().fetchCategories();
      
      const res = await productService.getProduct(id);
      if (res.success && res.data) {
        const p = res.data;
        const mappedImages = p.images?.map((img) => ({
          id: img.mediaId || img.media?.id || img.id,
          src: img.url || img.media?.url || img.imageUrl,
          isPrimary: img.isPrimary || false,
          file: null
        })) || [];

        set({
          productName: p.name || '',
          brand: p.brand?.name || p.brandName || '',
          category: p.category?.name || p.categoryName || '',
          subCategory: p.subCategory || '',
          description: p.description || '',
          tags: p.tags || [],
          price: p.pricePaise ? (p.pricePaise / 100).toString() : '',
          mrp: p.mrpPaise ? (p.mrpPaise / 100).toString() : '',
          unit: p.unit || '1 Piece',
          stockAvailable: p.stockAvailable ?? true,
          hsnCode: p.hsnCode || '',
          expiryDate: p.expiryDate ? p.expiryDate.split('T')[0] : '',
          minimumOrderQty: p.minimumOrderQty ? p.minimumOrderQty.toString() : '1',
          returnable: p.returnable ? 'Yes' : 'No',
          needsRefrigeration: p.needsRefrigeration || false,
          images: mappedImages,
          isLoading: false
        });
      } else {
        set({ error: 'Failed to fetch product details', isLoading: false });
      }
    } catch (err) {
      console.error('Failed to fetch product:', err);
      set({ error: err.message || 'Failed to load product details', isLoading: false });
    }
  },

  submitProduct: async (id = null) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Ensure categories cache is loaded
      if (get().categories.length === 0) {
        await get().fetchCategories();
      }

      // 2. Map category name to backend category ID
      const categoryName = get().category || '';
      const matchedCat = get().categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      );

      // If we don't find a matching seeded category ID, fallback to 'Grocery' category or the first available category in database
      let categoryId = matchedCat?.id;
      if (!categoryId) {
        const fallbackCat = get().categories.find(
          (c) => c.name.toLowerCase() === 'grocery'
        );
        categoryId = fallbackCat ? fallbackCat.id : (get().categories[0]?.id || null);
      }

      // 3. Upload any new local images
      const imageMediaIds = [];
      const imagesToUpload = get().images.filter((img) => img.file);
      const existingImages = get().images.filter((img) => !img.file);

      // Handle file uploads sequentially
      for (const img of imagesToUpload) {
        const res = await mediaService.uploadSingle(img.file);
        if (res.success && res.data) {
          imageMediaIds.push(res.data.id);
        }
      }

      // Add existing media IDs
      existingImages.forEach((img) => {
        imageMediaIds.push(img.id);
      });

      // 4. Construct payload
      const payload = {
        name: get().productName,
        sku: get().sku || undefined,
        categoryId: categoryId,
        description: get().description,
        size: get().unit, // Size/unit snapshot
        unit: get().unit,
        tags: get().tags,
        pricePaise: Math.round(parseFloat(get().price) * 100),
        mrpPaise: get().mrp ? Math.round(parseFloat(get().mrp) * 100) : undefined,
        stockAvailable: get().stockAvailable,
        stockCount: get().stockAvailable ? 25 : 0,
        stockStatus: get().stockAvailable ? 'IN_STOCK' : 'OUT_OF_STOCK',
        imageMediaIds: imageMediaIds,
        attributes: [
          { key: 'Sub Category', value: get().subCategory || '' },
          { key: 'HSN Code', value: get().hsnCode || '' },
          { key: 'Expiry Date', value: get().expiryDate || '' },
          { key: 'Minimum Order Qty', value: get().minimumOrderQty || '1' },
          { key: 'Returnable', value: get().returnable || 'Yes' },
          { key: 'Needs Refrigeration', value: get().needsRefrigeration ? 'Yes' : 'No' }
        ].filter(attr => attr.value && attr.value.trim() !== '')
      };

      if (get().brand) {
        payload.brandName = get().brand;
      }

      // 5. Send to create or update API
      let response;
      if (id) {
        response = await productService.updateProduct(id, payload);
      } else {
        response = await productService.createProduct(payload);
      }

      if (response.success) {
        set({ isLoading: false });
        get().resetForm();
        return true;
      } else {
        set({ error: response.message || 'Operation failed', isLoading: false });
        return false;
      }
    } catch (err) {
      console.error('Failed to submit product:', err);
      set({ error: err.message || 'Failed to submit product', isLoading: false });
      return false;
    }
  }
}));

export default useProductFormStore;
