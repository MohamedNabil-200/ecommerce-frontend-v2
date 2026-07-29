import type { Product } from "../products/products.types";

export type OrderStatus =
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

export type TOrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
};

export type TOrder = {
  id: number;
  userId: number;
  subtotal: number;
  status: OrderStatus;
  items: TOrderItem[];
  createdAt: string;
};

export type OrdersResponse = TOrder[];

export type OrderDetailsResponse = TOrder;

export type OrdersState = {
  items: TOrder[];
  selectedOrder: TOrder | null;

  isFetched: boolean;

  getOrders: {
    loading: boolean;
    error: string | null;
  };

  getOrderDetails: {
    loading: boolean;
    error: string | null;
  };

  placeOrder: {
    loading: boolean;
    error: string | null;
  };
};