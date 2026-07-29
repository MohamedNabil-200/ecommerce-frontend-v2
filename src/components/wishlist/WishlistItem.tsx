import { useAppDispatch, useAppSelector } from "../../store";
import { removeFromWishlistThunk } from "../../features/wishlist/wishlist.thunks";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import formatCurrency from "../../utils/formatCurrency";
import type { TWishlistItem } from "../../features/wishlist/wishlist.types";
import { addToCartThunk } from "../../features/cart/cart.thunks";
import {
  selectIsCartFetched,
  selectIsProductInCart,
} from "../../features/cart/cart.selectors";

type WishlistItemProps = {
  item: TWishlistItem;
};

const WishlistItem = ({ item }: WishlistItemProps) => {
  const dispatch = useAppDispatch();
  const isCartFetched = useAppSelector(selectIsCartFetched);
  const isInCart = useAppSelector(selectIsProductInCart(item.productId));

  const handleRemove = () => {
    dispatch(removeFromWishlistThunk(item.productId));
  };

  const handleAddToCart = () => {
    if (!isCartFetched || isInCart) return;

    dispatch(addToCartThunk(item.productId));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              component="img"
              loading="lazy"
              src={item.product.imageUrl}
              alt={item.product.title}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                overflow: "hidden",
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="h5">{item.product.title}</Typography>
              <Typography color="text.secondary">Category</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {formatCurrency(item.product.price)}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ justifyContent: "end", display: "flex" }}
          >
            <Stack
              sx={{ justifyContent: "flex-end", alignItems: "end", gap: 2 }}
            >
              <Button
                aria-label="Add to cart"
                variant="contained"
                fullWidth
                onClick={handleAddToCart}
                disabled={!isCartFetched || isInCart}
              >
                Add to cart
              </Button>
              <Button
                aria-label="Remove from wishlist"
                variant="outlined"
                color="error"
                onClick={handleRemove}
                fullWidth
              >
                Remove from wishlist
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WishlistItem;
