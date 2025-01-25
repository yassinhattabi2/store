import React from 'react';
import { Box, Grid, Typography, TextField, Button, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, YouTube, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#0b0d17', color: '#fff', padding: '40px 20px' }}>
      <Grid container spacing={4}>
        {/* Section "Company" */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ color: '#ffa500', marginBottom: 2 }}>
            Company
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link href="#" underline="hover" color="inherit">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover" color="inherit">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover" color="inherit">
                Reservation
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover" color="inherit">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover" color="inherit">
                Terms & Condition
              </Link>
            </li>
          </ul>
        </Grid>

        {/* Section "Contact" */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ color: '#ffa500', marginBottom: 2 }}>
            Contact
          </Typography>
          <Typography>123 Street, New York, USA</Typography>
          <Typography>+012 345 67890</Typography>
          <Typography>info@example.com</Typography>
          <Box sx={{ marginTop: 2 }}>
            <IconButton color="inherit" href="#">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="#">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="#">
              <YouTube />
            </IconButton>
            <IconButton color="inherit" href="#">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Section "Opening" */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ color: '#ffa500', marginBottom: 2 }}>
            Opening
          </Typography>
          <Typography>Monday - Saturday</Typography>
          <Typography>09AM - 09PM</Typography>
          <Typography>Sunday</Typography>
          <Typography>10AM - 08PM</Typography>
        </Grid>

      
      </Grid>

      {/* Footer Bottom */}
      <Box
        sx={{
          borderTop: '1px solid #333',
          marginTop: '40px',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography>© Your Site Name, All Right Reserved.</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="#" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Cookies
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Help
          </Link>
          <Link href="#" underline="hover" color="inherit">
            FAQs
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
