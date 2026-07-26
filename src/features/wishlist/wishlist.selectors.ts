import type { RootState } from "../../store";

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistFetched = (state: RootState) =>
  state.wishlist.isFetched;

export const selectGetWishlistLoading = (state: RootState) =>
  state.wishlist.getWishlist.loading;

export const selectGetWishlistError = (state: RootState) =>
  state.wishlist.getWishlist.error;

export const selectAddToWishlistLoading = (state: RootState) =>
  state.wishlist.addToWishlist.loading;

export const selectAddToWishlistError = (state: RootState) =>
  state.wishlist.addToWishlist.error;

export const selectRemoveFromWishlistLoading = (state: RootState) =>
  state.wishlist.removeFromWishlist.loading;

export const selectRemoveFromWishlistError = (state: RootState) =>
  state.wishlist.removeFromWishlist.error;

export const selectIsProductInWishlist =
  (productId: number) => (state: RootState) =>
    state.wishlist.items.some((item) => item.productId === productId);

export const selectWishlistCount = (state: RootState) =>
  state.wishlist.items.length;
