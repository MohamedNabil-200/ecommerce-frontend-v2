import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

import type { Category } from "./categories.types";
import type { ApiResponse } from "../../api/api.types";

const getCategories = async () => {
  const response = await api.get<ApiResponse<Category[]>>(ENDPOINTS.CATEGORIES);
  return response.data.data;
};

export const categoriesService = { getCategories };
