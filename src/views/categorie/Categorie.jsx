import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Helmet } from "react-helmet";

const API_URL = "http://localhost:5000/api/categories";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    setOpenModal(true);
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory(null);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      let response;
      if (currentCategory) {
        // Edit existing category
        response = await axios.put(`${API_URL}/${currentCategory.id}`, values);
        setCategories(
          categories.map((category) =>
            category.id === currentCategory.id ? response.data : category
          )
        );
        setSuccessModalMessage("Category successfully updated!");
      } else {
        // Add new category
        response = await axios.post(API_URL, values);
        setCategories([...categories, response.data]);
        setSuccessModalMessage("Category successfully added!");
      }
      setLoading(false);
      handleCloseModal();
      setTimeout(() => {
        setSuccessModalMessage(""); // Clear the success message after showing modal
      }, 3000);
    } catch (error) {
      console.error("Error saving category:", error);
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      setSuccessModalMessage("Category successfully deleted!"); // Success message for deletion
      setTimeout(() => {
        setSuccessModalMessage(""); // Clear success message after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Filter categories by search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <Box p={3}>
       <Helmet>
        <title>Categories</title>
        
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "1rem", width: "120vh" }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenModal(category)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
      />

      {/* Add/Edit Category Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{currentCategory ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: currentCategory ? currentCategory.name : "",
              description: currentCategory ? currentCategory.description : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <Form>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  margin="dense"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="dense"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <DialogActions>
                  <Button onClick={handleCloseModal}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={Boolean(successModalMessage)} onClose={() => setSuccessModalMessage("")}>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <CheckCircleIcon color="success" sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h6" align="center">{successModalMessage}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CategoryTable;
