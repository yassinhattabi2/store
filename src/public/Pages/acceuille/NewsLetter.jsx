import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Newsletter = () => {
  return (
    <Box
      sx={{
 
        padding: '40px 20px',
        borderRadius: '8px',
    
        textAlign: 'center',
        
      
        animation: 'fadeIn 1.2s ease-in-out',
      }}
    >
      {/* Titre */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: '16px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Subscribe to Our Newsletter
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          marginBottom: '24px',
          color: '#555',
        }}
      >
        Get the latest updates, exclusive offers, and insights directly in your inbox. Sign up now!
      </Typography>

      {/* Formulaire */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          size="small"
          fullWidth
          sx={{
            maxWidth: '300px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            input: { padding: '10px' },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: 'white',
              color:'black'
            },
          }}
        >
          Subscribe
        </Button>
      </Box>

      {/* Mention */}
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          marginTop: '16px',
          color: '#888',
        }}
      >
        We respect your privacy. Unsubscribe anytime.
      </Typography>
 
    </Box>
  );
};

export default Newsletter;
