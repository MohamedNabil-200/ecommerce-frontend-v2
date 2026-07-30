import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import formatCurrency from "../../utils/formatCurrency";

import { clearCartThunk, getCartThunk } from "../../features/cart/cart.thunks";
import {
  getOrdersThunk,
  placeOrderThunk,
} from "../../features/orders/orders.thunks";

import { selectPlaceOrderLoading } from "../../features/orders/orders.selectors";

type OrderSummaryCardProps = {
  subtotal: number;
  shipping: number;
  total: number;
};

const OrderSummaryCard = ({
  subtotal,
  shipping,
  total,
}: OrderSummaryCardProps) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isPlacingOrder = useAppSelector(selectPlaceOrderLoading);

  const handleClearCart = async () => {
    try {
      await dispatch(clearCartThunk()).unwrap();
      setOpen(false);
    } catch {
      // surface error to the user (e.g. toast/snackbar) instead of closing silently
    }
  };
  const handleCheckout = async () => {
    try {
      await dispatch(placeOrderThunk()).unwrap();
      await Promise.all([
        dispatch(getOrdersThunk()).unwrap(),
        dispatch(getCartThunk()).unwrap(),
      ]);

      navigate("/orders");
    } catch {
      // Snackbar
    }
  };
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Order Summary</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography>Subtotal</Typography>
            <Typography>{formatCurrency(subtotal)}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography>Shipping</Typography>
            <Typography>{formatCurrency(shipping)}</Typography>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography>Total</Typography>
            <Typography>{formatCurrency(total)}</Typography>
          </Stack>
          <Button
            aria-label="Proceed to checkout"
            variant="contained"
            fullWidth
            disabled={isPlacingOrder}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
          <Button
            aria-label="Clear cart"
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => setOpen(true)}
          >
            Clear Cart
          </Button>
        </Stack>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Clear Cart?</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove all items from your cart?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              aria-label="Cancel clear cart"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              aria-label="Confirm clear cart"
              color="error"
              onClick={handleClearCart}
            >
              Clear
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
