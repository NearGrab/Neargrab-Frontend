import test from 'node:test';
import assert from 'node:assert';
import {
  mapBackendProductToFrontend,
  mapBackendShopToFrontend,
  convert12hTo24h,
  convert24hTo12h,
  mapBackendTimingsToFrontend,
  mapFrontendTimingsToBackend
} from './mappers.js';

test('mapBackendProductToFrontend mapper checks', async (t) => {
  await t.test('handles null/undefined product gracefully', () => {
    assert.strictEqual(mapBackendProductToFrontend(null), null);
    assert.strictEqual(mapBackendProductToFrontend(undefined), null);
  });

  await t.test('maps simple details, price conversion, and discount logic', () => {
    const rawProduct = {
      id: 'prod_123',
      name: 'Organic Wheat Flour',
      pricePaise: 25000, // Rs 250
      mrpPaise: 30000,   // Rs 300
      stockStatus: 'IN_STOCK',
      size: '5',
      unit: 'kg',
      category: { name: 'Grocery' },
      brand: { name: 'Aashirvaad' },
      shop: {
        id: 'shop_456',
        name: 'Patel Provision',
        slug: 'patel-provision',
        verificationStatus: 'VERIFIED'
      }
    };

    const mapped = mapBackendProductToFrontend(rawProduct);
    assert.strictEqual(mapped.id, 'prod_123');
    assert.strictEqual(mapped.name, 'Organic Wheat Flour');
    assert.strictEqual(mapped.price, 250);
    assert.strictEqual(mapped.originalPrice, 300);
    assert.strictEqual(mapped.discount, '17% OFF');
    assert.strictEqual(mapped.size, '5 kg');
    assert.strictEqual(mapped.inStock, true);
    assert.strictEqual(mapped.category, 'Grocery');
    assert.strictEqual(mapped.brand, 'Aashirvaad');
    assert.strictEqual(mapped.store, 'Patel Provision');
    assert.strictEqual(mapped.verified, true);
    assert.strictEqual(mapped.shopId, 'shop_456');
    assert.strictEqual(mapped.shopSlug, 'patel-provision');
  });

  await t.test('handles images and fallbacks correctly', () => {
    const defaultImage = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80';
    
    // Fallback case
    assert.strictEqual(mapBackendProductToFrontend({}).image, defaultImage);

    // Single image object case
    const prodWithImageObj = { image: { url: 'https://cdn.example.com/item.png' } };
    assert.strictEqual(mapBackendProductToFrontend(prodWithImageObj).image, 'https://cdn.example.com/item.png');

    // Images array case
    const prodWithImagesArr = { images: [{ url: 'https://cdn.example.com/item2.png' }] };
    assert.strictEqual(mapBackendProductToFrontend(prodWithImagesArr).image, 'https://cdn.example.com/item2.png');
  });
});

test('mapBackendShopToFrontend mapper checks', async (t) => {
  await t.test('handles null/undefined shop gracefully', () => {
    assert.strictEqual(mapBackendShopToFrontend(null), null);
    assert.strictEqual(mapBackendShopToFrontend(undefined), null);
  });

  await t.test('maps verification status, distance, address, and contacts correctly', () => {
    const rawShop = {
      id: 'shop_xyz_123',
      name: 'Super Fresh Greens',
      username: 'superfresh',
      slug: 'superfresh-greens',
      verificationStatus: 'VERIFIED',
      ratingAvg: 4.8,
      ratingCount: 120,
      distanceKm: 1.45,
      address: {
        street: '12 Green Avenue',
        city: 'Navsari',
        pincode: '396445'
      },
      contact: {
        phone: '+919999988888',
        whatsapp: '+919999988888',
        acceptCalls: true
      }
    };

    const mapped = mapBackendShopToFrontend(rawShop);
    assert.strictEqual(mapped.id, 'shop_xyz_123');
    assert.strictEqual(mapped.name, 'Super Fresh Greens');
    assert.strictEqual(mapped.isVerified, true);
    assert.strictEqual(mapped.rating, 4.8);
    assert.strictEqual(mapped.reviewCount, 120);
    assert.strictEqual(mapped.distance, '1.4 km away');
    assert.strictEqual(mapped.location, '12 Green Avenue, Navsari - 396445');
    assert.strictEqual(mapped.phone, '+919999988888');
    assert.strictEqual(mapped.whatsapp, '+919999988888');
    assert.strictEqual(mapped.acceptCalls, true);
  });
});

