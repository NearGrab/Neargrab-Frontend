import apiClient from '../../../shared/services/apiClient';

/**
 * Service to manage Product Catalog queries, filters, deletions, and stock status updates.
 */
export const productCatalogService = {
  /**
   * Fetch all product entries from the shopkeeper inventory.
   * @param {Object} params
   * @returns {Promise<Object>}
   */
  getProducts: async ({ q, categoryId, stockStatus, page = 1, limit = 20 } = {}) => {
    const params = {};
    if (q) params.q = q;
    if (categoryId && categoryId !== 'All Categories') params.categoryId = categoryId;
    
    if (stockStatus && stockStatus !== 'All') {
      if (stockStatus === 'In Stock') params.stockStatus = 'IN_STOCK';
      else if (stockStatus === 'Out Of Stock') params.stockStatus = 'OUT_OF_STOCK';
      else if (stockStatus === 'Low Stock') params.stockStatus = 'LOW_STOCK';
    }
    
    params.page = page;
    params.limit = limit;

    const res = await apiClient.get('/shopkeeper/products', { params });
    return res;
  },

  /**
   * Toggle stock availability status.
   * @param {string} id
   * @param {Object} stockDetails
   * @returns {Promise<Object>}
   */
  toggleStockStatus: async (id, { stockAvailable, stockCount, stockStatus }) => {
    const res = await apiClient.patch(`/shopkeeper/products/${id}/stock`, {
      stockAvailable,
      stockCount,
      stockStatus
    });
    return res;
  },

  /**
   * Delete product entry.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  deleteProduct: async (id) => {
    const res = await apiClient.delete(`/shopkeeper/products/${id}`);
    return res;
  },

  /**
   * Perform bulk operation on multiple product IDs.
   * @param {Object} bulkPayload
   * @returns {Promise<Object>}
   */
  bulkOperation: async ({ productIds, action, stockAvailable, stockStatus }) => {
    const res = await apiClient.post('/shopkeeper/products/bulk', {
      productIds,
      action,
      stockAvailable,
      stockStatus
    });
    return res;
  }
};

export default productCatalogService;
