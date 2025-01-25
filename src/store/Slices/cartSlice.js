import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),
    selectedProductProductID: null, // Track the selected product's ID
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.ProductID === action.payload.ProductID);
      if (existingItem) {
        // If item exists, increase quantity up to the max limit of 5
        if (existingItem.quantity < 5) {
          existingItem.quantity += 1;
        }
      } else {
        // Otherwise, add the new item with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Update the localStorage with the current cart state
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      // Remove item from cart
      state.items = state.items.filter((item) => item.ProductID !== action.payload);
      
      // Reset selectedProductProductID if it's the removed item
      if (state.selectedProductProductID === action.payload) {
        state.selectedProductProductID = null;
      }

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { ProductID, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.ProductID === ProductID);
      if (itemIndex >= 0) {
        // Ensure the quantity does not exceed the maximum limit of 5
        if (quantity > 0 && quantity <= 5) {
          state.items[itemIndex].quantity = quantity;
        }
      }
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.selectedProductProductID = null;
      // Clear localStorage when cart is cleared
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
