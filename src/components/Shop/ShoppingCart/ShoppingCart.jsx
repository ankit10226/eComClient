import React from 'react'
import { createPortal } from 'react-dom';
import Button from '../../UI/Button/Button';
import { toggleShoppingCartModal } from '../../../redux/slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';
import ShoppingCartDetail from './ShoppingCartDetail';

const ShoppingCart = () => { 
  const { cartItems,showShoppingCartModal } = useSelector((state)=>state.cart);

  if (!showShoppingCartModal) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-40"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white p-4 lg:w-1/3 md:w-2/3 w-2/3 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <ShoppingCartDetail />
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ShoppingCart