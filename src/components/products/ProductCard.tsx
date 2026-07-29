import { useAppDispatch, useAppSelector } from "../../store";
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
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import type { Product } from "../../features/products/products.types";
import formatCurrency from "../../utils/formatCurrency";

import {
  selectIsProductInWishlist,
  selectWishlistFetched,
} from "../../features/wishlist/wishlist.selectors";
import {
  selectIsCartFetched,
  selectIsProductInCart,
} from "../../features/cart/cart.selectors";

import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../features/wishlist/wishlist.thunks";
import { addToCartThunk } from "../../features/cart/cart.thunks";

type ProductCardProps = {
  product: Product;
  onViewDetails?: (product: Product) => void;
};

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsProductInWishlist(product.id));
  const isWishlistFetched = useAppSelector(selectWishlistFetched);

  const isInCart = useAppSelector(selectIsProductInCart(product.id));
  const isCartFetched = useAppSelector(selectIsCartFetched);

  const handleWishlistClick = () => {
    if (!isWishlistFetched) return;
    if (isInWishlist) {
      dispatch(removeFromWishlistThunk(product.id));
    } else {
      dispatch(addToWishlistThunk(product.id));
    }
  };

  const handleAddToCart = () => {
    if (!isCartFetched || isInCart || product.stock <= 0) return;

    dispatch(addToCartThunk(product.id));
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
          disabled={!isWishlistFetched}
        >
          {isInWishlist ? (
            <FavoriteOutlinedIcon color="error" />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          aria-label={isInCart ? "Product already in cart" : "Add to cart"}
          onClick={handleAddToCart}
          disabled={!isCartFetched || isInCart || product.stock <= 0}
        >
          {isInCart ? (
            <ShoppingCartIcon color="success" />
          ) : (
            <ShoppingCartOutlinedIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
