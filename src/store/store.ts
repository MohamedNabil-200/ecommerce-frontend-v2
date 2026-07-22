import { authStorage } from "../features/auth/auth.storage";
import { initialState as authInitialState } from "../features/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/products.slice";
import { authReducer } from "../features/auth/auth.slice";

const storedAuth = authStorage.loadAuth();
const preloadedState = storedAuth
  ? {
      auth: {
        ...authInitialState,
        user: storedAuth.user,
        token: storedAuth.token,
      },
    }
  : undefined;

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
