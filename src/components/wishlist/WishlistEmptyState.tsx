import { Link as RouterLink } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const WishlistEmptyState = () => {
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
        <Typography variant="h5">Your wishlist is empty</Typography>
        <Typography color="text.secondary">
          Save your favorite products to find them later.
        </Typography>
        <Button component={RouterLink} to="/products" variant="contained">
          Browse Products
        </Button>
      </Stack>
  );
};

export default WishlistEmptyState;
