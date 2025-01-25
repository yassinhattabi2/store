// assets
import { 
  IconDashboard, 

  IconSettings, 
  IconUsers, 
  IconCategory, 
  IconPackage, 
  IconShoppingCart 
} from '@tabler/icons-react';

// constant
const icons = { 
  IconDashboard, 
  IconSettings, 
  IconUsers, 
  IconCategory, 
  IconPackage, 
  IconShoppingCart 
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/admin',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
 
    {
      id: 'Setting',
      title: 'Setting',
      type: 'item',
      url: '/Setting',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    {
      id: 'Client',
      title: 'Client',
      type: 'item',
      url: '/Client',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'categorie',
      title: 'Categorie',
      type: 'item',
      url: '/categorie',
      icon: icons.IconCategory,
      breadcrumbs: false
    },
    {
      id: 'Gererproduit',
      title: 'Produit',
      type: 'item',
      url: '/Produit',
      icon: icons.IconPackage,
      breadcrumbs: false
    },
    {
      id: 'Order',
      title: 'Order',
      type: 'item',
      url: '/Order',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
