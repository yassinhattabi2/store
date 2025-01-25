import { lazy } from 'react';

const Signin = lazy(() => import('public/Pages/authentication/Signin'));
const Signup = lazy(() => import('public/Pages/authentication/Signup'));
const ForgetPassword = lazy(() => import('public/Pages/authentication/ForgetPassword'));
const ChangePassword = lazy(() => import('public/Pages/authentication/ChangePassword'));

// Routes configuration
const AuthRoutes = {
    path: '/',
    element: "", // Replace with your authentication layout if you have one
    children: [
      {
        path: 'login',
        element: <Signin />, // Signin component
      },
      {
        path: 'register',
        element: <Signup />, // Signup component
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />, // Forget Password component
      },
      {
        path: 'change-password',
        element: <ChangePassword />, // Change Password component
      },
    ],
  };
  
  export default AuthRoutes;
  
