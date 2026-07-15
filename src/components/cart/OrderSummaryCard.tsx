import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import formatCurrency from "../../utils/formatCurrency";

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
          <Button variant="contained" fullWidth>
            Proceed to Checkout
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
