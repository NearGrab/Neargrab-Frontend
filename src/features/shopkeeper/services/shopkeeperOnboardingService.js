import apiClient from '../../../shared/services/apiClient';

export const shopkeeperOnboardingService = {
  /**
   * Get current onboarding progress.
   * @returns {Promise<Object>}
   */
  async getOnboardingState() {
    const response = await apiClient.get('/api/v1/shopkeeper/onboarding');
    return response;
  },

  /**
   * Start onboarding with initial data.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async startOnboarding(data) {
    const response = await apiClient.post('/api/v1/shopkeeper/onboarding', data);
    return response;
  },

  /**
   * Update primary details.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updateDetails(data) {
    const response = await apiClient.patch('/api/v1/shopkeeper/onboarding/details', data);
    return response;
  },

  /**
   * Update address/location.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updateAddress(data) {
    const response = await apiClient.patch('/api/v1/shopkeeper/onboarding/address', data);
    return response;
  },

  /**
   * Update contact.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updateContact(data) {
    const response = await apiClient.patch('/api/v1/shopkeeper/onboarding/contact', data);
    return response;
  },

  /**
   * Update business details.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updateBusiness(data) {
    const response = await apiClient.patch('/api/v1/shopkeeper/onboarding/business', data);
    return response;
  },

  /**
   * Update photos.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async updatePhotos(data) {
    const response = await apiClient.patch('/api/v1/shopkeeper/onboarding/photos', data);
    return response;
  },

  /**
   * Submit onboarding draft.
   * @returns {Promise<Object>}
   */
  async submitOnboarding() {
    const response = await apiClient.post('/api/v1/shopkeeper/onboarding/submit');
    return response;
  },

  /**
   * Get category options.
   * @returns {Promise<Object>}
   */
  async getCategories() {
    const response = await apiClient.get('/api/v1/categories');
    return response;
  }
};

export default shopkeeperOnboardingService;
