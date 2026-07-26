import { useAppDispatch } from "../../store";
import { removeFromWishlistThunk } from "../../features/wishlist/wishlist.thunks";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import formatCurrency from "../../utils/formatCurrency";
import type { TWishlistItem } from "../../features/wishlist/wishlist.types";

type WishlistItemProps = {
  item: TWishlistItem;
};

const WishlistItem = ({ item }: WishlistItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishlistThunk(item.productId));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              component="img"
              loading="lazy"
              src={item.product.imageUrl}
              alt={item.product.title}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                overflow: "hidden",
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="h5">{item.product.title}</Typography>
              <Typography color="text.secondary">Category</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {formatCurrency(item.product.price)}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ justifyContent: "end", display: "flex" }}
          >
            <Stack
              sx={{ justifyContent: "flex-end", alignItems: "end", gap: 2 }}
            >
              <Button variant="contained" fullWidth>
                Add to cart
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRemove}
                fullWidth
              >
                Remove from wishlist
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WishlistItem;
