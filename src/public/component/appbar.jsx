import React, { useState, startTransition } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Badge, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from "../component/Cart"; // Import the CartDrawer component
import { useSelector } from "react-redux"; // Import useSelector to access cart from Redux
import ProfileSection from "../../layout/MainLayout/Header/ProfileSection/"; // <-- Import ProfileSection

// Styled Components
const AppBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "2px 20px",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: theme.shape.borderRadius,
  padding: "0 10px",
  flex: 1,
  maxWidth: "500px",
}));

const AppBarButton = styled(Button)(({ theme }) => ({
  color: "#333",
  textTransform: "capitalize",
  fontWeight: "500",
  marginLeft: theme.spacing(2),
  "&:hover": {
    backgroundColor: "white",
  },
}));

const EcommerceAppBar = () => {
  const [isSidecarOpen, setIsSidecarOpen] = useState(false);
  const cart = useSelector((state) => state.cart.items); // Accessing cart state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Accessing auth state from Redux

  const navigate = useNavigate();

  // Calculate the total number of items in the cart (sum of all quantities)
  const totalUniqueProductsInCart = cart.length;

  const toggleSidecar = (open) => () => {
    setIsSidecarOpen(open);
  };

  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <>
      <AppBarContainer position="fixed">
        <Toolbar>
          {/* Logo */}
          <Box
      sx={{
        textAlign: "center", // Center the text
        p: 3, // Add some padding
        background: "", // Gradient background
        borderRadius: "12px", // Rounded corners
        
      }}
    >
      <Typography
        variant="h2"
        noWrap
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(135deg, #333, #555)", 
          WebkitBackgroundClip: "text", 
          WebkitTextFillColor: "transparent",
          animation: "glow 2s infinite alternate",
          textTransform: "uppercase",
          letterSpacing: "3px", 
          "@keyframes glow": {
            "0%": { textShadow: "0 0 5px #fff, 0 0 10px #ffd700" },
            "100%": { textShadow: "0 0 10px #ffd700, 0 0 20px #ffa500" },
          },
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          Touche d'or
        </Link>
      </Typography>
    </Box>



          {/* Search Bar */}
          <SearchContainer sx={{ marginLeft: { xs: 0, sm: 10 } }}>
            <InputBase placeholder="Search products..." sx={{ color: "#333", flex: 1 }} />
            <IconButton type="submit" sx={{ color: "#333" }}>
              <SearchIcon />
            </IconButton>
          </SearchContainer>

          {/* Navigation Buttons */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1, justifyContent: "center" }}>
            <AppBarButton onClick={() => handleNavigation("/home")}>Home</AppBarButton>
            <AppBarButton onClick={() => handleNavigation("/product")}>Product</AppBarButton>
            <AppBarButton>Contact us</AppBarButton>
          </Box>

          {/* Cart Icon */}
          <IconButton size="large" color="inherit" sx={{ marginRight: 1 }} onClick={toggleSidecar(true)}>
            <Badge badgeContent={totalUniqueProductsInCart} color="error">
              <ShoppingCartIcon sx={{ color: "#333" }} />
            </Badge>
          </IconButton>

          {/* Conditionally render ProfileSection or Sign-In/Sign-Up buttons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              // If authenticated, show the ProfileSection component
              <ProfileSection />
            ) : (
              // If not authenticated, show the Sign-In/Sign-Up buttons
              <>
                <Button
                  variant="outlined"
                  onClick={() => handleNavigation("/register")}
                  sx={{ color: "#333", borderColor: "#333", textTransform: "capitalize", marginRight: 1 }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleNavigation("/login")}
                  sx={{ backgroundColor: "#333", color: "#fff", textTransform: "capitalize" }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBarContainer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isSidecarOpen} toggleDrawer={toggleSidecar} />
    </>
  );
};

export default EcommerceAppBar;
