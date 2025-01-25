import { lazy } from 'react';
import AuthGuard from './AuthGuard';

const Acceuille = lazy(() => import('public/Pages/acceuille/'));
const ProductPage = lazy(() => import('public/Pages/product/product'));
const Checkout = lazy(() => import('public/Pages/checkout/Checkout'));
const ProfilePage = lazy(() => import('public/Pages/profile/Profilesetting'));
const Orders = lazy(() => import('public/Pages/commande/Commande'));


const PublicRoutes = {
  path: '/',
  children: [
    {
      path: 'Home',
      element: <Acceuille />,
    },
    {
      path: 'Orders',
      element: (
        <AuthGuard>
          <Orders />
        </AuthGuard>
      ),
    },
    {
      path: 'product',
      element: <ProductPage />,
    },
    {
      path: 'checkout',
      element: (
        <AuthGuard>
          <Checkout />
        </AuthGuard>
      ),
    },
    {
      path: 'profile',
      element: (
        <AuthGuard>
          <ProfilePage />
        </AuthGuard>
      ),
    },
   
  ],
};

export default PublicRoutes;
