import { Container, Grid, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../store";
import { selectProducts } from "../features/products/products.selectors";
import OrderSummaryCard from "../components/cart/OrderSummaryCard";
import CartItem from "../components/cart/CartItem";
import CartEmptyState from "../components/cart/CartEmptyState";

const CartPage = () => {
  const products = useAppSelector(selectProducts);

  // Temporary mock until cart state is implemented
  const cartItems = products.slice(0, 0);

  if (cartItems.length === 0)
    return (
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Shopping Cart
        </Typography>
        <CartEmptyState />
      </Container>
    );

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {cartItems.map((product) => (
              <CartItem key={product.id} product={product} quantity={5} />
            ))}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummaryCard subtotal={240} shipping={20} total={260} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
