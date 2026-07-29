import type { Product } from "../products/products.types";

export type TCartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
};

export type TCart = {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  items: TCartItem[];
};

export type CartResponse = TCart;

export type UpdatedCartQuantityRequest = {
  quantity: number;
};

export type CartState = {
  items: TCartItem[];
  isFetched: boolean;

  getCart: {
    loading: boolean;
    error: string | null;
  };

  addToCart: {
    loading: boolean;
    error: string | null;
  };

  updateCartQuantity: {
    loading: boolean;
    error: string | null;
  };

  removeFromCart: {
    loading: boolean;
    error: string | null;
  };

  clearCart: {
    loading: boolean;
    error: string | null;
  };
};
