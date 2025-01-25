import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import EcommerceAppBar from '../../component/appbar';
import { Helmet } from 'react-helmet';

// Validation schema
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});
const theme = extendTheme({
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          100: '#e0f7fa', // Provide color scales
        },
      },
    },
  },
});
// Error message component
const ErrorMessageStyled = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      color: 'red',
      padding: '8px 12px',
      borderRadius: '4px',
      marginTop: '4px',
    }}
  >
    <ErrorOutlineIcon sx={{ marginRight: 1 }} />
    <Typography level="body-xs">{message}</Typography>
  </Box>
);

export default function ChangePassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id'); 

  const handlePasswordChange = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/reset-password',
        {
          userId,
          newPassword: values.newPassword,
        }
      );

      if (response.status === 200) {
        alert('Password changed successfully');
      }
    } catch (error) {
      console.error('Error changing password:', error.response ? error.response.data : error);
      alert('Error changing password');
    }
  }

  return (
    <>
      <Helmet>
        <title>Change password</title>
      </Helmet>
    
        <CssBaseline />
        <CssVarsProvider theme={theme}>
        <EcommerceAppBar />
        <Box
          sx={{
            backgroundColor: 'primary.100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            px: 9,
            marginLeft: "25%",
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              width: 500,
              maxWidth: '100%',
              mx: 'auto',
              p: 3,
              borderRadius: 'sm',
            }}
          >
            <Typography component="h1" level="h3">
              Change Password
            </Typography>
            <Typography level="body-sm">
              Enter your new password to reset your account password.
            </Typography>

            <Formik
              initialValues={{ newPassword: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handlePasswordChange}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl required>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      error={touched.newPassword && Boolean(errors.newPassword)}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <ErrorMessageStyled message={errors.newPassword} />
                    )}
                  </FormControl>

                  <FormControl required>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <ErrorMessageStyled message={errors.confirmPassword} />
                    )}
                  </FormControl>

                  <Stack sx={{ gap: 2, mt: 2 }}>
                  <Button sx={{ fontSize: 'md' }}>Click Me</Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
        </CssVarsProvider>
    </>
  );
}
