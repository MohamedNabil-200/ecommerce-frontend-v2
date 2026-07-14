import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { Product } from "../../features/products/products.types";
import formatCurrency from "../../utils/formatCurrency";

type WishlistItemProps = {
  product: Product;
};

const WishlistItem = ({ product }: WishlistItemProps) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.title}
              sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography>{product.title}</Typography>
              <Typography color="text.secondary">Category</Typography>
              <Typography>{formatCurrency(product.price)}</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2}>
              <Button variant="outlined" color="error">
                Remove from wishlist
              </Button>
              <Button variant="contained">Add to cart</Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WishlistItem;
