import { searchService } from '../../search/services/searchService';

// High-fidelity Unsplash images representing multiple angles of a sunflower oil / cooking oil bottle
const MULTI_ANGLE_IMAGES = [
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', // Front angle (proven working)
  'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80', // Zoom in detail
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80', // Lifestyle context on kitchen shelf
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', // Physical storefront placement
  'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80'  // Hand pouring / ingredient zoom
];

// Fallback high-fidelity details mapping for sunflower cooking oils
const DETAILED_PRODUCTS_DB = {
  'prod-fortune-1l': {
    id: 'prod-fortune-1l',
    name: 'Fortune Sunlite Refined Sunflower Oil 1L',
    brand: 'Fortune',
    category: 'Refined',
    size: '1 Litre',
    specs: ['1 Litre', 'Refined', 'Sunflower Oil'],
    rating: 4.6,
    reviewsCount: 152,
    boughtThisWeek: '2K+ bought this week',
    price: 145,
    originalPrice: 160,
    discount: '10% OFF',
    inStock: true,
    description: 'Fortune Sunlite is a healthy choice for your family. It is a light and healthy oil that is rich in Vitamin A, D & E and has the goodness of Sunflower. It helps preserve the natural flavor of food cooked in it, keeping your family active and energetic all day long.',
    images: MULTI_ANGLE_IMAGES,
    uspBadges: ['100% Original', 'Best Quality', 'Trusted by Locals', 'Secure Info'],
    soldBy: {
      id: 'store-patel',
      name: 'Patel General Store',
      verified: true,
      rating: 4.7,
      reviewsCount: 128,
      category: 'Grocery, Daily Needs',
      status: 'Open now',
      timings: 'Closes 10:00 PM',
      distance: 0.2,
      delivery: 'Not available',
      address: 'Shop No. 12, GIDC Road, Navsari, Gujarat - 396445',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
    }
  }
};

export const productService = {
  /**
   * Fetch rich product details. If dynamic productId is not fortune oil, 
   * we dynamically resolve and adapt it from the global search mock catalog.
   */
  async getProductDetails(productId) {
    return new Promise(async (resolve) => {
      // 1. Check if we have absolute explicit details in our DB
      if (DETAILED_PRODUCTS_DB[productId]) {
        resolve(DETAILED_PRODUCTS_DB[productId]);
        return;
      }

      // 2. Otherwise, fetch the product from global search service
      const response = await searchService.searchProducts({});
      const matchedProd = response.products.find(p => p.id === productId) || response.products[0];
      
      // Adapt base product to detailed structure
      const adaptedDetail = {
        id: matchedProd.id,
        name: matchedProd.name,
        brand: matchedProd.brand,
        category: matchedProd.category,
        size: matchedProd.size,
        specs: [matchedProd.size, matchedProd.category, matchedProd.brand + ' Oil'],
        rating: matchedProd.rating,
        reviewsCount: matchedProd.reviewsCount,
        boughtThisWeek: '500+ bought this week',
        price: matchedProd.price,
        originalPrice: matchedProd.originalPrice,
        discount: matchedProd.discount,
        inStock: matchedProd.inStock,
        description: `${matchedProd.name} is selected from the premium golden seeds, delivered to local shelves fresh from nearby stores. Ideal for light deep frying, roasting, and authentic home culinary creations, packed with goodness and verified pure by local merchants.`,
        images: [
          matchedProd.image,
          ...MULTI_ANGLE_IMAGES.slice(1) // Adapt alternative thumbnails dynamically
        ],
        uspBadges: ['100% Original', 'Best Quality', 'Trusted by Locals', 'Secure Info'],
        soldBy: {
          id: matchedProd.id.includes('fortune') ? 'store-patel' : matchedProd.id.includes('saffola') ? 'store-jain' : 'store-shree-prov',
          name: matchedProd.store,
          verified: matchedProd.verified,
          rating: matchedProd.rating,
          reviewsCount: matchedProd.reviewsCount,
          category: 'Grocery, Daily Needs',
          status: 'Open now',
          timings: 'Closes 9:30 PM',
          distance: matchedProd.distance,
          delivery: matchedProd.distance < 0.5 ? 'Free Delivery' : 'Not available',
          address: matchedProd.id.includes('fortune')
            ? 'Shop No. 12, GIDC Road, Navsari, Gujarat - 396445'
            : matchedProd.id.includes('saffola')
            ? 'Plot 45, Station Road, Navsari, Gujarat - 396401'
            : 'Shop 8-C, Sayaji Road, Navsari, Gujarat - 396445',
          image: matchedProd.id.includes('fortune')
            ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
            : matchedProd.id.includes('saffola')
            ? 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=150&q=80'
            : 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80'
        }
      };

      resolve(adaptedDetail);
    });
  },

  /**
   * Return available stores selling this product with distance, rating, price, and stock status.
   */
  async getAvailableStores(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'store-patel',
            name: 'Patel General Store',
            verified: true,
            distance: 0.2,
            price: 145,
            originalPrice: 160,
            discount: '10% OFF',
            rating: 4.7,
            reviewsCount: 128,
            inStock: true,
            category: 'Grocery, Daily Needs',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'
          },
          {
            id: 'store-jain',
            name: 'Jain Kirana Store',
            verified: true,
            distance: 0.4,
            price: 147,
            originalPrice: 160,
            discount: '8% OFF',
            rating: 4.5,
            reviewsCount: 96,
            inStock: true,
            category: 'Grocery, Personal Care',
            image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=150&q=80'
          },
          {
            id: 'store-shree-prov',
            name: 'Shree Provision Store',
            verified: true,
            distance: 0.5,
            price: 148,
            originalPrice: 160,
            discount: '7% OFF',
            rating: 4.4,
            reviewsCount: 74,
            inStock: true,
            category: 'Grocery, Stationery',
            image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80'
          }
        ]);
      }, 50);
    });
  },

  /**
   * Return top-rated customer reviews for this specific product mockup.
   */
  async getTopReviews(productId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'rev-neha',
            user: 'Neha P.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
            rating: 5,
            time: '2 days ago',
            verifiedPurchase: true,
            comment: 'Good quality oil. Always available at Patel General Store. Staff behavior is also very nice.'
          },
          {
            id: 'rev-rohit',
            user: 'Rohit S.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
            rating: 5,
            time: '1 week ago',
            verifiedPurchase: true,
            comment: 'Best price in the area. I always buy from here. Highly recommended!'
          }
        ]);
      }, 40);
    });
  },

  /**
   * Resolves similar products from the search database.
   */
  async getSimilarProducts(productBrand, productCategory) {
    const response = await searchService.searchProducts({});
    // Filter out items of the same brand or refined category
    const similar = response.products
      .filter(p => p.brand !== productBrand || p.category === productCategory)
      .slice(0, 5);
    return similar;
  }
};
