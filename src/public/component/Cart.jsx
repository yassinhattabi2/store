import React, { useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, IconButton, Button, Stack, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, updateQuantity, clearCart } from 'store/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const cart = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check authentication state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPending, startTransition] = useTransition();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  const handleRemoveItem = (ProductID) => {
    dispatch(removeFromCart(ProductID));
  };


  const handleUpdateQuantity = (ProductID, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ ProductID, quantity: newQuantity }));
    } else {
      handleRemoveItem(ProductID); // Remove item if quantity is 0
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.Price * item.quantity, 0);

  // Handle checkout button click
  const handleCheckout = () => {
    if (cart.length === 0) {
      setSnackbarOpen(true); // Open Snackbar if cart is empty
    } else {
      startTransition(() => {
        if (isAuthenticated) {
          navigate('/checkout'); // Redirect to checkout if authenticated
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      });
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 400, padding: 3, backgroundColor: '#f5f5f5' }}>
        {/* Close Button */}
        <IconButton onClick={toggleDrawer(false)} sx={{ marginBottom: 2 }}>
          <CloseIcon sx={{ fontSize: 30, color: '#333' }} />
        </IconButton>

        {/* Cart Title */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#333' }}>
          Your Cart
        </Typography>

        {/* Cart Items */}
        {cart.length > 0 ? (
          cart.map((item) => (
            <Stack
              key={item.ProductID}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ marginBottom: 3 }}
            >
              {/* Product Image */}
              <Box
                component="img"
                src={item.img}
                alt={item.ProductName}
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  borderRadius: 2,
                  border: '1px solid #ddd',
                }}
              />
              {/* Product Details */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                  {item.ProductName}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: 14 }}>
                  ${item.Price} x {item.quantity}
                </Typography>
              </Box>
              {/* Quantity Control */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  size="small"
                  onClick={() => handleUpdateQuantity(item.ProductID, item.quantity - 1)}
                  color="secondary"
                  sx={{ fontSize: 18 }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ fontSize: 16 }}>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleUpdateQuantity(item.ProductID, item.quantity + 1)}
                  color="primary"
                  sx={{ fontSize: 18 }}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
              {/* Remove Button */}
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveItem(item.ProductID)}
                sx={{ fontSize: 20 }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))
        ) : (
          // Show message when cart is empty
          <Typography sx={{ fontSize: 16, color: '#777' }}>
            Your cart is empty. Start adding items!
          </Typography>
        )}

        {/* Total Price */}
        {cart.length > 0 && (
          <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', marginTop: 2, color: '#333' }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        )}

        {/* Checkout Button */}
        <Button
          variant="contained"
          color="dark"
          fullWidth
          onClick={handleCheckout} // Use handleCheckout for the button click
          sx={{ marginTop: 3, padding: '12px 0', fontSize: 16, color: 'white' }}
        >
          Checkout
        </Button>

        {/* Clear Cart Button */}
        <Button
          variant="outlined"
          color="dark"
          fullWidth
          onClick={handleClearCart}
          sx={{ marginTop: 1, padding: '12px 0', fontSize: 16 }}
        >
          Clear Cart
        </Button>
      </Box>

      {/* Snackbar for Empty Cart */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Your cart is empty! Please add items before proceeding to checkout."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Drawer>
  );
};

export default CartDrawer