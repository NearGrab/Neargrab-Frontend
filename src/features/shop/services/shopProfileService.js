import apiClient from '../../../shared/services/apiClient';
import { mapBackendShopToFrontend, mapBackendProductToFrontend } from '../../../shared/utils/mappers';

/**
 * Service to manage Public Shop Profile API integration.
 */
export const shopProfileService = {
  /**
   * Fetch full shop profile details.
   */
  async getShopProfile(shopId) {
    const { data } = await apiClient.get(`/api/v1/shops/${shopId}`);
    return mapBackendShopToFrontend(data);
  },

  /**
   * Save updated profile details (Merchant Auth needed).
   */
  async updateProfile(shopId, profileData) {
    const { data } = await apiClient.put(`/api/v1/shops/${shopId}`, profileData);
    return data;
  },

  /**
   * Fetch customer ratings reviews.
   */
  async getReviews(shopId) {
    const { data } = await apiClient.get(`/api/v1/shops/${shopId}/reviews`);
    return (data || []).map(rev => ({
      id: rev.id,
      user: rev.user?.name || 'Anonymous User',
      reviewerName: rev.user?.name || 'Anonymous User',
      avatar: rev.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      rating: rev.rating || 5,
      time: rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent',
      dateRelative: rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent',
      verifiedPurchase: rev.verifiedPurchase ?? true,
      isVerified: rev.verifiedPurchase ?? true,
      comment: rev.comment || ''
    }));
  },

  /**
   * Fetch live listed products for this shop.
   */
  async getProducts(shopId) {
    const { data } = await apiClient.get(`/api/v1/shops/${shopId}/products`);
    return (data || []).map(mapBackendProductToFrontend);
  },

  /**
   * Fetch relative announcements updates.
   */
  async getUpdates(shopId) {
    const { data } = await apiClient.get(`/api/v1/shops/${shopId}/updates`);
    return (data || []).map(upd => ({
      id: upd.id,
      title: upd.title || 'Shop Update',
      description: upd.content || upd.description || '',
      date: upd.createdAt ? new Date(upd.createdAt).toLocaleDateString() : 'Recent',
      image: upd.image?.url || upd.media?.[0]?.url || null,
      type: upd.type || 'ANNOUNCEMENT'
    }));
  },

  /**
   * Track customer actions (Directions, Call, WhatsApp).
   */
  async trackLead(shopId, action) {
    try {
      await apiClient.post(`/api/v1/shops/${shopId}/lead`, { action });
    } catch (err) {
      console.error('Failed to log shop lead event:', err);
    }
  },

  /**
   * Submit review for a shop.
   */
  async submitReview(shopId, reviewData) {
    const { data } = await apiClient.post(`/api/v1/shops/${shopId}/reviews`, {
      rating: reviewData.rating,
      comment: reviewData.comment
    });
    return data;
  }
};

export default shopProfileService;
