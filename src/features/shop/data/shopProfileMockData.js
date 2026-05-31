export const shopProfileMockData = {
  shopInfo: {
    name: 'Patel General Store',
    username: 'patelgeneralstore',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    rating: 4.6,
    reviewCount: 128,
    distance: '0.8 km away',
    openStatus: 'Open Open until 10:00 PM',
    followersCount: '15.2K',
    followingCount: '24',
    category: 'Grocery Store • Kirana Store',
    shopId: 'PGS12345',
    yearsOnPlatform: 9,
    establishedYear: 2015,
    location: 'Navsari, Gujarat - 396445',
    landmark: 'Near Gandhi Chowk',
    city: 'Navsari',
    pincode: '396445',
    state: 'Gujarat',
    email: 'contact@patelstore.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    description: 'Your one-stop shop for daily essentials! We provide best quality groceries, household items, personal care, snacks and much more at the best prices. Your trust is our priority.'
  },

  timings: {
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
  },

  paymentMethods: {
    upi: true,
    googlePay: true,
    phonePe: true,
    paytm: true,
  },

  socialLinks: {
    whatsapp: 'https://wa.me/919876543210',
    instagram: 'https://instagram.com/patelgeneralstore',
    facebook: 'https://facebook.com/patelgeneralstore'
  },

  products: [
    {
      id: 'prod_1',
      name: 'Aashirvaad Atta 5kg',
      category: 'Grocery',
      price: 275,
      mrp: 290,
      image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=150&q=80',
      stockAvailable: true
    },
    {
      id: 'prod_2',
      name: 'Fortune Sunlite Oil 1L',
      category: 'Grocery',
      price: 125,
      mrp: 140,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80',
      stockAvailable: true
    },
    {
      id: 'prod_3',
      name: 'Tata Tea Premium 1kg',
      category: 'Grocery',
      price: 210,
      mrp: 230,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=150&q=80',
      stockAvailable: true
    },
    {
      id: 'prod_4',
      name: 'Surf Excel Matic 2kg',
      category: 'Household',
      price: 210,
      mrp: 230,
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=150&q=80',
      stockAvailable: true
    },
    {
      id: 'prod_5',
      name: 'Parle-G Biscuits 200g',
      category: 'Snacks',
      price: 20,
      mrp: 25,
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=150&q=80',
      stockAvailable: true
    }
  ],

  reviews: [
    {
      id: 'rev_1',
      reviewerName: 'Neha P.',
      rating: 5,
      dateRelative: '2 days ago',
      comment: 'Great collection and always fresh stock. Owner is very polite and helpful.',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80'
    },
    {
      id: 'rev_2',
      reviewerName: 'Rohan Shah',
      rating: 4,
      dateRelative: '1 week ago',
      comment: 'Best shop in our area for daily groceries. Prices are reasonable.',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80'
    }
  ],

  updates: [
    {
      id: 'upd_1',
      title: 'New stock arrived! Amul products now available.',
      dateRelative: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80',
      type: 'new_arrival'
    },
    {
      id: 'upd_2',
      title: 'Weekend Offer! Get 10% off on all snacks.',
      dateRelative: '1 day ago',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=150&q=80',
      type: 'offer'
    },
    {
      id: 'upd_3',
      title: 'Fresh Aashirvaad Atta 5kg now in stock.',
      dateRelative: '3 days ago',
      image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=150&q=80',
      type: 'stock_update'
    }
  ],

  photos: [
    { id: 'img_1', src: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80', type: 'cover' },
    { id: 'img_2', src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80', type: 'logo' },
    { id: 'img_3', src: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=300&q=80', type: 'inside' },
    { id: 'img_4', src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', type: 'product' },
    { id: 'img_5', src: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80', type: 'product' },
    { id: 'img_6', src: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=300&q=80', type: 'inside' }
  ]
};
