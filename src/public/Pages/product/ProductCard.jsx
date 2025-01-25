import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Stack, Tooltip, Fab, Modal, Box } from '@mui/material';
import { IconBasket, IconEye } from '@tabler/icons-react';
import { addToCart, removeFromCart } from 'store/Slices/cartSlice'; // Import cart actions
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart); // Get cart state
  const [isDisabled, setIsDisabled] = useState(false); // Local state for button disable
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Check if the current product is in the cart
  const isProductInCart = items.some(item => item.ProductID === product.ProductID);

  useEffect(() => {
    setIsDisabled(isProductInCart); // Disable only if this product is in the cart
  }, [isProductInCart]);

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!isProductInCart) {
      dispatch(addToCart(product)); // Add product if it's not already in the cart
    }
  };

  // Handle removing product from cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.ProductID)); // Remove product from the cart
  };

  // Handle modal visibility
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          },
          opacity: isDisabled ? 0.5 : 1, // Dim the disabled product
        }}
      >
        <img
          src={product.img}
          alt={product.ProductName}
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {product.ProductName}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
            <Typography variant="h6" color="black">
              ${product.Price}
            </Typography>
          </Stack>
        </CardContent>

        {/* Add to Cart Button */}
        <Tooltip title={isProductInCart ? "Already in Cart" : "Add To Cart"} disableHoverListener={isProductInCart}>
          <span>
            <Fab
              size="small"
              color="primary"
              sx={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                backgroundColor: isProductInCart ? 'grey' : 'black',
                '&:hover': {
                  backgroundColor: isProductInCart ? 'grey' : '#1565c0',
                },
              }}
              onClick={handleAddToCart}
              disabled={isDisabled}
            >
              <IconBasket size="20" />
            </Fab>
          </span>
        </Tooltip>

        {/* Remove from Cart Button */}
        {isProductInCart && (
          <Fab
            size="small"
            color="secondary"
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
            onClick={handleRemoveFromCart}
          >
            <DeleteIcon />
          </Fab>
        )}

        {/* View Product Button */}
        <Tooltip title="View Product Details">
          <Fab
            size="small"
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: 'calc(50% - 20px)',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
            onClick={toggleModal}
          >
            <IconEye size="20" />
          </Fab>
        </Tooltip>
      </Card>

      {/* Modal for Product Details */}
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="product-details-title"
        aria-describedby="product-details-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '10px',
            p: 4,
          }}
        >
          <Typography id="product-details-title" variant="h5" fontWeight="bold" gutterBottom>
            {product.ProductName}
          </Typography>
          <img
            src={product.img}
            alt={product.ProductName}
            style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
          />
          <Typography id="product-details-description" variant="body1" gutterBottom>
            {product.Description}
          </Typography>
          <Typography id="product-details-description" variant="body1" gutterBottom>
          PrixHT : ${product.PrixHT}
          </Typography>
          <Typography id="product-details-description" variant="body1" gutterBottom>
          PrixTTC : ${product.PrixTTC}
          </Typography>
          <Typography variant="h6" fontWeight="medium" color="primary">
            Price: ${product.Price}
          </Typography>
          
        </Box>
      </Modal>
    </>
  );
};

export default ProductCard;
