/**
 * Simple asynchronous network client to manage Product API lifecycles.
 * Decouples form presentation layers from HTTP layers for easy, clean server migrations later.
 */
export const productService = {
  /**
   * Save product details as a draft.
   * @param {Object} productData 
   * @returns {Promise<Object>}
   */
  saveDraft: async (productData) => {
    console.log('[API] Saving product draft...', productData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Draft saved successfully' });
      }, 600);
    });
  },

  /**
   * Publish a new product to the live customer-facing catalog.
   * @param {Object} productData 
   * @returns {Promise<Object>}
   */
  publishProduct: async (productData) => {
    console.log('[API] Publishing product to catalog...', productData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Product published successfully' });
      }, 800);
    });
  }
};

export default productService;
