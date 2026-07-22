import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";
import { loginThunk, registerThunk } from "./auth.thunks";

export const initialState: AuthState = {
  user: null,
  token: null,
  login: {
    loading: false,
    error: null,
  },
  register: {
    loading: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.login.loading = true;
      state.login.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.login.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload ?? "Something went wrong";
    });

    builder.addCase(registerThunk.pending, (state) => {
      state.register.loading = true;
      state.register.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.register.loading = false;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.register.loading = false;
      state.register.error = action.error.message ?? "Something went wrong";
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
