import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, toggleShoppingCartModal, updateCartQty } from "../../../redux/slices/CartSlice";
import Button from "../../UI/Button/Button";
import { Trash2 } from "lucide-react";
import { showModal } from "../../../redux/slices/ModalSlice";

const ShoppingCartDetail = () => {
  const dispatch = useDispatch();
  const { totalAmount,cartItems } = useSelector((state)=>state.cart);  

  const handleQtyClick = (type,id) =>{  
    const item = cartItems.find((item) => item._id === id);

    if (type === "add" && item.cartQty === item.quantity) {
      dispatch(showModal({ type: "alert", message: "Cannot add item more than stock." }));
      return;
    } 
    dispatch(updateCartQty({ id, type }));
  }
   
  return (
    <>
      <div>
      {
        cartItems.map((value)=>( 
          <div className="flex justify-between mx-4 my-2 text-gray-900" key={value._id}>
            <div className="left flex">
                <div className="h-20 w-16 overflow-hidden rounded-md flex justify-center items-center cursor-pointer">
                <img
                  src={value.image}
                  alt={`${value.title} image`} 
                  className="w-full h-auto transition-transform duration-300 ease-linear hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-around items-start ml-2">
                <p className="text-sm font-semibold">{value.title}</p> 
                <div>
                  <Button className="border border-gray-200" onClick={()=>handleQtyClick('minus',value._id)}>-</Button>
                  <span className="text-md font-semibold mx-2">{value.cartQty}</span>
                  <Button className="border border-gray-200" onClick={()=>handleQtyClick('add',value._id)}>+</Button>
                </div>
              </div>
            </div>
            <div className="right flex flex-col justify-around items-end">
              <p className="text-sm font-semibold">&#8377;{value.price * value.cartQty}</p>
              <Button>
                <Trash2 size={20} onClick={() => dispatch(deleteCartItem({id:value._id}))}/>
              </Button>
            </div>
        </div>
        ))
      }
      </div>
      <hr className="mt-4 mb-2 text-gray-300" />
      <div className="flex justify-between mx-6 mb-4">
        <p className="text-sm font-semibold">Total</p> 
        <p className="text-sm font-semibold">&#8377;{totalAmount}</p> 
      </div>
      <div className="flex justify-end ">
        <Button
          type="button"
          className="bg-red-400 text-white mr-2"
          onClick={() => dispatch(toggleShoppingCartModal())}
        >
          Close
        </Button>
        <Button type="button" className="bg-gray-800 text-white">
          Checkout
        </Button>
      </div>
    </>
  );
};

export default ShoppingCartDetail;
