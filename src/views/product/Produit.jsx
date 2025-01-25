import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { Helmet } from "react-helmet";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    ProductID: "",
    ProductName: "",
    Category: "",
    Price: "",
    Description: "",
    DateAdded: "",
    img: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  const API_URL = "http://localhost:5000/api/product";
  const CATEGORY_API_URL = "http://localhost:5000/api/categories"; // API for categories

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [productResponse, categoryResponse] = await Promise.all([
        axios.get(API_URL),
        axios.get(CATEGORY_API_URL),
      ]);

      const categoriesMap = categoryResponse.data.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});

      const productsWithCategoryNames = productResponse.data.map((product) => ({
        ...product,
        CategoryName: categoriesMap[product.Category] || "Unknown",
      }));

      setProducts(productsWithCategoryNames);
      setCategories(categoryResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setOpenModal(true);
    if (product) {
      setCurrentProduct(product);
      setFormData(product);
      setPreviewImage(product.img ? `http://localhost:5000${product.img}` : "");
    } else {
      setCurrentProduct(null);
      setFormData({
        ProductID: "",
        ProductName: "",
        Category: "",
        Price: "",
        Description: "",
        DateAdded: "",
        img: "",
      });
      setPreviewImage("");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    try {
      const newProduct = {
        ...formData,
        DateAdded: new Date().toISOString().split("T")[0], // Current date
      };

      const formDataObj = new FormData();
      formDataObj.append("ProductName", newProduct.ProductName);
      formDataObj.append("Category", newProduct.Category);
      formDataObj.append("Price", newProduct.Price);
      formDataObj.append("Description", newProduct.Description);
      formDataObj.append("DateAdded", newProduct.DateAdded);

      if (formData.img instanceof File) {
        formDataObj.append("image", formData.img);
      } else {
        formDataObj.append("img", formData.img);
      }

      if (currentProduct) {
        await axios.put(`${API_URL}/${currentProduct.ProductID}`, formDataObj);
        fetchProducts();
      } else {
        await axios.post(API_URL, formDataObj);
        fetchProducts();
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.ProductID !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewPath = URL.createObjectURL(file);
      setPreviewImage(previewPath);
      setFormData({ ...formData, img: file });
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box p={3}>
       <Helmet>
        <title>Product</title>
        
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Add
        </Button>
      </Box>
      <Box alignItems="center" mb={4}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "1rem", width: "170vh" }}
        />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
              
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow key={product.ProductID}>
                  <TableCell>
                    {product.img ? (
                      <img
                        src={`${product.img}`}
                        alt={product.ProductName}
                        style={{ width: 50, height: 50 }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                 
                  <TableCell>{product.ProductName}</TableCell>
                  <TableCell>{product.Price}</TableCell>
                  <TableCell>{product.CategoryName}</TableCell>
                  <TableCell>{product.Description}</TableCell>
                  <TableCell>{product.DateAdded}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(product.ProductID)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
<Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
  <DialogTitle>
    <Typography variant="h6" component="div" align="center" gutterBottom>
      {currentProduct ? "Edit Product" : "Add Product"}
    </Typography>
  </DialogTitle>
  <DialogContent>
    <Box component="form" mt={2} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Product Name"
        name="ProductName"
        value={formData.ProductName}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
        variant="outlined"
        required
      />
      <FormControl fullWidth margin="dense">
        <InputLabel>Category</InputLabel>
        <Select
          name="Category"
          value={formData.Category}
          onChange={handleInputChange}
          fullWidth
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Price"
        name="Price"
        value={formData.Price}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        label="Description"
        name="Description"
        value={formData.Description}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
        variant="outlined"
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        component="label"
        color="primary"
        sx={{ alignSelf: "start" }}
      >
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </Button>
      {previewImage && (
        <Box mt={2} textAlign="center">
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      )}
    </Box>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
    <Button
      onClick={handleCloseModal}
      variant="outlined"
      color="secondary"
      sx={{ minWidth: 120 }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleSave}
      variant="contained"
      color="primary"
      sx={{ minWidth: 120 }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default ProductTable;
