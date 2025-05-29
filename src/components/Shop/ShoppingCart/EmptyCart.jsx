import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleShoppingCartModal } from "../../../redux/slices/CartSlice";
import Button from "../../UI/Button/Button";

const EmptyCart = () => {
  const dispatch = useDispatch(); 
  return (
    <>
      <p className="text-center font-semibold text-teal-900 text-xl mb-4">
        Cart is empty!
      </p>
      <div className="flex justify-center">
        <Button
          type="button"
          className="bg-gray-800 text-white mr-2"
          onClick={() => dispatch(toggleShoppingCartModal())}
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default EmptyCart;
