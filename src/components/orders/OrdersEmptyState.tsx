import { Link as RouterLink } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const OrdersEmptyState = () => {
  return (
    <Stack
      spacing={2}
      sx={{ py: 8, alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h5">No Orders Yet</Typography>

      <Typography color="textSecondary">
        Looks like you haven't placed any orders.
      </Typography>

      <Button component={RouterLink} to="/products" variant="contained">
        Start Shopping
      </Button>
    </Stack>
  );
};

export default OrdersEmptyState;
