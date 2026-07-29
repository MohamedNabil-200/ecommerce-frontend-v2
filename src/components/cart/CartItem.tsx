import { useAppDispatch } from "../../store";
import { updateCartQuantityThunk } from "../../features/cart/cart.thunks";
import { removeFromCartThunk } from "../../features/cart/cart.thunks";
import { Link as RouterLink } from "react-router-dom";

import formatCurrency from "../../utils/formatCurrency";

import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import type { TCartItem } from "../../features/cart/cart.types";

type CartItemProps = {
  item: TCartItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const handleIncrease = () => {
    dispatch(
      updateCartQuantityThunk({
        productId: item.productId,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      dispatch(removeFromCartThunk(item.productId));
      return;
    }

    dispatch(
      updateCartQuantityThunk({
        productId: item.productId,
        quantity: item.quantity - 1,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCartThunk(item.productId));
  };
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box component={RouterLink} to={`/products/${item.productId}`}>
              <Box
                component="img"
                src={item.product.imageUrl}
                alt={item.product.title}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Link
                component={RouterLink}
                to={`/products/${item.productId}`}
                underline="hover"
                color="inherit"
              >
                <Typography variant="h6">{item.product.title}</Typography>
              </Link>
              <Typography>{formatCurrency(item.product.price)}</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <IconButton
                  color="primary"
                  aria-label="Decrease quantity"
                  onClick={handleDecrease}
                >
                  <RemoveCircleRoundedIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  color="primary"
                  aria-label="Increase quantity"
                  onClick={handleIncrease}
                >
                  <AddCircleOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color="error"
              aria-label="Remove item from cart"
              onClick={handleRemove}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
