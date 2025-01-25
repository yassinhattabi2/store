// src/components/SignUp.jsx

import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 
import EcommerceAppBar from '../../component/appbar';
const customTheme = extendTheme({ defaultColorScheme: 'dark' });
import { Helmet } from "react-helmet";
import background from './istockphoto-1442837467-612x612.jpg'
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

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
    <Typography level="body-sm">{message}</Typography>
  </Box>
);

export default function SignUp() {
  const navigate = useNavigate(); 
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', values); 
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error.response) {
    
        console.error('Response Error:', error.response.data);
        alert('Email already in use');
      } else if (error.request) {
       
        console.error('Request Error:', error.request);
        alert('No response received from the server.');
      } else {
    
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
      }
    }
  };
  

  return (
    <>
 <Helmet>
        <title>Sigin up</title>
        
      </Helmet>
    <EcommerceAppBar/>
    <CssVarsProvider theme={customTheme} disableTransitionOnChange sx>
      
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
          marginTop:"5%",
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          


          
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '70dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
              
              <Typography level="title-lg"></Typography>
            </Box>
          </Box>
          <Box
            component="main"
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
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{' '}
                  <Link href="login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
              or
            </Divider>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                persistent: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit} 
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 2, 
                    }}
                  >
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>First Name</FormLabel>
                      <Field as={Input} name="firstName" />
                      <ErrorMessage name="firstName">
                        {message => <ErrorMessageStyled message={message} />}
                      </ErrorMessage>
                    </FormControl>
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>Last Name</FormLabel>
                      <Field as={Input} name="lastName"  />
                      <ErrorMessage name="lastName">
                        {message => <ErrorMessageStyled message={message} />}
                      </ErrorMessage>
                    </FormControl>
                  </Box>
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} type="email" name="email" />
                    <ErrorMessage name="email">
                      {message => <ErrorMessageStyled message={message} />}
                    </ErrorMessage>
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Field as={Input} type="password" name="password" />
                    <ErrorMessage name="password">
                      {message => <ErrorMessageStyled message={message} />}
                    </ErrorMessage>
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Confirm Password</FormLabel>
                    <Field as={Input} type="password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword">
                      {message => <ErrorMessageStyled message={message} />}
                    </ErrorMessage>
                  </FormControl>
                  <Stack sx={{ gap: 4, mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox size="sm" label="Remember me" name="persistent" />
                      <Link level="title-sm" href="forget-password">
                        Forgot your password?
                      </Link>
                    </Box>
                    <Button type="submit" fullWidth sx={{backgroundColor:'black'}}>
                      Sign up
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>

    </CssVarsProvider>
    </>
  );
}
