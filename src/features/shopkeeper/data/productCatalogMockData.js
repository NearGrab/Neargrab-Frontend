export const productCatalogMockData = {
  products: [
    {
      id: 'prod_001',
      name: 'Amul Taaza Milk 1L',
      sku: 'MILK001',
      category: 'Dairy',
      price: 70,
      mrp: 80,
      stockAvailable: true,
      stockCount: 45,
      views: 1248,
      updatedRelative: '2 hrs ago',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_002',
      name: 'Britannia Brown Bread',
      sku: 'BRD002',
      category: 'Bakery',
      price: 35,
      mrp: 40,
      stockAvailable: true,
      stockCount: 18,
      views: 856,
      updatedRelative: '5 hrs ago',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_003',
      name: 'Fortune Sunlite Oil 1L',
      sku: 'OIL003',
      category: 'Grocery',
      price: 125,
      mrp: 140,
      stockAvailable: true,
      stockCount: 22,
      views: 1563,
      updatedRelative: '1 day ago',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_004',
      name: 'India Gate Basmati Rice 1kg',
      sku: 'RICE004',
      category: 'Grocery',
      price: 110,
      mrp: 125,
      stockAvailable: true,
      stockCount: 30,
      views: 948,
      updatedRelative: '2 days ago',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_005',
      name: 'Surf Excel Matic 2kg',
      sku: 'DTRG005',
      category: 'Household',
      price: 210,
      mrp: 230,
      stockAvailable: false,
      stockCount: 0,
      views: 632,
      updatedRelative: '3 days ago',
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_006',
      name: 'Parle-G Biscuits 250g',
      sku: 'BIS006',
      category: 'Snacks',
      price: 20,
      mrp: 25,
      stockAvailable: true,
      stockCount: 150,
      views: 1125,
      updatedRelative: '3 days ago',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_007',
      name: 'Clinic Plus Shampoo 340ml',
      sku: 'PERS007',
      category: 'Personal Care',
      price: 95,
      mrp: 110,
      stockAvailable: true,
      stockCount: 15,
      views: 725,
      updatedRelative: '4 days ago',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=80&q=80'
    },
    {
      id: 'prod_008',
      name: 'Patanjali Aloe Vera Face Wash 60g',
      sku: 'PERS008',
      category: 'Personal Care',
      price: 60,
      mrp: 70,
      stockAvailable: false,
      stockCount: 0,
      views: 412,
      updatedRelative: '5 days ago',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=80&q=80'
    }
  ],

  catalogStats: {
    totalProducts: 128,
    inStock: 96,
    outOfStock: 32,
    categories: 14
  },

  topPerformers: [
    {
      id: 'prod_001',
      rank: 1,
      name: 'Amul Taaza Milk 1L',
      views: 1248,
      growth: 18,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=60&q=80'
    },
    {
      id: 'prod_003',
      rank: 2,
      name: 'Fortune Sunlite Oil 1L',
      views: 1563,
      growth: 22,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=60&q=80'
    },
    {
      id: 'prod_002',
      rank: 3,
      name: 'Britannia Brown Bread',
      views: 856,
      growth: 12,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=60&q=80'
    }
  ],

  tips: [
    {
      id: 'tip_1',
      title: 'Keep your stock updated',
      desc: 'Accurate stock builds customer trust.'
    },
    {
      id: 'tip_2',
      title: 'Use clear product images',
      desc: 'Good images get more views.'
    },
    {
      id: 'tip_3',
      title: 'Add offers and discounts',
      desc: 'Attract more local customers.'
    }
  ]
};
