import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

import type { Product } from "./products.types";
import type { ApiResponse } from "../../types/api-response";

const getProducts = async () => {
  const response = await api.get<ApiResponse<Product[]>>(ENDPOINTS.PRODUCTS);
  return response.data.data;
};

const getProductById = async (id: number) => {
  const response = await api.get<ApiResponse<Product>>(
    `${ENDPOINTS.PRODUCTS}/${id}`,
  );
  return response.data.data;
};

export const productsService = {
  getProducts,
  getProductById,
};
