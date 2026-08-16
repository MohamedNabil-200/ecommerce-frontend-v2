import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesThunk } from "./categories.thunks";
import type { CategoryState } from "./categories.types";

const initialState: CategoryState = {
  categories: [],
  isFetched: false,
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.isFetched = true;
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchCategoriesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.error.message ?? "Something went wrong.");
    });
  },
});

export const categoryReducer = categoriesSlice.reducer;