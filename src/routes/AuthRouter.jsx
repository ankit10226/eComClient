import Auth from '../pages/Auth/Auth';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import { Suspense } from 'react';
import Loading from '../components/UI/Loading/Loading';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AuthRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Auth />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      path:'*',
      element: (
        <ProtectedRoutes /> 
      ),
    }
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AuthRouter;
