import { useState, useEffect } from 'react';

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

// Update global state and persist
const setGlobalState = (nextItems) => {
  const { totalQuantity, totalAmount } = calculateTotals(nextItems);
  globalState = {
    items: nextItems,
    totalQuantity,
    totalAmount
  };
  localStorage.setItem('neargrab_cart', JSON.stringify(nextItems));
  listeners.forEach((listener) => listener(globalState));
};

/**
 * A highly reusable reactive Cart Store hook.
 */
export function useCartStore() {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    // Initial calculation on mounting to ensure consistency
    const { totalQuantity, totalAmount } = calculateTotals(globalState.items);
    if (globalState.totalQuantity !== totalQuantity || globalState.totalAmount !== totalAmount) {
      setGlobalState(globalState.items);
    }

    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const addItem = (product, quantity = 1) => {
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
        quantity: quantity
      });
    }
    setGlobalState(updatedItems);
  };

  const removeItem = (productId) => {
    const updatedItems = globalState.items.filter(item => item.id !== productId);
    setGlobalState(updatedItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedItems = globalState.items.filter(item => item.id !== productId);
      setGlobalState(updatedItems);
      return;
    }
    const updatedItems = globalState.items.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setGlobalState(updatedItems);
  };

  const clearCart = () => {
    setGlobalState([]);
  };

  return {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
}
