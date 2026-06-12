import apiClient from './apiClient';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf'
];

function validateFile(file) {
  if (!file) {
    throw new Error('No file provided for upload.');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File "${file.name}" exceeds the maximum limit of 5MB.`);
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`File "${file.name}" has an unsupported format. Supported formats are: JPEG, PNG, WEBP, GIF, and PDF.`);
  }
}

export const mediaService = {
  /**
   * Upload a single file.
   * @param {File} file
   * @returns {Promise<Object>}
   */
  async uploadSingle(file) {
    validateFile(file);
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
    if (files.length > 10) {
      throw new Error('You can upload a maximum of 10 files at once.');
    }
    for (const file of files) {
      validateFile(file);
    }
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

