import { api } from "../../api/axios";
import type { ApiResponse } from "../../api/api.types";
import type {
  TOrder,
  OrdersResponse,
  OrderDetailsResponse,
} from "./orders.types";

const placeOrder = async (): Promise<TOrder> => {
  const response = await api.post<ApiResponse<TOrder>>("/orders");
  return response.data.data;
};

const getOrders = async (): Promise<OrdersResponse> => {
  const response = await api.get<ApiResponse<OrdersResponse>>("/orders");
  return response.data.data;
};

const getOrderDetails = async (
  orderId: number,
): Promise<OrderDetailsResponse> => {
  const response = await api.get<ApiResponse<OrderDetailsResponse>>(
    `/orders/${orderId}`,
  );
  return response.data.data;
};

export const ordersService = {
  placeOrder,
  getOrders,
  getOrderDetails,
};
