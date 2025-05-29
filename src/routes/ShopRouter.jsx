import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "../components/UI/Loading/Loading";
import NotFound from "../pages/NotFound/NotFound";
import ShopDashboard from "../pages/Shop/Dashboard/ShopDashboard";
import Dashboard from "../components/Shop/Dashboard/Dashboard";
import Products from "../components/Shop/Products/Products";
import Profile from "../components/Shop/Profile/Profile"; 
import Orders from "../components/Shop/Profile/Order/Orders";
import Address from "../components/Shop/Profile/Address/Address";

const ShopRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/shop/",
      element: <ShopDashboard />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <Products /> }, 
        { path: "profile/",
          element: <Profile />,
          children: [
            {index:true,element:<Orders />},
            {path:"orders",element:<Orders />},
            {path:"address",element:<Address />}
          ] 
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default ShopRouter;
