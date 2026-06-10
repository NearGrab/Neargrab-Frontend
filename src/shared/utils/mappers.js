/**
 * Converts a backend product object to the format expected by frontend components.
 */
export function mapBackendProductToFrontend(prod) {
  if (!prod) return null;

  const price = typeof prod.pricePaise === 'number' ? prod.pricePaise / 100 : 0;
  const originalPrice = typeof prod.mrpPaise === 'number' ? prod.mrpPaise / 100 : null;
  let discount = null;
  if (originalPrice && originalPrice > price) {
    discount = `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;
  }

  // Handle image object or array of images
  let imageUrl = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80';
  if (prod.image?.url) {
    imageUrl = prod.image.url;
  } else if (Array.isArray(prod.images) && prod.images.length > 0) {
    imageUrl = prod.images[0].url || prod.images[0].media?.url || imageUrl;
  }

  return {
    id: prod.id,
    name: prod.name,
    discount,
    price,
    originalPrice: originalPrice && originalPrice > price ? originalPrice : null,
    rating: prod.ratingAvg || 4.2,
    reviewsCount: prod.reviewCount || 2,
    distance: prod.distanceKm !== null && prod.distanceKm !== undefined ? Number(prod.distanceKm.toFixed(1)) : 0.5,
    image: imageUrl,
    size: prod.size ? `${prod.size} ${prod.unit || ''}`.trim() : '1 Unit',
    category: prod.category?.name || 'Grocery',
    brand: prod.brand?.name || '',
    store: prod.shop?.name || 'Local Store',
    verified: prod.shop?.verificationStatus === 'VERIFIED',
    inStock: prod.stockStatus === 'IN_STOCK' || prod.stockAvailable,
    shopId: prod.shop?.id || prod.shopId || null,
    shopSlug: prod.shop?.slug || prod.shopSlug || null
  };
}

/**
 * Converts a backend shop object to the format expected by frontend components.
 */
export function mapBackendShopToFrontend(shop) {
  if (!shop) return null;

  const address = shop.address || {};
  const contact = shop.contact || {};

  return {
    id: shop.id,
    name: shop.name,
    username: shop.username,
    slug: shop.slug || shop.username,
    description: shop.description || '',
    logo: shop.logo?.url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
    coverImage: shop.cover?.url || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    isVerified: shop.verificationStatus === 'VERIFIED',
    rating: shop.ratingAvg || 4.4,
    reviewCount: shop.ratingCount || 0,
    distance: shop.distanceKm !== undefined && shop.distanceKm !== null ? `${shop.distanceKm.toFixed(1)} km away` : 'Nearby',
    openStatus: 'Open now', // Default fallback
    followersCount: '0',
    followingCount: '0',
    category: shop.category?.name || 'Store',
    shopId: shop.id.slice(0, 8).toUpperCase(),
    yearsOnPlatform: 1,
    location: `${address.street || ''}, ${address.city || ''} - ${address.pincode || ''}`.replace(/^,\s*/, ''),
    phone: contact.phone || '',
    whatsapp: contact.whatsapp || '',
    acceptCalls: contact.acceptCalls ?? true,
    timings: shop.timings || [],
    paymentMethods: shop.paymentMethods || [],
    languages: shop.languages || [],
    tags: shop.tags || []
  };
}
