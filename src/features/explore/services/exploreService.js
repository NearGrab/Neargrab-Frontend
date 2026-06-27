import apiClient from '../../../shared/services/apiClient';
import { mapBackendProductToFrontend } from '../../../shared/utils/mappers';

/**
 * Service to fetch explore feed and home dashboard data from the production API.
 */
export const exploreService = {
  /**
   * Fetches explore dashboard data using coordinates and location filters.
   */
  async getExploreDashboardData(params = {}) {
    const { data: responseData } = await apiClient.get('/api/v1/explore', { params });
    const data = responseData || {};
    
    // Fallback constants/mocks for fields not supplied by backend
    const staticProps = {
      currentUser: {
        name: "Guest",
        avatar: "",
        location: {
          city: params.city || "Navsari",
          state: "Gujarat",
          radius: params.radiusKm ? `Within ${params.radiusKm} km` : "Within 3 km"
        }
      },
      valueProps: [
        { id: "convenient", title: "Nearby & Convenient", description: "Find what you need around you." },
        { id: "trusted", title: "Trusted & Verified", description: "Verified shops with real reviews." },
        { id: "prices", title: "Best Prices", description: "Compare and choose the best deals." },
        { id: "delivery", title: "No Delivery Fee", description: "Buy nearby, save more." }
      ],
      listShopCTA: {
        heading: "List your shop on Neargrab",
        description: "Get discovered by thousands of nearby customers.",
        buttonText: "List Your Shop"
      },
      realReviews: [
        {
          id: "rev-1",
          user: "Neha P.",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          time: "2 days ago",
          rating: 5.0,
          comment: "Great quality and fresh products. Very helpful shopkeeper!",
          storeName: "Patel Daily Mart"
        },
        {
          id: "rev-2",
          user: "Rohit S.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          time: "1 week ago",
          rating: 5.0,
          comment: "Found exact product nearby. Saved time and money.",
          storeName: "Shah Electronics Hub"
        }
      ]
    };

    // Hero Banner from backend banners if present, else default
    const banner = data.banners?.[0];
    const heroBanner = banner ? {
      tagline: "Featured Offer 📢",
      headingLine1: banner.title,
      headingLine2: "",
      description: "Click to explore featured local shops and exclusive nearby offers.",
      buttonText: "Check Details",
      image: banner.image?.url || "https://placehold.co/1200x800",
      shopId: banner.shopId,
      productId: banner.productId
    } : {
      tagline: "Support Local 🌾",
      headingLine1: "Shop Local.",
      headingLine2: "Strengthen Community.",
      description: "Discover trusted local shops and find everything you need nearby.",
      buttonText: "Explore Now",
      image: "/assets/Explore/explore_hero.webp"
    };

    // Categories
    const categories = (data.categories || []).map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon || "Grocery"
    }));
    // Add "More" item if category list is present
    if (categories.length > 0) {
      categories.push({ id: "more", name: "More", icon: "More" });
    }

    // Nearby Stores
    const stores = (data.nearbyShops || []).map(shop => ({
      id: shop.id,
      slug: shop.slug || null,
      name: shop.name,
      tags: ['Grocery', 'Local'],
      distance: typeof shop.distanceKm === 'number' ? Number(shop.distanceKm.toFixed(1)) : 0.5,
      rating: shop.ratingAvg || 4.5,
      reviewsCount: shop.reviewCount || 10,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
    }));

    // Top Picks
    const topPicks = (data.sections?.topPicks || data.topProducts || []).map(mapBackendProductToFrontend);

    // Top Offers (can use popularNearby, or from top products list)
    const topOffers = (data.sections?.popularNearby || data.topProducts || []).map(mapBackendProductToFrontend);

    const realReviews = Array.isArray(data.realReviews) && data.realReviews.length > 0
      ? data.realReviews
      : staticProps.realReviews;

    return {
      ...staticProps,
      realReviews,
      heroBanner,
      categories,
      stores,
      topPicks,
      topOffers
    };
  },

  /**
   * Fetches category list.
   */
  async getCategories(params = {}) {
    const { data } = await apiClient.get('/api/v1/categories', { params });
    return data || [];
  },

  /**
   * Fetches brand list.
   */
  async getBrands(params = {}) {
    const { data } = await apiClient.get('/api/v1/brands', { params });
    return data || [];
  }
};
