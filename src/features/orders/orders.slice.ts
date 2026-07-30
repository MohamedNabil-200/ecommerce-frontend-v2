import { createSlice } from "@reduxjs/toolkit";
import {
  placeOrderThunk,
  getOrdersThunk,
  getOrderDetailsThunk,
} from "./orders.thunks";
import type { OrdersState } from "./orders.types";
import { logout } from "../auth/auth.slice";

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  isFetched: false,
  placeOrder: {
    loading: false,
    error: null,
  },
  getOrders: {
    loading: false,
    error: null,
  },
  getOrderDetails: {
    loading: false,
    error: null,
  },
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
    // Place Order
    builder.addCase(placeOrderThunk.pending, (state) => {
      state.placeOrder.loading = true;
      state.placeOrder.error = null;
    });
    builder.addCase(placeOrderThunk.fulfilled, (state, action) => {
      state.placeOrder.loading = false;
      state.selectedOrder = action.payload;
    });
    builder.addCase(placeOrderThunk.rejected, (state, action) => {
      state.placeOrder.loading = false;
      state.placeOrder.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");
    });

    // Get Orders
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.getOrders.loading = true;
      state.getOrders.error = null;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.getOrders.loading = false;
      state.items = action.payload;
      state.isFetched = true;
    });
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.getOrders.loading = false;
      state.isFetched = false;
      state.getOrders.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");
    });

    // Get Order Details
    builder.addCase(getOrderDetailsThunk.pending, (state) => {
      state.getOrderDetails.loading = true;
      state.getOrderDetails.error = null;
    });
    builder.addCase(getOrderDetailsThunk.fulfilled, (state, action) => {
      state.getOrderDetails.loading = false;
      state.selectedOrder = action.payload;
    });
    builder.addCase(getOrderDetailsThunk.rejected, (state, action) => {
      state.getOrderDetails.loading = false;
      state.getOrderDetails.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");
    });
  },
});

export const ordersReducer = ordersSlice.reducer;
