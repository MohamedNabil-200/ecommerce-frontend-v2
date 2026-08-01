import { createSlice } from "@reduxjs/toolkit";
import type { Product, ProductState } from "./products.types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchProductByIdThunk, fetchProductsThunk } from "./products.thunks";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isFetched: false,
  list: {
    loading: false,
    error: null,
  },
  details: {
    loading: false,
    error: null,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.isFetched = true;
      state.selectedProduct = action.payload;
      state.details.loading = false;
      state.details.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.list.loading = true;
      state.list.error = null;
    });
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.isFetched = true;
      state.products = action.payload;
      state.list.loading = false;
      state.list.error = null;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");
    });

    builder.addCase(fetchProductByIdThunk.pending, (state) => {
      state.selectedProduct = null;
      state.details.loading = true;
      state.details.error = null;
    });
    builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
      state.isFetched = true;
      state.selectedProduct = action.payload;
      state.details.loading = false;
      state.details.error = null;
    });
    builder.addCase(fetchProductByIdThunk.rejected, (state, action) => {
      state.details.loading = false;
      state.details.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong");
    });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export const productReducer = productsSlice.reducer;
