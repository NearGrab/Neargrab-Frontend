import { useState, useEffect } from 'react';
import { useAuthStore } from './useAuthStore';
import apiClient from '../shared/services/apiClient';

const listeners = new Set();
let globalState = {
  items: JSON.parse(localStorage.getItem('neargrab_cart') || '[]'),
  totalQuantity: 0,
  totalAmount: 0
};

// Calculate totals from items array
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalQuantity, totalAmount };
};

// Update global state and persist if guest
const setGlobalState = (nextItems, persist = true) => {
  const { totalQuantity, totalAmount } = calculateTotals(nextItems);
  globalState = {
    items: nextItems,
    totalQuantity,
    totalAmount
  };
  if (persist) {
    localStorage.setItem('neargrab_cart', JSON.stringify(nextItems));
  }
  listeners.forEach((listener) => listener(globalState));
};

// Map backend cart structure to frontend properties
const mapBackendCartToFrontend = (backendCart) => {
  if (!backendCart || !backendCart.items) return [];
  return backendCart.items.map(item => ({
    id: item.id, // CartItem cuid
    productId: item.productId,
    name: item.name,
    price: (item.pricePaise || 0) / 100, // paise to rupees
    originalPrice: (item.product?.mrpPaise || item.pricePaise) / 100,
    discountPercent: item.product?.discountPercent || 0,
    unit: item.product?.unit || '1 unit',
    store: item.shopName || 'Local Store',
    distance: item.product?.distanceKm ? `${item.product.distanceKm} km away` : '0.3 km away',
    image: item.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    quantity: item.quantity,
    shopId: item.product?.shop?.id || null
  }));
};

let lastFetchedToken = null;

const fetchServerCart = async (force = false) => {
  const token = localStorage.getItem('neargrab_access_token');
  if (!token) return;
  if (!force && token === lastFetchedToken) return;

  try {
    const response = await apiClient.get('/api/v1/cart');
    if (response && response.data) {
      const items = mapBackendCartToFrontend(response.data);
      lastFetchedToken = token;
      setGlobalState(items, false);
    }
  } catch (err) {
    console.error('Failed to fetch server cart:', err);
  }
};

/**
 * A highly reusable reactive Cart Store hook connected to Neargrab backend.
 */
export function useCartStore() {
  const [state, setState] = useState(globalState);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    listeners.add(setState);

    const syncCart = async () => {
      if (isAuthenticated) {
        // Retrieve guest items to merge
        const guestCartStr = localStorage.getItem('neargrab_cart');
        const guestItems = guestCartStr ? JSON.parse(guestCartStr) : [];
        if (guestItems.length > 0) {
          for (const item of guestItems) {
            const productId = item.productId || item.id;
            try {
              await apiClient.post('/api/v1/cart/items', {
                productId,
                quantity: item.quantity
              });
            } catch (err) {
              console.warn(`Failed to merge guest item ${productId}:`, err);
            }
          }
          localStorage.removeItem('neargrab_cart');
        }
        await fetchServerCart(true);
      } else {
        // Load guest cart
        const guestItems = JSON.parse(localStorage.getItem('neargrab_cart') || '[]');
        setGlobalState(guestItems, true);
        lastFetchedToken = null;
      }
    };

    syncCart();

    return () => {
      listeners.delete(setState);
    };
  }, [isAuthenticated]);

  const addItem = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        const response = await apiClient.post('/api/v1/cart/items', {
          productId: product.id,
          quantity
        });
        if (response && response.data) {
          const items = mapBackendCartToFrontend(response.data);
          setGlobalState(items, false);
        }
      } catch (err) {
        console.error('Failed to add item to server cart:', err);
      }
    } else {
      const existingIndex = globalState.items.findIndex(item => item.id === product.id);
      let updatedItems = [...globalState.items];

      if (existingIndex > -1) {
        updatedItems[existingIndex].quantity += quantity;
      } else {
        updatedItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          store: product.store,
          image: product.image,
          quantity: quantity,
          shopId: product.shopId || product.shop?.id || null
        });
      }
      setGlobalState(updatedItems, true);
    }
  };

  const removeItem = async (itemId) => {
    if (isAuthenticated) {
      try {
        const response = await apiClient.delete(`/api/v1/cart/items/${itemId}`);
        if (response && response.data) {
          const items = mapBackendCartToFrontend(response.data);
          setGlobalState(items, false);
        }
      } catch (err) {
        console.error('Failed to remove item from server cart:', err);
      }
    } else {
      const updatedItems = globalState.items.filter(item => item.id !== itemId);
      setGlobalState(updatedItems, true);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeItem(itemId);
      return;
    }

    if (isAuthenticated) {
      try {
        const response = await apiClient.patch(`/api/v1/cart/items/${itemId}`, {
          quantity: newQuantity
        });
        if (response && response.data) {
          const items = mapBackendCartToFrontend(response.data);
          setGlobalState(items, false);
        }
      } catch (err) {
        console.error('Failed to update quantity on server cart:', err);
      }
    } else {
      const updatedItems = globalState.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setGlobalState(updatedItems, true);
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        const response = await apiClient.delete('/api/v1/cart');
        if (response && response.data) {
          const items = mapBackendCartToFrontend(response.data);
          setGlobalState(items, false);
        }
      } catch (err) {
        console.error('Failed to clear server cart:', err);
      }
    } else {
      setGlobalState([], true);
    }
  };

  return {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
}