test('Time conversion helpers checks', async (t) => {
  await t.test('convert12hTo24h conversion logic', () => {
    assert.strictEqual(convert12hTo24h('09:30 AM'), '09:30');
    assert.strictEqual(convert12hTo24h('12:00 PM'), '12:00');
    assert.strictEqual(convert12hTo24h('01:15 PM'), '13:15');
    assert.strictEqual(convert12hTo24h('12:10 AM'), '00:10');
    assert.strictEqual(convert12hTo24h('18:00'), '18:00'); // Fallback if already 24h
  });

  await t.test('convert24hTo12h conversion logic', () => {
    assert.strictEqual(convert24hTo12h('09:30'), '09:30 AM');
    assert.strictEqual(convert24hTo12h('12:00'), '12:00 PM');
    assert.strictEqual(convert24hTo12h('13:15'), '01:15 PM');
    assert.strictEqual(convert24hTo12h('00:10'), '12:10 AM');
    assert.strictEqual(convert24hTo12h('09:30 AM'), '09:30 AM'); // Fallback if already 12h
  });
});

test('Shop timings mapper checks', async (t) => {
  await t.test('mapBackendTimingsToFrontend maps weekday array to schedule object', () => {
    const backendTimings = [
      { weekday: 1, opensAt: '08:00', closesAt: '20:00', isClosed: false }, // Mon
      { weekday: 2, opensAt: '08:00', closesAt: '20:00', isClosed: false }, // Tue
      { weekday: 3, opensAt: '08:00', closesAt: '20:00', isClosed: false }, // Wed
      { weekday: 4, opensAt: '08:00', closesAt: '20:00', isClosed: false }, // Thu
      { weekday: 5, opensAt: '08:00', closesAt: '22:00', isClosed: false }, // Fri
      { weekday: 6, opensAt: '09:00', closesAt: '22:00', isClosed: false }, // Sat
      { weekday: 0, opensAt: '09:00', closesAt: '13:00', isClosed: true }   // Sun
    ];

    const mapped = mapBackendTimingsToFrontend(backendTimings);
    assert.strictEqual(mapped.openAll7Days, false);
    assert.strictEqual(mapped.openingTime, '08:00 AM');
    assert.strictEqual(mapped.closingTime, '08:00 PM');

    const scheduleMon = mapped.schedule.find(s => s.day === 'Mon');
    assert.strictEqual(scheduleMon.isOpen, true);
    assert.strictEqual(scheduleMon.hours, '08:00 AM - 08:00 PM');

    const scheduleSun = mapped.schedule.find(s => s.day === 'Sun');
    assert.strictEqual(scheduleSun.isOpen, false);
  });

  await t.test('mapFrontendTimingsToBackend maps UI timings state back to DB schema', () => {
    const frontendTimings = {
      openingTime: '08:00 AM',
      closingTime: '09:00 PM',
      schedule: [
        { day: 'Mon', isOpen: true, hours: '08:00 AM - 09:00 PM' },
        { day: 'Tue', isOpen: true, hours: '08:00 AM - 09:00 PM' },
        { day: 'Wed', isOpen: true, hours: '08:00 AM - 09:00 PM' },
        { day: 'Thu', isOpen: true, hours: '08:00 AM - 09:00 PM' },
        { day: 'Fri', isOpen: true, hours: '08:00 AM - 09:00 PM' },
        { day: 'Sat', isOpen: true, hours: '08:00 AM - 10:00 PM' },
        { day: 'Sun', isOpen: false, hours: '08:00 AM - 09:00 PM' }
      ]
    };

    const backendTimings = mapFrontendTimingsToBackend(frontendTimings);
    assert.strictEqual(backendTimings.length, 7);
    
    // Check Sunday (weekday index 0)
    const sunItem = backendTimings.find(t => t.weekday === 0);
    assert.strictEqual(sunItem.isClosed, true);

    // Check Monday (weekday index 1)
    const monItem = backendTimings.find(t => t.weekday === 1);
    assert.strictEqual(monItem.isClosed, false);
    assert.strictEqual(monItem.opensAt, '08:00');
    assert.strictEqual(monItem.closesAt, '21:00');

    // Check Saturday (weekday index 6)
    const satItem = backendTimings.find(t => t.weekday === 6);
    assert.strictEqual(satItem.opensAt, '08:00');
    assert.strictEqual(satItem.closesAt, '22:00');
  });
});
