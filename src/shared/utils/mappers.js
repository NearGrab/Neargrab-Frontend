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

export function convert12hTo24h(timeStr) {
  if (!timeStr) return '09:00';
  const match = timeStr.trim().match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return timeStr; // Fallback if already 24h
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

export function convert24hTo12h(timeStr) {
  if (!timeStr) return '09:00 AM';
  const match = timeStr.trim().match(/^(\d+):(\d+)$/);
  if (!match) return timeStr; // Fallback if already 12h
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function mapBackendTimingsToFrontend(backendTimings) {
  if (!Array.isArray(backendTimings) || backendTimings.length === 0) {
    return {
      isOpenNow: true,
      displayHours: '08:00 AM - 10:00 PM',
      openingTime: '08:00 AM',
      closingTime: '10:00 PM',
      schedule: [
        { day: 'Mon', hours: '08:00 AM - 10:00 PM', isOpen: true },
        { day: 'Tue', hours: '08:00 AM - 10:00 PM', isOpen: true },
        { day: 'Wed', hours: '08:00 AM - 10:00 PM', isOpen: true },
        { day: 'Thu', hours: '08:00 AM - 10:00 PM', isOpen: true },
        { day: 'Fri', hours: '08:00 AM - 10:00 PM', isOpen: true },
        { day: 'Sat', hours: '08:00 AM - 10:00 PM', isOpen: true },
        { day: 'Sun', hours: '08:00 AM - 10:00 PM', isOpen: false }
      ],
      openAll7Days: false
    };
  }

  const WEEKDAY_NUM_TO_STR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const schedule = WEEKDAY_NUM_TO_STR.map((dayStr, idx) => {
    const backendDay = backendTimings.find(t => t.weekday === idx);
    const isOpen = backendDay ? !backendDay.isClosed : true;
    const opensAt = backendDay ? backendDay.opensAt : '08:00';
    const closesAt = backendDay ? backendDay.closesAt : '22:00';
    const hours = `${convert24hTo12h(opensAt)} - ${convert24hTo12h(closesAt)}`;
    return {
      day: dayStr,
      hours,
      isOpen
    };
  });

  const sortedSchedule = [];
  const weekdaysStr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekdaysStr.forEach(d => {
    const item = schedule.find(s => s.day === d);
    if (item) sortedSchedule.push(item);
  });

  const firstOpenDay = backendTimings.find(t => !t.isClosed);
  const displayHours = firstOpenDay 
    ? `${convert24hTo12h(firstOpenDay.opensAt)} - ${convert24hTo12h(firstOpenDay.closesAt)}`
    : '08:00 AM - 10:00 PM';

  const openingTime = firstOpenDay ? convert24hTo12h(firstOpenDay.opensAt) : '08:00 AM';
  const closingTime = firstOpenDay ? convert24hTo12h(firstOpenDay.closesAt) : '10:00 PM';

  const openAll7Days = backendTimings.filter(t => !t.isClosed).length === 7;

  return {
    isOpenNow: true,
    displayHours,
    openingTime,
    closingTime,
    schedule: sortedSchedule,
    openAll7Days
  };
}

export function mapFrontendTimingsToBackend(timings) {
  const opensAt = convert12hTo24h(timings.openingTime || '08:00 AM');
  const closesAt = convert12hTo24h(timings.closingTime || '10:00 PM');

  const backendTimings = [];
  for (let i = 0; i < 7; i++) {
    const WEEKDAY_NUM_TO_STR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayStr = WEEKDAY_NUM_TO_STR[i];
    const schedItem = Array.isArray(timings.schedule) ? timings.schedule.find(s => s.day === dayStr) : null;
    
    let isClosed = false;
    if (schedItem) {
      isClosed = !schedItem.isOpen;
    } else if (timings.weekdays) {
      isClosed = !timings.weekdays.includes(dayStr);
    } else if (dayStr === 'Sun' && !timings.openAll7Days) {
      isClosed = true;
    }

    let dayOpens = opensAt;
    let dayCloses = closesAt;

    if (schedItem && schedItem.hours) {
      const parts = schedItem.hours.split('-');
      if (parts.length === 2) {
        dayOpens = convert12hTo24h(parts[0].trim());
        dayCloses = convert12hTo24h(parts[1].trim());
      }
    }

    backendTimings.push({
      weekday: i,
      opensAt: dayOpens,
      closesAt: dayCloses,
      isClosed
    });
  }

  return backendTimings;
}

