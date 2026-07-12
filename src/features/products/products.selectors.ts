import type { RootState } from "../../store";

export const selectProduct = (state: RootState) => state.products.products;
export const selectedProductsLoading = (state: RootState) =>
  state.products.loading;
export const selectedProductsError = (state: RootState) => state.products.error;
