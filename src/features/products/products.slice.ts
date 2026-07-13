import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "./products.api";
import type { Product, ProductState } from "./products.types";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  list: {
    loading: false,
    error: null,
  },
  details: {
    loading: false,
    error: null,
  },
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async () => {
    const response = await getProducts();
    return response;
  },
);

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    return await getProductById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return rejectWithValue("Product Not Found");
      }

      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }

    return rejectWithValue("Unexpected error.");
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
      state.details.loading = false;
      state.details.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.list.loading = true;
      state.list.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.list.loading = false;
      state.list.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error.message ?? "Something went wrong";
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.selectedProduct = null;
      state.details.loading = true;
      state.details.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      state.details.loading = false;
      state.details.error = null;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.details.loading = false;
      state.details.error = action.payload ?? "Something went wrong";
    });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export const productReducer = productsSlice.reducer;
