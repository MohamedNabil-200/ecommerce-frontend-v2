import { cartService } from "./cart.service";
import type { CartResponse, TCartItem } from "./cart.types";
import { createApiThunk } from "../../api/create-api-thunk";

export const getCartThunk = createApiThunk<CartResponse>("cart/get", () =>
  cartService.getCart(),
);

export const addToCartThunk = createApiThunk<TCartItem, number>(
  "cart/add",
  (productId) => cartService.addToCart(productId),
);

export const updateCartQuantityThunk = createApiThunk<
  TCartItem,
  { productId: number; quantity: number }
>("cart/updateQuantity", ({ productId, quantity }) =>
  cartService.updateCartQuantity(productId, quantity),
);

export const removeFromCartThunk = createApiThunk<TCartItem, number>(
  "cart/remove",
  (productId) => cartService.removeFromCart(productId),
);

export const clearCartThunk = createApiThunk<void>("cart/clear", () =>
  cartService.clearCart(),
);
