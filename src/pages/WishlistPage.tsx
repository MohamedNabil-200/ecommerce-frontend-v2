import { useAppSelector, useAppDispatch } from "../store";
import {
  selectWishlistItems,
  selectWishlistFetched,
  selectGetWishlistLoading,
  selectGetWishlistError,
} from "../features/wishlist/wishlist.selectors";
import WishlistEmptyState from "../components/wishlist/WishlistEmptyState";
import { Container, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { getWishlistThunk } from "../features/wishlist/wishlist.thunks";
import WishlistItem from "../components/wishlist/WishlistItem";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const isFetched = useAppSelector(selectWishlistFetched);
  const loading = useAppSelector(selectGetWishlistLoading);
  const error = useAppSelector(selectGetWishlistError);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getWishlistThunk());
    }
  }, [dispatch, isFetched]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (items.length === 0) {
    return (
      <Container maxWidth="lg">
        <WishlistEmptyState />
      </Container>
    );
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{mb: "4"}}>My Wishlist</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 2 }}>
            <WishlistItem item={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WishlistPage;
