// High-fidelity Unsplash images for cooking oil products to deliver an extremely polished visual experience
const UNSPLASH_IMAGES = {
  fortune1l: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  saffola1l: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80',
  gemini1l: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
  dhara1l: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  naturefresh1l: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80',
  fortune2l: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
  saffola2l: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  gemini5l: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80',
  fortune500ml: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
  dharacold1l: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  naturefreshcold1l: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80'
};

// Local data models of products, stores, and ratings matching the design diagram perfectly
const MOCK_PRODUCTS = [
  {
    id: 'prod-fortune-1l',
    name: 'Fortune Sunlite Refined Sunflower Oil 1L',
    brand: 'Fortune',
    category: 'Refined',
    size: '1 Litre',
    price: 145,
    originalPrice: 160,
    discount: '10% OFF',
    store: 'Patel General Store',
    verified: true,
    rating: 4.7,
    reviewsCount: 128,
    distance: 0.2,
    inStock: true,
    image: UNSPLASH_IMAGES.fortune1l
  },
  {
    id: 'prod-saffola-1l',
    name: 'Saffola Gold Refined Sunflower Oil 1L',
    brand: 'Saffola',
    category: 'Refined',
    size: '1 Litre',
    price: 160,
    originalPrice: 175,
    discount: '8% OFF',
    store: 'Jain Kirana Store',
    verified: true,
    rating: 4.5,
    reviewsCount: 96,
    distance: 0.4,
    inStock: true,
    image: UNSPLASH_IMAGES.saffola1l
  },
  {
    id: 'prod-gemini-1l',
    name: 'Gemini Refined Sunflower Oil 1L',
    brand: 'Gemini',
    category: 'Refined',
    size: '1 Litre',
    price: 142,
    originalPrice: 158,
    discount: '10% OFF',
    store: 'Shree Provision Store',
    verified: true,
    rating: 4.5,
    reviewsCount: 96,
    distance: 0.4,
    inStock: true,
    image: UNSPLASH_IMAGES.gemini1l
  },
  {
    id: 'prod-dhara-1l',
    name: 'Dhara Refined Sunflower Oil 1L',
    brand: 'Dhara',
    category: 'Refined',
    size: '1 Litre',
    price: 140,
    originalPrice: 160,
    discount: '10% OFF',
    store: 'Shree Hardware',
    verified: false,
    rating: 4.3,
    reviewsCount: 64,
    distance: 0.6,
    inStock: true,
    image: UNSPLASH_IMAGES.dhara1l
  },
  {
    id: 'prod-naturefresh-1l',
    name: 'Nature Fresh Sunflower Oil 1L',
    brand: 'Nature Fresh',
    category: 'Refined',
    size: '1 Litre',
    price: 138,
    originalPrice: 150,
    discount: '8% OFF',
    store: 'Patel Fruits Center',
    verified: true,
    rating: 4.3,
    reviewsCount: 58,
    distance: 0.7,
    inStock: true,
    image: UNSPLASH_IMAGES.naturefresh1l
  },
  {
    id: 'prod-fortune-2l',
    name: 'Fortune Sunlite Refined Sunflower Oil 2L',
    brand: 'Fortune',
    category: 'Refined',
    size: '2 Litre',
    price: 285,
    originalPrice: 305,
    discount: '6% OFF',
    store: 'Patel General Store',
    verified: true,
    rating: 4.7,
    reviewsCount: 128,
    distance: 0.2,
    inStock: true,
    image: UNSPLASH_IMAGES.fortune2l
  },
  {
    id: 'prod-saffola-2l',
    name: 'Saffola Gold Refined Sunflower Oil 2L',
    brand: 'Saffola',
    category: 'Refined',
    size: '2 Litre',
    price: 320,
    originalPrice: 350,
    discount: '9% OFF',
    store: 'Jain Kirana Store',
    verified: true,
    rating: 4.5,
    reviewsCount: 96,
    distance: 0.4,
    inStock: true,
    image: UNSPLASH_IMAGES.saffola2l
  },
  {
    id: 'prod-gemini-5l',
    name: 'Gemini Refined Sunflower Oil 5L',
    brand: 'Gemini',
    category: 'Refined',
    size: '5 Litre',
    price: 715,
    originalPrice: 770,
    discount: '7% OFF',
    store: 'Shree Provision Store',
    verified: true,
    rating: 4.4,
    reviewsCount: 74,
    distance: 0.5,
    inStock: true,
    image: UNSPLASH_IMAGES.gemini5l
  },
  {
    id: 'prod-fortune-500ml',
    name: 'Fortune Sunlite Refined Sunflower Oil 500 ml',
    brand: 'Fortune',
    category: 'Refined',
    size: '500 ml',
    price: 75,
    originalPrice: 85,
    discount: '12% OFF',
    store: 'Patel General Store',
    verified: true,
    rating: 4.6,
    reviewsCount: 82,
    distance: 0.2,
    inStock: true,
    image: UNSPLASH_IMAGES.fortune500ml
  },
  {
    id: 'prod-dhara-cold-1l',
    name: 'Dhara Cold Pressed Sunflower Oil 1L',
    brand: 'Dhara',
    category: 'Cold Pressed',
    size: '1 Litre',
    price: 195,
    originalPrice: 220,
    discount: '11% OFF',
    store: 'Shree Provision Store',
    verified: true,
    rating: 4.8,
    reviewsCount: 34,
    distance: 0.4,
    inStock: true,
    image: UNSPLASH_IMAGES.dharacold1l
  },
  {
    id: 'prod-naturefresh-cold-1l',
    name: 'Nature Fresh Cold Pressed Sunflower Oil 1L',
    brand: 'Nature Fresh',
    category: 'Cold Pressed',
    size: '1 Litre',
    price: 180,
    originalPrice: 200,
    discount: '10% OFF',
    store: 'Jain Kirana Store',
    verified: true,
    rating: 4.7,
    reviewsCount: 42,
    distance: 0.4,
    inStock: false,
    image: UNSPLASH_IMAGES.naturefreshcold1l
  }
];

