import { createApiThunk } from "../../api/create-api-thunk";
import { productsService } from "./products.service";
import type { Product } from "./products.types";

export const fetchProductsThunk = createApiThunk<Product[]>(
  "products/fetchProducts",
  () => productsService.getProducts(),
);

export const fetchProductByIdThunk = createApiThunk<
  Product,
  number
>("products/fetchProductById", (id) => {
  return productsService.getProductById(id);
});
