import { ShoppingCart } from "lucide-react";
import React from "react";
import Button from "../../UI/Button/Button"; 
import { useDispatch, useSelector } from "react-redux";
import { toggleShoppingCartModal } from "../../../redux/slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart); 
 
  return (
    <Button
      type="button"
      className="bg-red-400 text-white px-4 py-2 flex justify-between items-center"
      onClick={ ()=>dispatch(toggleShoppingCartModal()) }
    >
      <ShoppingCart />
      <span className="ml-4 px-2 bg-white rounded-lg text-teal-800">{cartItems.length}</span>
    </Button>
  );
};

export default Cart;