// Popular searches cloud tag suggestions
const POPULAR_SEARCHES = [
  'Sunflower Oil 1L',
  'Fortune Oil',
  'Saffola Gold',
  'Dhara Oil',
  'Cooking Oil',
  'Refined Oil'
];

// Top rated stores side panels
const MOCK_STORES = [
  {
    id: 'store-patel',
    name: 'Patel General Store',
    rating: 4.7,
    reviewsCount: 128,
    distance: 0.2,
    verified: true,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'store-jain',
    name: 'Jain Kirana Store',
    rating: 4.5,
    reviewsCount: 96,
    distance: 0.4,
    verified: true,
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'store-shree-prov',
    name: 'Shree Provision Store',
    rating: 4.4,
    reviewsCount: 74,
    distance: 0.5,
    verified: true,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80'
  }
];

export const searchService = {
  /**
   * Return a list of text suggestions based on partial user input.
   * Matches product names, brands, categories.
   */
  async getSuggestions(query) {
    if (!query || query.trim().length < 2) return [];
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        
        // Find matching products
        const matches = MOCK_PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(lowerQuery) || 
          p.brand.toLowerCase().includes(lowerQuery) || 
          p.category.toLowerCase().includes(lowerQuery)
        ).map(p => p.name);
        
        // Add some generic brand terms if matching
        const uniqueMatches = Array.from(new Set([
          ...matches,
          ...(lowerQuery.startsWith('sa') ? ['Saffola Gold', 'Saffola Cooking Oil'] : []),
          ...(lowerQuery.startsWith('fo') ? ['Fortune Oil', 'Fortune Sunlite'] : []),
          ...(lowerQuery.startsWith('su') ? ['Sunflower Oil', 'Sunflower Oil 1L'] : [])
        ])).slice(0, 7);

        resolve(uniqueMatches);
      }, 100);
    });
  },

  /**
   * Resolves products according to multi-parameter query filters.
   */
  async searchProducts(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...MOCK_PRODUCTS];
        const {
          query = '',
          distance = 'Within 3 km',
          customDistance = '',
          minPrice = 0,
          maxPrice = 1000,
          brands = [],
          packSizes = [],
          inStockOnly = false,
          categoryTab = 'All', // 'All', '1 Litre', '2 Litre', '500 ml', '5 Litre', 'Refined', 'Cold Pressed'
          sortBy = 'Relevance' // 'Relevance', 'Price: Low to High', 'Price: High to Low', 'Distance', 'Top Rated'
        } = filters;

        // 1. Text Query Filter
        if (query) {
          const lowerQ = query.toLowerCase();
          results = results.filter(p => 
            p.name.toLowerCase().includes(lowerQ) ||
            p.brand.toLowerCase().includes(lowerQ) ||
            p.category.toLowerCase().includes(lowerQ)
          );
        }

        // 2. Distance Filter
        const parsedDistance = customDistance ? parseFloat(customDistance) : null;
        if (parsedDistance !== null && !isNaN(parsedDistance)) {
          results = results.filter(p => p.distance <= parsedDistance);
        } else {
          const distLimits = {
            'Within 1 km': 1.0,
            'Within 3 km': 3.0,
            'Within 5 km': 5.0,
            'Within 10 km': 10.0
          };
          const limit = distLimits[distance] || 100.0;
          results = results.filter(p => p.distance <= limit);
        }

        // 3. Price Filter
        results = results.filter(p => p.price >= minPrice && p.price <= maxPrice);

        // 4. Multi-brand Checkboxes
        if (brands && brands.length > 0) {
          results = results.filter(p => brands.includes(p.brand));
        }

        // 5. Pack Sizes Checkboxes
        if (packSizes && packSizes.length > 0) {
          results = results.filter(p => packSizes.includes(p.size));
        }

        // 6. In Stock Toggle
        if (inStockOnly) {
          results = results.filter(p => p.inStock);
        }

        // 7. Category Tab (All, 1 Litre, etc.)
        if (categoryTab !== 'All') {
          if (categoryTab === 'Refined' || categoryTab === 'Cold Pressed') {
            results = results.filter(p => p.category === categoryTab);
          } else {
            // Sizing tab (1 Litre, 2 Litre, etc.)
            results = results.filter(p => p.size.toLowerCase() === categoryTab.toLowerCase());
          }
        }

        // 8. Sorting Logic
        if (sortBy === 'Price: Low to High') {
          results.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
          results.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Distance') {
          results.sort((a, b) => a.distance - b.distance);
        } else if (sortBy === 'Top Rated') {
          results.sort((a, b) => b.rating - a.rating);
        } else {
          // Default Relevance (by distance + rating)
          results.sort((a, b) => (a.distance * 0.4 - a.rating * 0.6) - (b.distance * 0.4 - b.rating * 0.6));
        }

        resolve({
          products: results,
          totalCount: results.length,
          storesCount: Array.from(new Set(results.map(p => p.store))).length
        });
      }, 150);
    });
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
  async getTopRatedStores() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_STORES);
      }, 80);
    });
  }
};
