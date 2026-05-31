import { productCatalogMockData } from '../data/productCatalogMockData';

/**
 * Simple asynchronous network client to manage Product Catalog queries and filters.
 * Decouples presentation layers from backend networking for clean server migrations later.
 */
export const productCatalogService = {
  /**
   * Fetch all product entries.
   * @returns {Promise<Array>}
   */
  getProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...productCatalogMockData.products]);
      }, 500);
    });
  },

  /**
   * Perform search, filter, and sort queries on products dataset.
   * @param {Object} queryOptions 
   * @returns {Promise<Array>}
   */
  queryProducts: async ({ query, category, stockStatus, sortBy, productsList = [] }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...productsList];

        // 1. Text Search matching name, SKU, category, brand
        if (query) {
          const lower = query.toLowerCase().trim();
          list = list.filter(
            (p) =>
              p.name.toLowerCase().includes(lower) ||
              p.sku.toLowerCase().includes(lower) ||
              p.category.toLowerCase().includes(lower)
          );
        }

        // 2. Category selection
        if (category && category !== 'All Categories') {
          list = list.filter((p) => p.category === category);
        }

        // 3. Stock Status filter
        if (stockStatus && stockStatus !== 'All') {
          if (stockStatus === 'In Stock') {
            list = list.filter((p) => p.stockAvailable && p.stockCount > 10);
          } else if (stockStatus === 'Out Of Stock') {
            list = list.filter((p) => !p.stockAvailable || p.stockCount === 0);
          } else if (stockStatus === 'Low Stock') {
            list = list.filter((p) => p.stockAvailable && p.stockCount <= 10 && p.stockCount > 0);
          }
        }

        // 4. Sort calculations
        if (sortBy) {
          if (sortBy === 'Newest') {
            // Mock sort (keep array relative)
          } else if (sortBy === 'Oldest') {
            list = list.reverse();
          } else if (sortBy === 'Highest Views') {
            list = list.sort((a, b) => b.views - a.views);
          } else if (sortBy === 'Lowest Views') {
            list = list.sort((a, b) => a.views - b.views);
          } else if (sortBy === 'Price High To Low') {
            list = list.sort((a, b) => b.price - a.price);
          } else if (sortBy === 'Price Low To High') {
            list = list.sort((a, b) => a.price - b.price);
          }
        }

        resolve(list);
      }, 300);
    });
  },

  /**
   * Toggle stock availability status.
   * @param {string} id 
   * @returns {Promise<Object>}
   */
  toggleStockStatus: async (id) => {
    console.log(`[API] Toggling stock status for product ID: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 400);
    });
  }
};

export default productCatalogService;
