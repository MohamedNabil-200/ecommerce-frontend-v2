import type { RootState } from "../../store";

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) =>
  state.products.list.loading;
export const selectProductsError = (state: RootState) =>
  state.products.list.error;

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;
export const selectProductLoading = (state: RootState) =>
  state.products.details.loading;
export const selectProductError = (state: RootState) =>
  state.products.details.error;
