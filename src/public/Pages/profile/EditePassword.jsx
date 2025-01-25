import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const PasswordUpdate = () => {
  const [passwordDetails, setPasswordDetails] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const handleUpdatePassword = async () => {
    if (passwordDetails.password !== passwordDetails.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      alert('No valid authentication token found.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ password: passwordDetails.password }), 
      });
  
      if (response.ok) {
        alert('Password updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password.');
    }
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h1" gutterBottom>
            Password
          </Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Update password
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                name="password"
                value={passwordDetails.password}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm password"
                fullWidth
                type="password"
                name="confirmPassword"
                value={passwordDetails.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'right', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PasswordUpdate;
