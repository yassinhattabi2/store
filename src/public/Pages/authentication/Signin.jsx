import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/Slices/authSlice';
import { CssVarsProvider, CssBaseline, Box, Button, Checkbox, Divider, FormControl, FormLabel, Link, Input, Typography, Stack } from '@mui/joy';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EcommerceAppBar from '../../component/appbar';
import { Helmet } from 'react-helmet';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const ErrorMessageStyled = ({ message }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: '8px 12px', borderRadius: '4px', marginTop: '4px' }}>
    <ErrorOutlineIcon sx={{ marginRight: 1 }} />
    <Typography level="body-xs">{message}</Typography>
  </Box>
);

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
    <Helmet>
        <title>Sigin in</title>
        
      </Helmet>
      <EcommerceAppBar />
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ width: { xs: '100%', md: '50vw' }, position: 'relative', zIndex: 1, display: 'flex', marginLeft: '25%', justifyContent: 'flex-end', backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255 255 255 / 0.2)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', width: '100%', px: 2 }}>
            <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                <Typography level="title-lg">Water Day</Typography>
              </Box>
            </Box>
            <Box component="main" sx={{ my: 'auto', py: 2, pb: 5, display: 'flex', flexDirection: 'column', gap: 2, width: 400, maxWidth: '100%', mx: 'auto', borderRadius: 'sm' }}>
              <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                  <Typography component="h1" level="h3">Sign in</Typography>
                  <Typography level="body-sm">
                   {' '}
                    <Link href="register" level="title-sm">Sign up!</Link>
                  </Typography>
                </Stack>
              </Stack>
              <Divider>or</Divider>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Formik
                  initialValues={{ email: '', password: '', persistent: false }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                      const response = await axios.post('http://localhost:5000/api/signin', {
                        email: values.email,
                        password: values.password,
                      });
                  
                      const { role, statue, token, ...user } = response.data;
                  
                      if (role === 'client') {
                        if (statue === 'Bloqué') {
                        
                          
                        } else if (statue === 'Débloqué') {
                     
                          localStorage.setItem('token', token);
                          localStorage.setItem('user', JSON.stringify(user));
                  
                         
                          dispatch(login({ token, user }));
                  
                          navigate('/home'); 
                          return;
                        }
                      } else if (role === 'admin' && statue === '') {
                       
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));
                  
                        
                        dispatch(login({ token, user }));
                  
                        navigate('/dashboard/admin'); 
                        return;
                      }
                  
                      setErrors({ email: 'your Account is not active' });
                    } catch (error) {
                      console.error('Error during sign-in:', error);
                      setErrors({ email: 'Invalid account' });
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  
                >
                  {({ handleSubmit, handleChange, values, errors, touched }) => (
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
                        {touched.email && errors.email && <ErrorMessageStyled message={errors.email} />}
                      </FormControl>
                      <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          error={touched.password && Boolean(errors.password)}
                        />
                        {touched.password && errors.password && <ErrorMessageStyled message={errors.password} />}
                      </FormControl>
                      <Stack sx={{ gap: 4, mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Checkbox label="Remember me" name="persistent" checked={values.persistent} onChange={handleChange} />
                          <Link level="title-sm" href="forget-password">Forgot your password?</Link>
                        </Box>
                        <Button  type="submit" style={{ fontSize: '16px' }} sx={{backgroundColor:'black'}}>
  Sign in
</Button>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </Stack>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>

    </>
  );
}
