import { authStorage } from "../features/auth/auth.storage";
import { initialState as authInitialState } from "../features/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/products.slice";
import { authReducer } from "../features/auth/auth.slice";
import { wishlistReducer } from "../features/wishlist/wishlist.slice";
import { cartReducer } from "../features/cart/cart.slice";
import { ordersReducer } from "../features/orders/orders.slice";
import { categoryReducer } from "../features/categories/categories.slice";

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
    wishlist: wishlistReducer,
    cart: cartReducer,
    orders: ordersReducer,
    categories: categoryReducer
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
