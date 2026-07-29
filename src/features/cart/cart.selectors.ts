import type { RootState } from "../../store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectIsCartFetched = (state: RootState) => state.cart.isFetched;

export const selectGetCartLoading = (state: RootState) =>
  state.cart.getCart.loading;

export const selectGetCartError = (state: RootState) =>
  state.cart.getCart.error;

export const selectAddToCartLoading = (state: RootState) =>
  state.cart.addToCart.loading;

export const selectAddToCartError = (state: RootState) =>
  state.cart.addToCart.error;

export const selectUpdateCartQuantityLoading = (state: RootState) =>
  state.cart.updateCartQuantity.loading;

export const selectUpdateCartQuantityError = (state: RootState) =>
  state.cart.updateCartQuantity.error;

export const selectRemoveFromCartLoading = (state: RootState) =>
  state.cart.removeFromCart.loading;

export const selectRemoveFromCartError = (state: RootState) =>
  state.cart.removeFromCart.error;

export const selectClearCartLoading = (state: RootState) =>
  state.cart.clearCart.loading;

export const selectClearCartError = (state: RootState) =>
  state.cart.clearCart.error;

export const selectIsProductInCart =
  (productId: number) => (state: RootState) =>
    state.cart.items.some((item) => item.productId === productId);

export const selectCartCount = (state: RootState) => state.cart.items.length;

export const selectCartItemByProductId =
  (productId: number) => (state: RootState) =>
    state.cart.items.find((item) => item.productId === productId);