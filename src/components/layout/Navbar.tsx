import { NavLink } from "react-router-dom";
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

const Navbar = () => {
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
          <IconButton component={NavLink} to="/wishlist" color="inherit">
            <FavoriteBorderOutlinedIcon />
          </IconButton>

          <IconButton component={NavLink} to="/cart" color="inherit">
            <ShoppingCartOutlinedIcon />
          </IconButton>

          <Button component={NavLink} to="/login" color="inherit">
            Login
          </Button>
          <Button component={NavLink} to="/register" color="inherit">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
