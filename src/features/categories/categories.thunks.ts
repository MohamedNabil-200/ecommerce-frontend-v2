import { createApiThunk } from "../../api/create-api-thunk";
import { categoriesService } from "./categories.service";
import type { Category } from "./categories.types";

export const fetchCategoriesThunk = createApiThunk<Category[]>(
  "categories/fetchCategories",
  () => categoriesService.getCategories()
)