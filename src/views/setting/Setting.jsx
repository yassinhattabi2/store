import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Helmet } from 'react-helmet';

// Yup validation schema
const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const PasswordUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);  // State for modal visibility
  const [modalMessage, setModalMessage] = useState('');  // State for modal message

  const handleUpdatePassword = async (values) => {
    setIsLoading(true);  // Show spinner while loading
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      alert('No valid authentication token found.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify({ password: values.password }), // Send new password
      });

      if (response.ok) {
        setModalMessage('Password updated successfully!');
        setOpenModal(true);  // Open the modal upon success

        // Automatically close the modal after 2 seconds
        setTimeout(() => {
          setOpenModal(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password.');
    } finally {
      setIsLoading(false); // Hide spinner after completion
    }
  };

  return (
    <Box sx={{ p: 4 }}>
       <Helmet>
        <title>Setting</title>
        
      </Helmet>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Update Password
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Please enter your new password and confirm it.
          </Typography>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleUpdatePassword}
          >
            {({ touched, errors }) => (
              <Form>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      as={TextField}
                      label="Password"
                      fullWidth
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="confirmPassword"
                      as={TextField}
                      label="Confirm Password"
                      fullWidth
                      type="password"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      required
                    />
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: 'right', mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}  // Disable the button while loading
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={openModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h6" align="center">{modalMessage}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PasswordUpdate;
