import apiClient from '../../../shared/services/apiClient';
import { mapBackendProductToFrontend } from '../../../shared/utils/mappers';

export const productService = {
  /**
   * Fetch rich product details.
   */
  async getProductDetails(productId) {
    const { data } = await apiClient.get(`/api/v1/products/${productId}`);
    
    const shop = data.shop || {};
    const address = shop.address || {};
    
    const soldBy = {
      id: shop.id,
      name: shop.name,
      slug: shop.slug || shop.username,
      verified: shop.verificationStatus === 'VERIFIED',
      rating: shop.ratingAvg || 0,
      reviewsCount: shop.ratingCount || 0,
      category: 'Grocery, Daily Needs',
      status: 'Open now',
      timings: 'Closes 10:00 PM',
      distance: typeof shop.distanceKm === 'number' ? Number(shop.distanceKm.toFixed(1)) : 0.5,
      delivery: 'Not available',
      address: `${address.street || ''}, ${address.city || ''} - ${address.pincode || ''}`.replace(/^,\s*/, ''),
      image: shop.logo?.url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
      googleMapsUrl: shop.googleMapsUrl || ''
    };

    const specs = [
      data.size ? `${data.size} ${data.unit || ''}`.trim() : '1 Unit',
      data.category?.name || 'Grocery',
      data.brand?.name || 'Local Brand'
    ];

    const images = Array.isArray(data.images) && data.images.length > 0
      ? data.images.map(img => img.url || img.media?.url).filter(Boolean)
      : ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'];

    return {
      id: data.id,
      name: data.name,
      brand: data.brand?.name || '',
      category: data.category?.name || 'Grocery',
      size: data.size ? `${data.size} ${data.unit || ''}`.trim() : '1 Unit',
      specs,
      rating: data.ratingAvg || 0,
      reviewsCount: data.reviewCount || 0,
      boughtThisWeek: data.viewCount > 50 ? `${data.viewCount}+ viewed recently` : '100+ viewed recently',
      price: typeof data.pricePaise === 'number' ? data.pricePaise / 100 : 0,
      originalPrice: typeof data.mrpPaise === 'number' ? data.mrpPaise / 100 : null,
      discount: (data.mrpPaise && data.pricePaise && data.mrpPaise > data.pricePaise)
        ? `${Math.round(((data.mrpPaise - data.pricePaise) / data.mrpPaise) * 100)}% OFF`
        : null,
      inStock: data.stockStatus === 'IN_STOCK' || data.stockAvailable,
      description: data.description || '',
      images,
      uspBadges: ['100% Original', 'Best Quality', 'Trusted by Locals', 'Secure Info'],
      soldBy,
      isSaved: data.isSaved || false,
      reviewSummary: data.reviewSummary || {
        average: data.ratingAvg || 0,
        count: data.reviewCount || 0,
        breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      }
    };
  },

  /**
   * Return available stores selling this product with distance, rating, price, and stock status.
   */
  async getAvailableStores(productId, locationParams = {}) {
    const { data } = await apiClient.get(`/api/v1/products/${productId}/stores`, {
      params: {
        city: locationParams.city || undefined,
        latitude: locationParams.latitude || undefined,
        longitude: locationParams.longitude || undefined,
        radiusKm: locationParams.radiusKm || undefined
      }
    });

    return (data || []).map(item => ({
      id: item.shop.id,
      name: item.shop.name,
      verified: item.shop.verificationStatus === 'VERIFIED',
      distance: typeof item.distanceKm === 'number' ? Number(item.distanceKm.toFixed(1)) : 0.5,
      price: typeof item.pricePaise === 'number' ? item.pricePaise / 100 : 0,
      rating: item.shop.ratingAvg || 0,
      reviewsCount: item.shop.ratingCount || 0,
      inStock: item.stockStatus === 'IN_STOCK',
      category: 'Grocery, Daily Needs',
      image: item.shop.logo?.url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
      address: `${item.shop.address?.street || ''}, ${item.shop.address?.city || ''} - ${item.shop.address?.pincode || ''}`.replace(/^,\s*/, ''),
      googleMapsUrl: item.shop.googleMapsUrl || ''
    }));
  },

  /**
   * Return top-rated customer reviews for this specific product.
   */
  async getTopReviews(productId, limit = 10) {
    const { data } = await apiClient.get(`/api/v1/products/${productId}/reviews`, {
      params: { limit, sort: 'newest' }
    });

    return (data || []).map(rev => ({
      id: rev.id,
      user: rev.user?.name || 'Anonymous User',
      avatar: rev.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      rating: rev.rating || 0,
      time: rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent',
      verifiedPurchase: rev.verifiedPurchase ?? false,
      comment: rev.comment || ''
    }));
  },

  /**
   * Resolves similar products from the search database.
   */
  async getSimilarProducts(productId, locationParams = {}) {
    const { data } = await apiClient.get(`/api/v1/products/${productId}/similar`, {
      params: { city: locationParams.city || undefined, limit: 10 }
    });
    return (data || []).map(mapBackendProductToFrontend);
  },

  /**
   * Return custom thumbnail-rich reviews for the directions & reviews page.
   */
  async getMapReviews(productId) {
    const { data } = await apiClient.get(`/api/v1/products/${productId}/reviews`, {
      params: { limit: 5, sort: 'newest' }
    });

    return (data || []).map(rev => ({
      id: rev.id,
      user: rev.user?.name || 'Anonymous User',
      avatar: rev.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      time: rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent',
      rating: rev.rating || 0,
      comment: rev.comment || '',
      verifiedPurchase: rev.verifiedPurchase ?? false,
      thumbnail: rev.media?.[0]?.url || null
    }));
  },

  /**
   * Submit a new product review.
   */
  async createProductReview(productId, reviewData) {
    const { data } = await apiClient.post(`/api/v1/products/${productId}/reviews`, {
      rating: reviewData.rating,
      comment: reviewData.comment
    });
    return data;
  },

  /**
   * Save a product to favorites list.
   */
  async saveProduct(productId) {
    const { data } = await apiClient.post(`/api/v1/products/${productId}/save`);
    return data;
  },

  /**
   * Remove a product from favorites list.
   */
  async unsaveProduct(productId) {
    const { data } = await apiClient.delete(`/api/v1/products/${productId}/save`);
    return data;
  },

  /**
   * Track product view count.
   */
  async trackProductView(productId, shopId) {
    try {
      await apiClient.post(`/api/v1/products/${productId}/view`, {
        source: 'PRODUCT_PAGE',
        shopId: shopId || undefined
      });
    } catch (err) {
      console.error('Failed to log product view:', err);
    }
  },

  /**
   * Track product click count.
   */
  async trackProductClick(productId) {
    try {
      await apiClient.post(`/api/v1/products/${productId}/click`);
    } catch (err) {
      console.error('Failed to log product click:', err);
    }
  },

  /**
   * Submit product report/feedback.
   */
  async createProductFeedback(productId, feedbackData) {
    const { data } = await apiClient.post(`/api/v1/products/${productId}/feedback`, {
      type: feedbackData.type || 'PRODUCT_REPORT',
      subject: feedbackData.subject,
      message: feedbackData.message,
      metadata: feedbackData.metadata || {}
    });
    return data;
  }
};
