import type { Product } from "../products/products.types";

export type TWishlistItem = {
  id: number;
  userId: number;
  productId: number;
  product: Product;
};

export type WishlistResponse = TWishlistItem[];

export type WishlistState = {
  items: TWishlistItem[];
  isFetched: boolean;

  getWishlist: {
    loading: boolean;
    error: string | null;
  };

  addToWishlist: {
    loading: boolean;
    error: string | null;
  };

  removeFromWishlist: {
    loading: boolean;
    error: string | null;
  };
};
