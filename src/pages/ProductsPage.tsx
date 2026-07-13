import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/products/products.slice";
import {
  selectProductsLoading,
  selectProductsError,
  selectProducts,
} from "../features/products/products.selectors";
import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ProductCard from "../components/products/ProductCard";
import ProductCardSkeleton from "../components/products/ProductCardSkeleton";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {...Array(8).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ py: "4" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (products.length === 0)
    return (
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "60vh",
        }}
      >
        <Inventory2OutlinedIcon />
        <Typography variant="h6">No products found</Typography>
        <Typography>There are currently no products available.</Typography>
      </Box>
    );
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard
              product={product}
              onViewDetails={(product) => navigate(`/products/${product.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
