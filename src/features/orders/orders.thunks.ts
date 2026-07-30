import { ordersService } from "./orders.service";
import type {
  TOrder,
  OrdersResponse,
  OrderDetailsResponse,
} from "./orders.types";
import { createApiThunk } from "../../api/create-api-thunk";

export const placeOrderThunk = createApiThunk<TOrder>("orders/placeOrder", () =>
  ordersService.placeOrder(),
);

export const getOrdersThunk = createApiThunk<OrdersResponse>(
  "orders/getOrders",
  () => ordersService.getOrders(),
);

export const getOrderDetailsThunk = createApiThunk<
  OrderDetailsResponse,
  number
>("orders/getOrderDetails", (orderId) =>
  ordersService.getOrderDetails(orderId),
);
