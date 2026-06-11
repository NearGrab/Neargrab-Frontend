import apiClient from './apiClient';

export const mediaService = {
  /**
   * Upload a single file.
   * @param {File} file
   * @returns {Promise<Object>}
   */
  async uploadSingle(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/api/v1/media/upload', formData);
    return response;
  },

  /**
   * Upload multiple files (up to 10).
   * @param {File[]} files
   * @returns {Promise<Object[]>}
   */
  async uploadBulk(files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    const response = await apiClient.post('/api/v1/media/upload/bulk', formData);
    return response;
  },

  /**
   * Delete a media asset by ID.
   * @param {string} mediaId
   * @returns {Promise<Object>}
   */
  async deleteMedia(mediaId) {
    const response = await apiClient.delete(`/api/v1/media/${mediaId}`);
    return response;
  }
};

export default mediaService;
