import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CategoryTable from 'views/categorie/Categorie';
import OrderPage from 'views/order/Orders';
import AuthGuard from './AuthGuard';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const UserTable = Loadable(lazy(() => import('views/client/Client')));
const Setting = Loadable(lazy(() => import('views/setting/Setting')));
const ProductTable = Loadable(lazy(() => import('views/product/Produit')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element:(
    <AuthGuard>
     <MainLayout />
    </AuthGuard>
  )  ,
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
         <DashboardDefault />
        </AuthGuard>
      ) 
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'admin',
          element:(
            <AuthGuard>
             <DashboardDefault />
            </AuthGuard>
          ) 
        }
      ]
    },
    {
      path: 'client',
      element: 
      <AuthGuard>
            <UserTable />
            </AuthGuard>
      
    },
    
    {
      path: 'setting',
      element:
      <AuthGuard>
           <Setting />
            </AuthGuard>
    }
    ,
    {
      path: 'Produit',
      element: 
      <AuthGuard>
      <ProductTable />
       </AuthGuard>
    },
    {
      path: 'categorie',
      element: 
      <AuthGuard>
      <CategoryTable />
       </AuthGuard>
    },
    {
      path: 'Order',
      element:
      <AuthGuard>
       <OrderPage />
       </AuthGuard>
    }
  
  ]
};

export default MainRoutes;
