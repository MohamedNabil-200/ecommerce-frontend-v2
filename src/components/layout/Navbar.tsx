import { useAppSelector, useAppDispatch } from "../../store";
import { selectIsAuthenticated } from "../../features/auth/auth.selectors";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { logout } from "../../features/auth/auth.slice";
import { authStorage } from "../../features/auth/auth.storage";

const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    authStorage.clearAuth();
    navigate("/auth/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 3, justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Ecommerce</Typography>
        </Box>

        {/* Navigation  */}
        <Box
          sx={{ flex: 1, display: "flex", gap: 3, justifyContent: "center" }}
        >
          <Button component={NavLink} to="/products" color="inherit">
            Products
          </Button>
          <Button component={NavLink} to="/categories" color="inherit">
            Categories
          </Button>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            gap: 3,
            ml: 4,
          }}
        >
          {isAuthenticated ? (
            <>
              <IconButton
                aria-label="Wishlist"
                component={NavLink}
                to="/wishlist"
                color="inherit"
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>

              <IconButton
                aria-label="Cart"
                component={NavLink}
                to="/cart"
                color="inherit"
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={NavLink} to="/auth/login" color="inherit">
                Login
              </Button>
              <Button component={NavLink} to="/auth/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
