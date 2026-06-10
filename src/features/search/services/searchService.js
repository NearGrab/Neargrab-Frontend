import apiClient from '../../../shared/services/apiClient';
import { mapBackendProductToFrontend } from '../../../shared/utils/mappers';

const POPULAR_SEARCHES = [
  'Sunflower Oil 1L',
  'Fortune Oil',
  'Saffola Gold',
  'Dhara Oil',
  'Cooking Oil',
  'Refined Oil'
];

export const searchService = {
  /**
   * Return a list of text suggestions based on partial user input.
   */
  async getSuggestions(query, city) {
    if (!query || query.trim().length < 2) return [];
    try {
      const { data } = await apiClient.get('/api/v1/search/suggestions', {
        params: { q: query, city }
      });
      const list = [
        ...(data.products || []).map(p => p.label),
        ...(data.categories || []).map(c => c.label),
        ...(data.brands || []).map(b => b.label),
        ...(data.popular || []).map(e => e.label)
      ];
      return Array.from(new Set(list)).slice(0, 7);
    } catch (err) {
      console.error('Failed to fetch autocomplete suggestions:', err);
      return [];
    }
  },

  /**
   * Log search queries and result count metrics.
   */
  async logSearchEvent(eventData) {
    try {
      await apiClient.post('/api/v1/search/events', {
        query: eventData.query,
        city: eventData.city || null,
        latitude: eventData.latitude || null,
        longitude: eventData.longitude || null,
        radiusKm: eventData.radiusKm || null,
        filters: eventData.filters || {},
        resultCount: eventData.resultCount || 0
      });
    } catch (err) {
      console.error('Failed to log search event:', err);
    }
  },

  /**
   * Create custom missing product request.
   */
  async requestMissingProduct(requestData) {
    const { data } = await apiClient.post('/api/v1/product-requests', {
      query: requestData.query,
      categoryId: requestData.categoryId || null,
      productId: requestData.productId || null,
      city: requestData.city || null,
      latitude: requestData.latitude || null,
      longitude: requestData.longitude || null,
      radiusKm: requestData.radiusKm || null
    });
    return data;
  },

  /**
   * Resolves products according to multi-parameter query filters.
   */
  async searchProducts(filters = {}) {
    const {
      query = '',
      distance = 'Within 3 km',
      customDistance = '',
      minPrice = 0,
      maxPrice = 1000,
      brands = [],
      packSizes = [],
      inStockOnly = false,
      categoryTab = 'All', // 'All', 'Refined', 'Cold Pressed', etc.
      sortBy = 'Relevance', // 'Relevance', 'Price: Low to High', 'Price: High to Low', 'Distance', 'Top Rated'
      city,
      latitude,
      longitude,
      radiusKm,
      page = 1,
      limit = 20
    } = filters;

    // Map frontend sortBy to backend sort
    let sort = 'relevance';
    if (sortBy === 'Price: Low to High') sort = 'price_asc';
    else if (sortBy === 'Price: High to Low') sort = 'price_desc';
    else if (sortBy === 'Distance') sort = 'distance';
    else if (sortBy === 'Top Rated') sort = 'rating';

    // Parse distance limits
    let finalRadiusKm = radiusKm;
    if (!finalRadiusKm) {
      const parsedDistance = customDistance ? parseFloat(customDistance) : null;
      if (parsedDistance !== null && !isNaN(parsedDistance)) {
        finalRadiusKm = parsedDistance;
      } else {
        const distLimits = {
          'Within 1 km': 1.0,
          'Within 3 km': 3.0,
          'Within 5 km': 5.0,
          'Within 10 km': 10.0
        };
        finalRadiusKm = distLimits[distance] || 10.0;
      }
    }

    // Call production backend search API (fetch a large list if local filtering is required, otherwise standard)
    const response = await apiClient.get('/api/v1/search/products', {
      params: {
        q: query || undefined,
        city: city || undefined,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
        radiusKm: finalRadiusKm || undefined,
        minPricePaise: minPrice ? minPrice * 100 : undefined,
        maxPricePaise: maxPrice ? maxPrice * 100 : undefined,
        sort,
        limit: 100 // fetch up to 100 to allow local brand/size filtering and pagination
      }
    });

    let results = (response.data || []).map(mapBackendProductToFrontend);

    // Apply frontend-specific filters locally to support multiple selections
    if (brands && brands.length > 0) {
      results = results.filter(p => p.brand && brands.map(b => b.toLowerCase()).includes(p.brand.toLowerCase()));
    }

    if (packSizes && packSizes.length > 0) {
      results = results.filter(p => packSizes.map(s => s.toLowerCase()).includes(p.size.toLowerCase()));
    }

    if (inStockOnly) {
      results = results.filter(p => p.inStock);
    }

    // Category tab filtration (e.g. "Refined", "Cold Pressed", or specific sizing tabs)
    if (categoryTab !== 'All') {
      if (categoryTab === 'Refined' || categoryTab === 'Cold Pressed') {
        results = results.filter(p => p.category && p.category.toLowerCase() === categoryTab.toLowerCase());
      } else {
        results = results.filter(p => p.size && p.size.toLowerCase() === categoryTab.toLowerCase());
      }
    }

    // Calculate unique stores count
    const uniqueStores = Array.from(new Set(results.map(p => p.store))).filter(Boolean);

    // Local pagination calculation
    const totalCount = results.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedProducts = results.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      totalCount,
      storesCount: uniqueStores.length,
      meta: {
        page: currentPage,
        limit,
        total: totalCount,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      }
    };
  },

  /**
   * Return popular searches tag items.
   */
  getPopularSearches() {
    return POPULAR_SEARCHES;
  },

  /**
   * Return nearby active top-rated stores.
   */
  async getTopRatedStores(city = 'Navsari') {
    try {
      const { data } = await apiClient.get('/api/v1/explore', {
        params: { city }
      });
      return (data.nearbyShops || []).slice(0, 3).map(shop => ({
        id: shop.id,
        name: shop.name,
        rating: shop.ratingAvg || 4.5,
        reviewsCount: shop.reviewCount || 10,
        distance: shop.distanceKm !== null && shop.distanceKm !== undefined ? Number(shop.distanceKm.toFixed(1)) : 0.5,
        verified: shop.verificationStatus === 'VERIFIED',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
      }));
    } catch (err) {
      console.error('Failed to fetch top rated stores:', err);
      return [];
    }
  }
};
