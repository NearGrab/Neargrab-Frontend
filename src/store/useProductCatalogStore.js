import { create } from 'zustand';
import { productCatalogService } from '../features/shopkeeper/services/productCatalogService';

const mapBackendProductToFrontend = (p) => ({
  id: p.id,
  name: p.name,
  sku: p.sku || '',
  category: p.category?.name || p.categoryName || 'General',
  categoryId: p.categoryId,
  price: (p.pricePaise || 0) / 100,
  mrp: (p.mrpPaise || 0) / 100,
  stockCount: p.stockCount || 0,
  stockAvailable: p.stockAvailable ?? (p.stockCount > 0),
  image: p.images?.[0]?.url || p.images?.[0]?.media?.url || p.imageUrl || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150',
  views: p.views || p.clicks || 0
});

const initialCatalogState = {
  products: [],
  selectedProducts: [],
  searchQuery: '',
  selectedCategory: 'All Categories',
  stockFilter: 'All',
  sortBy: 'Newest',
  currentPage: 1,
  rowsPerPage: 10,
  totalProducts: 0,
  totalPages: 1,
  isLoading: false,
  error: null
};

export const useProductCatalogStore = create((set, get) => ({
  ...initialCatalogState,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { searchQuery, selectedCategory, stockFilter, currentPage, rowsPerPage } = get();
      
      const res = await productCatalogService.getProducts({
        q: searchQuery,
        categoryId: selectedCategory,
        stockStatus: stockFilter,
        page: currentPage,
        limit: rowsPerPage
      });

      if (res.success && res.data) {
        const rawProducts = res.data.products || res.data || [];
        const mapped = rawProducts.map(mapBackendProductToFrontend);
        
        // Dynamic client-side sorting if backend doesn't sort
        const sortBy = get().sortBy;
        let sorted = [...mapped];
        if (sortBy === 'Oldest') {
          sorted = sorted.reverse();
        } else if (sortBy === 'Highest Views') {
          sorted = sorted.sort((a, b) => b.views - a.views);
        } else if (sortBy === 'Lowest Views') {
          sorted = sorted.sort((a, b) => a.views - b.views);
        } else if (sortBy === 'Price High To Low') {
          sorted = sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Price Low To High') {
          sorted = sorted.sort((a, b) => a.price - b.price);
        }

        set({
          products: sorted,
          totalProducts: res.meta?.total || sorted.length,
          totalPages: res.meta?.totalPages || 1,
          isLoading: false
        });
      } else {
        set({ error: 'Failed to fetch catalog products', isLoading: false });
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      set({ error: err.message || 'Failed to load products', isLoading: false });
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    get().fetchProducts();
  },

  setCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 });
    get().fetchProducts();
  },

  setStockFilter: (filter) => {
    set({ stockFilter: filter, currentPage: 1 });
    get().fetchProducts();
  },

  setSortBy: (sort) => {
    set({ sortBy: sort });
    get().fetchProducts();
  },

  toggleProductSelection: (id) =>
    set((state) => {
      const alreadySelected = state.selectedProducts.includes(id);
      const nextSelection = alreadySelected
        ? state.selectedProducts.filter((selectedId) => selectedId !== id)
        : [...state.selectedProducts, id];
      return { selectedProducts: nextSelection };
    }),

  toggleAllProducts: (checked, visibleIds = []) =>
    set((state) => {
      if (checked) {
        const uniqueSelection = Array.from(new Set([...state.selectedProducts, ...visibleIds]));
        return { selectedProducts: uniqueSelection };
      } else {
        const nextSelection = state.selectedProducts.filter((id) => !visibleIds.includes(id));
        return { selectedProducts: nextSelection };
      }
    }),

  toggleStock: async (id) => {
    set({ isLoading: true });
    try {
      const prod = get().products.find((p) => p.id === id);
      if (prod) {
        const nextStock = !prod.stockAvailable;
        const payload = {
          stockAvailable: nextStock,
          stockCount: nextStock ? 10 : 0,
          stockStatus: nextStock ? 'IN_STOCK' : 'OUT_OF_STOCK'
        };

        await productCatalogService.toggleStockStatus(id, payload);
        await get().fetchProducts(); // Refresh list from backend
      }
    } catch (err) {
      console.error('Failed to toggle stock status:', err);
      set({ error: err.message || 'Failed to toggle stock status', isLoading: false });
    }
  },

  deleteSingleProduct: async (id) => {
    set({ isLoading: true });
    try {
      await productCatalogService.deleteProduct(id);
      await get().fetchProducts();
    } catch (err) {
      console.error('Failed to delete product:', err);
      set({ error: err.message || 'Failed to delete product', isLoading: false });
    }
  },

  bulkDelete: async () => {
    const { selectedProducts } = get();
    if (selectedProducts.length === 0) return;
    set({ isLoading: true });
    try {
      await productCatalogService.bulkOperation({
        productIds: selectedProducts,
        action: 'delete'
      });
      set({ selectedProducts: [] });
      await get().fetchProducts();
    } catch (err) {
      console.error('Failed bulk delete:', err);
      set({ error: err.message || 'Failed bulk delete', isLoading: false });
    }
  },

  bulkHide: async () => {
    const { selectedProducts } = get();
    if (selectedProducts.length === 0) return;
    set({ isLoading: true });
    try {
      await productCatalogService.bulkOperation({
        productIds: selectedProducts,
        action: 'toggle_stock',
        stockAvailable: false,
        stockStatus: 'OUT_OF_STOCK'
      });
      set({ selectedProducts: [] });
      await get().fetchProducts();
    } catch (err) {
      console.error('Failed bulk hide:', err);
      set({ error: err.message || 'Failed bulk hide', isLoading: false });
    }
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().fetchProducts();
  },

  setRowsPerPage: (rows) => {
    set({ rowsPerPage: rows, currentPage: 1 });
    get().fetchProducts();
  },

  resetCatalog: () => set(initialCatalogState)
}));

export default useProductCatalogStore;
