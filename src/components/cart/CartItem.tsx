import type { Product } from "../../features/products/products.types";
import formatCurrency from "../../utils/formatCurrency";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

type CartItemProps = {
  product: Product;
  quantity: number;
};

const CartItem = ({ product, quantity }: CartItemProps) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box component={RouterLink} to={`/products/${product.id}`}>
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.title}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Link
                component={RouterLink}
                to={`/products/${product.id}`}
                underline="hover"
                color="inherit"
              >
                <Typography variant="h6">{product.title}</Typography>
              </Link>
              <Typography>{formatCurrency(product.price)}</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton color="primary">
                  <RemoveCircleRoundedIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton color="primary">
                  <AddCircleOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton color="error">
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
