import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";

import {
  selectProductError,
  selectProductLoading,
  selectProducts,
  selectSelectedProduct,
} from "../features/products/products.selectors";
import {
  selectIsProductInWishlist,
  selectWishlistFetched,
} from "../features/wishlist/wishlist.selectors";
import {
  fetchProductById,
  setSelectedProduct,
} from "../features/products/products.slice";

import formatCurrency from "../utils/formatCurrency";

import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  addToWishlistThunk,
  getWishlistThunk,
  removeFromWishlistThunk,
} from "../features/wishlist/wishlist.thunks";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const existingProduct = products.find((product) => product.id === productId);
  const isInStock = (selectedProduct?.stock ?? 0) > 0;
  const isInWishlist = useAppSelector(selectIsProductInWishlist(productId));
  const isFetched = useAppSelector(selectWishlistFetched);

  const handleWishlistClick = () => {
    if (!isFetched) return;
    if (isInWishlist) {
      dispatch(removeFromWishlistThunk(productId));
    } else {
      dispatch(addToWishlistThunk(productId));
    }
  };

  useEffect(() => {
    if (Number.isNaN(productId)) return;

    if (existingProduct) {
      dispatch(setSelectedProduct(existingProduct));
    } else {
      dispatch(fetchProductById(productId));
    }

    if (!isFetched) {
      dispatch(getWishlistThunk());
    }
  }, [dispatch, existingProduct, productId, isFetched]);

  if (Number.isNaN(productId)) {
    return <Navigate to="/products" replace />;
  }

  if (loading) return <Container>Loading...</Container>;

  if (error)
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (!selectedProduct)
    return (
      <Container>
        <Typography variant="h3">Product Not Found</Typography>
        <Typography variant="body1">
          The requested product doesn't exist.
        </Typography>
      </Container>
    );

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            component="img"
            src={selectedProduct.imageUrl}
            alt={selectedProduct.title}
            loading="lazy"
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              display: "block",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <Typography variant="h3">{selectedProduct.title}</Typography>
            <Rating
              name="product-rating"
              value={3.5}
              precision={0.5}
              readOnly
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {formatCurrency(selectedProduct.price)}
            </Typography>
            <Chip
              label={isInStock ? "In Stock" : "Out of Stock"}
              color={isInStock ? "success" : "error"}
              sx={{ width: "fit-content" }}
            />

            <Stack direction="row" spacing={2}>
              <Button variant="contained" disabled={!isInStock} fullWidth>
                Add to cart
              </Button>
              <IconButton
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={handleWishlistClick}
                disabled={!isFetched}
              >
                {isInWishlist ? (
                  <FavoriteOutlinedIcon color="error" />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}{" "}
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
