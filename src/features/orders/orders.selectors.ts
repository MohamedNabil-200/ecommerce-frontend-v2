import type { RootState } from "../../store";

export const selectOrders = (state: RootState) => state.orders.items;
export const selectSelectedOrder = (state: RootState) =>
  state.orders.selectedOrder;

export const selectOrdersFetched = (state: RootState) => state.orders.isFetched;

export const selectGetOrdersLoading = (state: RootState) =>
  state.orders.getOrders.loading;
export const selectGetOrdersError = (state: RootState) =>
  state.orders.getOrders.error;

export const selectGetOrderDetailsLoading = (state: RootState) =>
  state.orders.getOrderDetails.loading;
export const selectGetOrderDetailsError = (state: RootState) =>
  state.orders.getOrderDetails.error;

export const selectPlaceOrderLoading = (state: RootState) =>
  state.orders.placeOrder.loading;
export const selectPlaceOrderError = (state: RootState) =>
  state.orders.placeOrder.error;

export const selectOrdersCount = (state: RootState) =>
  state.orders.items.length;
