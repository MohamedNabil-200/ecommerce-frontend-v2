import { Button, Stack, Typography } from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const CartEmptyState = () => {
  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      {/*Lottie Animation Later */}
      <Typography variant="h5">Your Cart is empty</Typography>
      <Typography color="text.secondary">
        Looks like you haven't added any products yet.
      </Typography>
      <Button component={RouterLink} to="/products" variant="contained">
        Browse Products
      </Button>
    </Stack>
  );
};

export default CartEmptyState;
