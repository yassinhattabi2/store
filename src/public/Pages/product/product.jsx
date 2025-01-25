import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Grid, Box, Typography, TextField, InputAdornment, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Search as SearchIcon, GridView as GridViewIcon, ViewArray as ViewArrayIcon, AllInbox as AllInboxIcon } from '@mui/icons-material';
import axios from 'axios';
import EcommerceAppBar from 'public/component/appbar';
import Customization from 'layout/Customization';
import { Helmet } from 'react-helmet';
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories([{ id: null, name: 'All', icon: <AllInboxIcon /> }, ...response.data]); // Add 'All' option
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Filter products based on the search term and selected category
  const filteredProducts = products.filter((product) => {
    return (
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || product.Category === selectedCategory)
    );
  });

 
  const currentCategory = categories.find((category) => category.id === selectedCategory)?.name || "All";

  return (
    <Box sx={{ display: 'flex', height: '50vh', marginTop: '100px' }}>
      <Customization/>
      <Helmet>
        <title>Product</title>
      </Helmet>

<Box
  sx={{
    width: '300px',
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRight: '1px solid #ddd',
    position: 'fixed',
    top: '150px',
    bottom: 0,
    overflowY: 'auto',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '20px', color: '#333' }}>
    Categories
  </Typography>

  <Box
    sx={{
      padding: '15px',
      backgroundColor: 'dark',
      borderRadius: '10px',
      marginBottom: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="subtitle2" fontWeight="bold" color="dark" gutterBottom>
      Selected Category :
    </Typography>
    <Typography variant="h6" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
      {currentCategory}
    </Typography>
  </Box>

  <List>
    {categories.map((category) => (
      <ListItem
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        selected={selectedCategory === category.id} 
        sx={{
          cursor: 'pointer',
          borderRadius: '8px',
          marginBottom: '8px',
          padding: '10px 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textTransform: 'capitalize',
          transition: 'background-color 0.3s',
          backgroundColor: selectedCategory === category.id ? '#e9ecef' : 'transparent',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        {category.icon && (
          <Box
            sx={{
              width: '35px',
              height: '35px',
              backgroundColor: selectedCategory === category.id ? 'black' : '#f0f0f0',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: selectedCategory === category.id ? '#fff' : '#007bff',
              transition: 'all 0.3s',
            }}
          >
            {category.icon}
          </Box>
        )}
        <ListItemText
          primary={category.name}
          primaryTypographyProps={{
            fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
            fontSize: '16px',
            color: 'black',
          }}
        />
      </ListItem>
    ))}
  </List>

  <Divider sx={{ marginTop: '30px', marginBottom: '10px' }} />

  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
    Browse and explore various categories to find the products you need!
  </Typography>
</Box>

  
      <Box sx={{ flexGrow: 1, marginLeft: '300px', padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <EcommerceAppBar />

     
        <Box
          sx={{
            position: 'sticky',
            top: '100px',
            zIndex: 100,
            backgroundColor: 'white',
            padding: '20px',
           
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Discover Our Products
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginTop: '10px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

   
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button
              startIcon={<GridViewIcon />}
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              sx={{ background: 'black', color: 'white' }}
            >
              Grid
            </Button>
            <Button
              startIcon={<ViewArrayIcon />}
              onClick={() => setViewMode('block')}
              variant={viewMode === 'block' ? 'contained' : 'outlined'}
              sx={{ marginLeft: '10px', background: 'black', color: 'white' }}
            >
              Block
            </Button>
          </Box>
        </Box>

        <Box
  sx={{
    flexGrow: 1,
    overflowY: 'auto',
    paddingTop: '20px',
    marginTop: '20px',
    paddingBottom: '20px', 
  }}
>
  <Grid
    container
    spacing={viewMode === 'grid' ? 3 : 0}
    sx={{
      flexDirection: viewMode === 'block' ? 'column' : 'row', 
    }}
  >
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <Grid
          item
          xs={12}
          sm={viewMode === 'grid' ? 6 : 12}
          md={viewMode === 'grid' ? 4 : 12}
          lg={viewMode === 'grid' ? 3 : 12}
          key={product.ProductID}
          sx={{
            display: viewMode === 'block' ? 'flex' : 'block',
            flexDirection: viewMode === 'block' ? 'row' : 'column',
            gap: viewMode === 'block' ? '20px' : '0', 
            alignItems: viewMode === 'block' ? 'center' : 'unset', 
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))
    ) : (
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ width: '100%', textAlign: 'center', marginTop: '100px' }}
      >
        No products found matching your search.
      </Typography>
    )}
  </Grid>
</Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
