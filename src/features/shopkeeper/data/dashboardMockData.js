export const dashboardMockData = {
  shopProfile: {
    name: 'Patel General Store',
    username: 'patelgeneralstore',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviewCount: 56,
    isVerified: true,
    distance: '0.8 km away',
    openingHours: 'Open till 10:00 PM',
    description: 'Your one-stop neighborhood shop for fresh groceries, dairy items, personal care, and daily essentials.'
  },

  navigation: [
    { title: 'Dashboard', path: '/shopkeeper/dashboard', icon: 'Dashboard', badge: '' },
    { title: 'Products', path: '/shopkeeper/products', icon: 'Products', badge: '128' },
    { title: 'Add Product', path: '/shopkeeper/products/add', icon: 'AddProduct', badge: '' },
    { title: 'Reviews', path: '/shopkeeper/reviews', icon: 'Reviews', badge: '56' },
    { title: 'Shop Profile', path: '/shopkeeper/profile', icon: 'ShopProfile', badge: '' },
    { title: 'QR Code', path: '/shopkeeper/qr', icon: 'QRCode', badge: '' },
    // { title: 'Promotions', path: '/shopkeeper/promotions', icon: 'Promotions', badge: 'New' },
    { title: 'Settings', path: '/shopkeeper/settings', icon: 'Settings', badge: '' }
  ],

  stats: [
    {
      id: 'views',
      label: 'Profile Views',
      value: '1,248',
      growth: '+18.6%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      trendData: [700, 750, 720, 850, 1050, 950, 1248]
    },
    {
      id: 'clicks',
      label: 'Direction Clicks',
      value: '856',
      growth: '+22.3%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      trendData: [450, 480, 520, 500, 680, 600, 856]
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      value: '124',
      growth: '+15.8%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      trendData: [60, 75, 80, 95, 110, 105, 124]
    },
    {
      id: 'followers',
      label: 'Followers',
      value: '312',
      growth: '+12.9%',
      isPositive: true,
      timeframe: 'vs last 7 days',
      trendData: [180, 195, 220, 210, 260, 240, 312]
    },
    {
      id: 'rating',
      label: 'Avg. Rating',
      value: '4.6',
      stars: 5,
      timeframe: 'From 56 reviews',
      trendData: null
    }
  ],

  performanceData: [
    { date: '17 May', 'Profile Views': 750, 'Direction Clicks': 460, Inquiries: 85, Followers: 190 },
    { date: '18 May', 'Profile Views': 820, 'Direction Clicks': 510, Inquiries: 95, Followers: 205 },
    { date: '19 May', 'Profile Views': 780, 'Direction Clicks': 490, Inquiries: 90, Followers: 198 },
    { date: '20 May', 'Profile Views': 980, 'Direction Clicks': 620, Inquiries: 110, Followers: 250 },
    { date: '21 May', 'Profile Views': 1120, 'Direction Clicks': 710, Inquiries: 120, Followers: 290 },
    { date: '22 May', 'Profile Views': 1060, 'Direction Clicks': 680, Inquiries: 115, Followers: 275 },
    { date: '23 May', 'Profile Views': 1248, 'Direction Clicks': 856, Inquiries: 124, Followers: 312 }
  ],

  topActions: [
    { label: 'Product Views', value: '2,356', growth: '+19.4%', isPositive: true },
    { label: 'Chat Messages', value: '98', growth: '+17.2%', isPositive: true },
    { label: 'Calls Received', value: '32', growth: '+11.1%', isPositive: true },
    { label: 'Saved by Users', value: '74', growth: '+10.3%', isPositive: true }
  ],

  reviews: [
    {
      id: 'rev_1',
      authorName: 'Neha P.',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80',
      date: '2 days ago',
      rating: 4,
      isVerified: true,
      text: 'Good quality and always available. Shop owner is very polite.'
    }
  ],

  lowStockProducts: [
    {
      id: 'p_1',
      name: 'Fortune Sunlite Oil 1L',
      stockLeft: 8,
      status: 'Low',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=80&h=80&q=80'
    },
    {
      id: 'p_2',
      name: 'Tata Tea Premium 1kg',
      stockLeft: 5,
      status: 'Low',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=80&h=80&q=80'
    },
    {
      id: 'p_3',
      name: 'Surf Excel Matic 2kg',
      stockLeft: 3,
      status: 'Low',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=80&h=80&q=80'
    }
  ],

  growthTips: [
    {
      id: 'tip_1',
      title: 'Add more products',
      desc: 'Shops with more products get more views.'
    },
    {
      id: 'tip_2',
      title: 'Keep stock updated',
      desc: 'Updated stock builds trust and gets more inquiries.'
    },
    {
      id: 'tip_3',
      title: 'Respond faster',
      desc: 'Fast replies lead to more direction clicks.'
    }
  ]
};
