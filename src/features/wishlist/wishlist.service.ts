import { api } from "../../api/axios";
import type { ApiResponse } from "../../api/api.types";
import type { TWishlistItem, WishlistResponse } from "./wishlist.types";

const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await api.get<ApiResponse<WishlistResponse>>("/wishlist");
  return response.data.data;
};

const addToWishlist = async (productId: number): Promise<TWishlistItem> => {
  const response = await api.post<ApiResponse<TWishlistItem>>(
    `/wishlist/${productId}`,
  );
  return response.data.data;
};

const removeFromWishlist = async (productId: number): Promise<TWishlistItem> => {
  const response = await api.delete<ApiResponse<TWishlistItem>>(
    `/wishlist/${productId}`,
  );
  return response.data.data;
};

export const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
