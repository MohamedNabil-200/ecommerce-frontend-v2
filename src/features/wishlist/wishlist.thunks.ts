import { createAsyncThunk } from "@reduxjs/toolkit";
import { wishlistService } from "./wishlist.service";
import type { TWishlistItem, WishlistResponse } from "./wishlist.types";

export const getWishlistThunk = createAsyncThunk<WishlistResponse>(
  "/wishlist/getWishlist",
  async () => {
    return await wishlistService.getWishlist();
  },
);

export const addToWishlistThunk = createAsyncThunk<TWishlistItem, number>(
  "/wishlist/addToWishlist",
  async (productId) => {
    return await wishlistService.addToWishlist(productId);
  },
);

export const removeFromWishlistThunk = createAsyncThunk<TWishlistItem, number>(
  "/wishlist/removeFromWishlist",
  async (productId) => {
    return await wishlistService.removeFromWishlist(productId);
  },
);
