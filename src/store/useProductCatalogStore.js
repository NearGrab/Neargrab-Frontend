import { create } from 'zustand';
import { productCatalogMockData } from '../features/shopkeeper/data/productCatalogMockData';

const initialCatalogState = {
  products: productCatalogMockData.products,
  selectedProducts: [],
  searchQuery: '',
  selectedCategory: 'All Categories',
  stockFilter: 'All',
  sortBy: 'Newest',
  currentPage: 1,
  rowsPerPage: 10
};

export const useProductCatalogStore = create((set) => ({
  ...initialCatalogState,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setCategory: (category) => set({ selectedCategory: category, currentPage: 1 }),

  setStockFilter: (filter) => set({ stockFilter: filter, currentPage: 1 }),

  setSortBy: (sort) => set({ sortBy: sort }),

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
        // Select all currently visible IDs that are not already selected
        const uniqueSelection = Array.from(new Set([...state.selectedProducts, ...visibleIds]));
        return { selectedProducts: uniqueSelection };
      } else {
        // Deselect all currently visible IDs
        const nextSelection = state.selectedProducts.filter((id) => !visibleIds.includes(id));
        return { selectedProducts: nextSelection };
      }
    }),

  toggleStock: (id) =>
    set((state) => {
      const updatedProducts = state.products.map((prod) => {
        if (prod.id === id) {
          const nextStock = !prod.stockAvailable;
          return {
            ...prod,
            stockAvailable: nextStock,
            stockCount: nextStock ? 10 : 0 // Assign a mock count when toggled ON
          };
        }
        return prod;
      });

      return { products: updatedProducts };
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),

  loadProducts: (productsList) => set({ products: productsList }),

  resetCatalog: () => set(initialCatalogState)
}));

export default useProductCatalogStore;
