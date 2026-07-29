import { api } from "../../api/axios";
import type { ApiResponse } from "../../api/api.types";
import type {
  TCartItem,
  CartResponse,
  UpdatedCartQuantityRequest,
} from "./cart.types";

const getCart = async (): Promise<CartResponse> => {
  const response = await api.get<ApiResponse<CartResponse>>("/cart");
  return response.data.data;
};

const addToCart = async (productId: number): Promise<TCartItem> => {
  const response = await api.post<ApiResponse<TCartItem>>(`/cart/${productId}`);
  return response.data.data;
};

const updateCartQuantity = async (
  productId: number,
  quantity: number,
): Promise<TCartItem> => {
  const body: UpdatedCartQuantityRequest = { quantity };
  const response = await api.patch<ApiResponse<TCartItem>>(
    `/cart/${productId}`,
    body,
  );
  return response.data.data;
};

const removeFromCart = async (productId: number): Promise<TCartItem> => {
  const response = await api.delete<ApiResponse<TCartItem>>(
    `/cart/${productId}`,
  );
  return response.data.data;
};

const clearCart = async (): Promise<void> => {
  await api.delete("/cart");
};

export const cartService = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
