export type Product = {
  id: number;
  title: string;
  price: string;
  stock: number;
  imageUrl: string;
  categoryId: number;
  isActive: boolean;
  createdAt: string;
  updated: string;
};

export type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
  list: {
    loading: boolean;
    error: string | null;
  };

  details: {
    loading: boolean;
    error: string | null;
  };
};
