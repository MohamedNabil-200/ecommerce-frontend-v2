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
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { clearCartThunk } from "../../features/cart/cart.thunks";

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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClearCart = async () => {
    try {
      await dispatch(clearCartThunk()).unwrap();
      setOpen(false);
    } catch {
      // surface error to the user (e.g. toast/snackbar) instead of closing silently
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
