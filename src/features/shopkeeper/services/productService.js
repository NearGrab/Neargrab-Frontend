import apiClient from '../../../shared/services/apiClient';

/**
 * Service to manage Product API lifecycles, category list retrieval, and brand search.
 */
export const productService = {
  /**
   * Fetch single product details.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getProduct: async (id) => {
    const res = await apiClient.get(`/shopkeeper/products/${id}`);
    return res;
  },

  /**
   * Publish a new product to the live customer-facing catalog.
   * @param {Object} productData 
   * @returns {Promise<Object>}
   */
  createProduct: async (productData) => {
    const res = await apiClient.post('/shopkeeper/products', productData);
    return res;
  },

  /**
   * Update product attributes, prices, tags, categories, or details.
   * @param {string} id
   * @param {Object} productData
   * @returns {Promise<Object>}
   */
  updateProduct: async (id, productData) => {
    const res = await apiClient.patch(`/shopkeeper/products/${id}`, productData);
    return res;
  },

  /**
   * Get active categories.
   * @returns {Promise<Object>}
   */
  getCategories: async () => {
    const res = await apiClient.get('/categories');
    return res;
  },

  /**
   * Get brands by query.
   * @param {string} q
   * @returns {Promise<Object>}
   */
  getBrands: async (q) => {
    const res = await apiClient.get('/brands', { params: { q } });
    return res;
  }
};

export default productService;
