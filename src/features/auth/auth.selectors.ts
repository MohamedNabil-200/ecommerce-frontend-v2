import type { RootState } from "../../store";

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectLoginLoading = (state: RootState) =>
  state.auth.login.loading;

export const selectLoginError = (state: RootState) => state.auth.login.error;

export const selectRegisterLoading = (state: RootState) =>
  state.auth.register.loading;

export const selectRegisterError = (state: RootState) =>
  state.auth.register.error;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token);
