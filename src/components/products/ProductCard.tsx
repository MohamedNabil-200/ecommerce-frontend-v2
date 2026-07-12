import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { Product } from "../../features/products/products.types";
import formatCurrency from "../../utils/formatCurrency";

type ProductCardProps = {
  product: Product;
  onViewDetails?: (product: Product) => void;
};

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={product.imageUrl}
        alt={product.title}
        sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: "1" }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700 }}
          gutterBottom
        >
          {formatCurrency(product.price)}
        </Typography>
        <Chip
          label={product.stock > 0 ? "In Stock" : "Out of Stock"}
          color={product.stock ? "success" : "error"}
          size="small"
        />
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onViewDetails?.(product)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
