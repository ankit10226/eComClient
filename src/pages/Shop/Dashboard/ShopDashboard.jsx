import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Outlet, useNavigate } from 'react-router-dom'; 
import Header from '../../../components/Shop/Common/Header';
import Sidebar from '../../../components/Shop/Common/Sidebar';
import ShoppingCart from '../../../components/Shop/ShoppingCart/ShoppingCart';

const ShopDashboard = () => { 
  const { cartItems } = useSelector((state)=>state.cart);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])
  return (
    <>
      <ShoppingCart />
      <Sidebar />
      <Header />
      <Outlet />      
    </>
  );
};

export default ShopDashboard;
