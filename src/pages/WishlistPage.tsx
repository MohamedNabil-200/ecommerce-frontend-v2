import { useAppSelector } from "../store";
import { selectProducts } from "../features/products/products.selectors";
import WishlistEmptyState from "../components/wishlist/WishlistEmptyState";
import { Container, List, ListItem } from "@mui/material";
import WishlistItem from "../components/wishlist/WishlistItem";

const WishlistPage = () => {
  const products = useAppSelector(selectProducts);

  // Temporary mock until wishlist state is implemented
  const wishlistProducts = products.slice(0, 2);

  if (wishlistProducts.length === 0) {
    return (
      <Container maxWidth="lg">
        <WishlistEmptyState />
      </Container>
    );
  }
  return (
    <Container maxWidth="lg">
      <List>
        {wishlistProducts.map((product) => (
          <ListItem key={product.id} disablePadding sx={{ mb: 2 }}>
            <WishlistItem product={product} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WishlistPage;
