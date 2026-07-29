import { createSlice } from "@reduxjs/toolkit";
import {
  getCartThunk,
  addToCartThunk,
  clearCartThunk,
  removeFromCartThunk,
  updateCartQuantityThunk,
} from "./cart.thunks";
import type { CartState } from "./cart.types";

const initialState: CartState = {
  items: [],
  isFetched: false,

  getCart: {
    loading: false,
    error: null,
  },

  addToCart: {
    loading: false,
    error: null,
  },

  updateCartQuantity: {
    loading: false,
    error: null,
  },

  removeFromCart: {
    loading: false,
    error: null,
  },

  clearCart: {
    loading: false,
    error: null,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Cart
    builder.addCase(getCartThunk.pending, (state) => {
      state.getCart.loading = true;
      state.getCart.error = null;
    });
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.getCart.loading = false;
      state.items = action.payload.items ?? [];
      state.isFetched = true;
    });
    builder.addCase(getCartThunk.rejected, (state, action) => {
      state.getCart.loading = false;

      const message =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");

      if (message === "Cart is Empty") {
        state.items = [];
        state.isFetched = true;
        state.getCart.error = null;
        return;
      }

      state.getCart.error = message;
    });

    // Add To Cart
    builder.addCase(addToCartThunk.pending, (state) => {
      state.addToCart.loading = true;
      state.addToCart.error = null;
    });
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.addToCart.loading = false;
      state.isFetched = true;

      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId,
      );

      if (existingIndex !== -1) {
        state.items[existingIndex] = action.payload;
        return;
      }

      state.items.push(action.payload);
    });
    builder.addCase(addToCartThunk.rejected, (state, action) => {
      state.addToCart.loading = false;
      state.addToCart.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");
    });

    // Update Cart Quantity
    builder.addCase(updateCartQuantityThunk.pending, (state) => {
      state.updateCartQuantity.loading = true;
      state.updateCartQuantity.error = null;
    });
    builder.addCase(updateCartQuantityThunk.fulfilled, (state, action) => {
      state.updateCartQuantity.loading = false;
      state.isFetched = true;

      const quantity = action.meta.arg.quantity;
      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        return;
      }

      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId,
      );

      if (existingIndex !== -1) {
        state.items[existingIndex] = action.payload;
        return;
      }
      state.items.push(action.payload);
    });
    builder.addCase(updateCartQuantityThunk.rejected, (state, action) => {
      state.updateCartQuantity.loading = false;
      state.updateCartQuantity.error =
        typeof action.payload === "string"
          ? action.payload
          : action.error?.message || "Something went wrong";
    });

    // Remove From Cart
    builder.addCase(removeFromCartThunk.pending, (state) => {
      state.removeFromCart.loading = true;
      state.removeFromCart.error = null;
    });
    builder.addCase(removeFromCartThunk.fulfilled, (state, action) => {
      state.removeFromCart.loading = false;
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId,
      );
    });
    builder.addCase(removeFromCartThunk.rejected, (state, action) => {
      state.removeFromCart.loading = false;
      state.removeFromCart.error =
        typeof action.payload === "string"
          ? action.payload
          : action.error?.message || "Something went wrong";
    });

    // Clear Cart
    builder.addCase(clearCartThunk.pending, (state) => {
      state.clearCart.loading = true;
      state.clearCart.error = null;
    });
    builder.addCase(clearCartThunk.fulfilled, (state) => {
      state.clearCart.loading = false;
      state.isFetched = true;
      state.items = [];
    });
    builder.addCase(clearCartThunk.rejected, (state, action) => {
      state.clearCart.loading = false;
      state.clearCart.error =
        typeof action.payload === "string"
          ? action.payload
          : action.error?.message || "Something went wrong";
    });
  },
});

export const cartReducer = cartSlice.reducer;
