import type { RootState } from "../../store";

export const selectCategories = (state: RootState) =>
  state.categories.categories;

export const selectCategoriesLoading = (state: RootState) =>
  state.categories.loading;

export const selectCategoriesError = (state: RootState) =>
  state.categories.error;

export const selectCategoriesFetched = (state: RootState) =>
  state.categories.isFetched;