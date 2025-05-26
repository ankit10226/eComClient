import React, { useEffect } from "react";
import Button from "../../../UI/Button/Button"; 
import { useDispatch } from "react-redux";
import { toggleAddressModal } from "../../../../redux/slices/AddressSlice";
import AddAddressModal from "./AddAddressModal";
import AddressDetail from "./AddressDetail";

const Address = () => {
  const dispatch = useDispatch(); 
  
  return (
    <div className="border border-gray-300 rounded-md p-2">
      <AddAddressModal />
      <div className="h-fit">
        <div className="flex justify-between items-center p-2">  
          <Button
            className="bg-teal-900 text-white"
            onClick={() => dispatch(toggleAddressModal({ type: "addModal" }))}
          >
            Add New Address
          </Button>
        </div>
        <AddressDetail />
      </div>
    </div>
  );
};

export default Address;
