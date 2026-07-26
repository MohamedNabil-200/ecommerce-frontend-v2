import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlistThunk,
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "./wishlist.thunks";
import type { WishlistState } from "./wishlist.types";

const initialState: WishlistState = {
  items: [],
  isFetched: false,

  getWishlist: {
    loading: false,
    error: null,
  },

  addToWishlist: {
    loading: false,
    error: null,
  },

  removeFromWishlist: {
    loading: false,
    error: null,
  },
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Wishlist
    builder.addCase(getWishlistThunk.pending, (state) => {
      state.getWishlist.loading = true;
      state.getWishlist.error = null;
    });
    builder.addCase(getWishlistThunk.fulfilled, (state, action) => {
      state.getWishlist.loading = false;
      state.items = action.payload;
      state.isFetched = true;
    });
    builder.addCase(getWishlistThunk.rejected, (state, action) => {
      state.getWishlist.loading = false;
      state.getWishlist.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error?.message ?? "Something went wrong");
    });

    // Add to Wishlist
    builder.addCase(addToWishlistThunk.pending, (state) => {
      state.addToWishlist.loading = true;
      state.addToWishlist.error = null;
    });
    builder.addCase(addToWishlistThunk.fulfilled, (state, action) => {
      state.addToWishlist.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(addToWishlistThunk.rejected, (state, action) => {
      state.addToWishlist.loading = false;
      state.addToWishlist.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error?.message ?? "Something went wrong");
    });

    // Remove from Wishlist
    builder.addCase(removeFromWishlistThunk.pending, (state) => {
      state.removeFromWishlist.loading = true;
      state.removeFromWishlist.error = null;
    });
    builder.addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
      state.removeFromWishlist.loading = false;
      state.items = state.items.filter((item) => item.productId !== action.payload.productId);
    });
    builder.addCase(removeFromWishlistThunk.rejected, (state, action) => {
      state.removeFromWishlist.loading = false;
      state.removeFromWishlist.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error?.message ?? "Something went wrong");
    });
  },
});

export const wishlistReducer = wishlistSlice.reducer;
