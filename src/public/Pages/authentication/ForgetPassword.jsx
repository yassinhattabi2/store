import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios'; 
import EcommerceAppBar from '../../component/appbar';
import { Helmet } from 'react-helmet';


const customTheme = extendTheme({ defaultColorScheme: 'dark' });

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

// Custom Error Message Component
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

export default function ForgotPassword() {
  const handleSubmitForm = async (values, actions) => {
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email: values.email });
      alert(`Reset link sent to ${values.email}`);
      actions.setSubmitting(false);
    } catch (error) {
      console.error('Error sending reset link:', error);
      alert('email not found');
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
        
      </Helmet>
       <EcommerceAppBar/>
      <CssVarsProvider theme={customTheme} disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ':root': {
              '--Form-maxWidth': '800px',
              '--Transition-duration': '0.4s',
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width: { xs: '100%', md: '50vw' },
            transition: 'width var(--Transition-duration)',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            position: 'relative',
            zIndex: 1,
              marginLeft:"25%",
            display: 'flex',
            justifyContent: 'flex-end',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255 255 255 / 0.2)',
            [theme.getColorSchemeSelector('dark')]: {
              backgroundColor: 'rgba(19, 19, 24, 0.4)',
            },
          })}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100dvh',
              width: '100%',
              px: 2,
            }}
          >
            <Box component="main"
              sx={{
                my: 'auto',
                py: 2,
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 400,
                maxWidth: '100%',
                mx: 'auto',
                borderRadius: 'sm',
                '& form': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                },
              }}
            >
              <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                  <Typography component="h1" level="h3">
                    Forgot Password
                  </Typography>
                  <Typography level="body-sm">
                    Enter your email address to receive a reset link.
                  </Typography>
                </Stack>
              </Stack>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
              >
                {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                      />
                      {touched.email && errors.email && (
                        <ErrorMessageStyled message={errors.email} />
                      )}
                    </FormControl>
                    <Stack sx={{ gap: 4, mt: 2 }}>
                      <Button type="submit" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                      <Typography level="body-sm">
                        Remembered your password?{' '}
                        <Link href="auth/register" level="title-sm">
                          Sign in!
                        </Link>
                      </Typography>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
     
      
      </CssVarsProvider>
    </>
  );
}
