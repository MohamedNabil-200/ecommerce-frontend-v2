import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "./products.api";
import type { Product, ProductState } from "./products.types";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async () => {
    const response = await getProducts();
    return response;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});

export const productReducer = productsSlice.reducer;
