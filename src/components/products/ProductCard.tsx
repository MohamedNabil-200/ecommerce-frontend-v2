import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import type { Product } from "../../features/products/products.types";
import formatCurrency from "../../utils/formatCurrency";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectIsProductInWishlist,
  selectWishlistFetched,
} from "../../features/wishlist/wishlist.selectors";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../features/wishlist/wishlist.thunks";

type ProductCardProps = {
  product: Product;
  onViewDetails?: (product: Product) => void;
};

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsProductInWishlist(product.id));
  const isFetched = useAppSelector(selectWishlistFetched);
  const handleWishlistClick = () => {
    if (!isFetched) return;
    if (isInWishlist) {
      dispatch(removeFromWishlistThunk(product.id));
    } else {
      dispatch(addToWishlistThunk(product.id));
    }
  };

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
        <IconButton
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistClick}
          disabled={!isFetched}
        >
          {isInWishlist ? (
            <FavoriteOutlinedIcon color="error" />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </IconButton>{" "}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
