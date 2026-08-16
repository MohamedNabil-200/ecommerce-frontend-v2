import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";

import { fetchCategoriesThunk } from "../features/categories/categories.thunks";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from "../features/categories/categories.selectors";
import { Box, Container, Typography } from "@mui/material";
import CategoryGrid from "../components/categories/CategoryGrid";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
          Categories
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 5 }}>
          Explore our products by category
        </Typography>

        {loading && <Typography>loading Categories...</Typography>}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && categories.length > 0 && (
          <CategoryGrid categories={categories} />
        )}

        {!loading && !error && categories.length === 0 && (
          <Typography color="text.secondary">No Categories Found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default CategoriesPage;
