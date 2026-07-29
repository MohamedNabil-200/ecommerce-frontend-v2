import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { Alert, Container, Grid, Stack, Typography } from "@mui/material";

import CartItem from "../components/cart/CartItem";
import CartEmptyState from "../components/cart/CartEmptyState";
import OrderSummaryCard from "../components/cart/OrderSummaryCard";

import { getCartThunk } from "../features/cart/cart.thunks";
import {
  selectIsCartFetched,
  selectCartItems,
  selectGetCartError,
  selectGetCartLoading,
} from "../features/cart/cart.selectors";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const isFetched = useAppSelector(selectIsCartFetched);
  const loading = useAppSelector(selectGetCartLoading);
  const error = useAppSelector(selectGetCartError);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getCartThunk());
    }
  }, [dispatch, isFetched]);

  if (loading)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Shopping Cart
        </Typography>
        <Typography>Loading Cart...</Typography>
      </Container>
    );

  if (error && error !== "Cart is Empty")
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Shopping Cart
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (items.length === 0)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Shopping Cart
        </Typography>
        <CartEmptyState />
      </Container>
    );

  const subtotal = items.reduce(
    (sum: number, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummaryCard
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
