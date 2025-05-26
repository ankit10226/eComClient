import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';
import { Suspense } from 'react';
import Loading from '../components/UI/Loading/Loading';
import NotFound from '../pages/NotFound/NotFound';
import Dashboard from '../components/Admin/Dashboard/Dashboard';
import Products from '../components/Admin/Products/Products';

const AdminRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/admin/',
      element: <AdminDashboard />,
      children:[
        {index:true,element:<Dashboard />},
        {path:'dashboard',element:<Dashboard />},
        {path:'products',element:<Products />},
      ]
    },
    {
      path:'*',
      element:<NotFound />
    }
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default AdminRouter;
