import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

import type { Product } from "./products.types";
import type { ApiResponse } from "../../types/api-response";

export const getProducts = async () => {
  const response = await api.get<ApiResponse<Product[]>>(ENDPOINTS.PRODUCTS);
  return response.data.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get<ApiResponse<Product>>(
    `${ENDPOINTS.PRODUCTS}/${id}`,
  );
  return response.data.data;
};
