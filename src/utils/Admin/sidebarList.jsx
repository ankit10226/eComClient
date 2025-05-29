import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';

const sidebarList = [
  {
    id: 'Dashboard',
    name: 'Dashboard',
    logo: <LayoutDashboard />,
    navigate: '/admin/dashboard',
  },
  {
    id: 'Products',
    name: 'Products',
    logo: <Package />,
    navigate: '/admin/products',
  },
  {
    id: 'Orders',
    name: 'Orders',
    logo: <ShoppingCart />,
    navigate: '/admin/orders',
  },
];

export default sidebarList;
