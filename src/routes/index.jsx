import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthRoutes from './auth';
import PublichRoutes from './PublicRoutes';



// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AuthRoutes,PublichRoutes],{
  basename:"/store"
});

export default router;
