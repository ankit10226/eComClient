import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, toggleAddressModal } from "../../../../redux/slices/AddressSlice";
import { toggleAjaxLoader } from "../../../../redux/slices/AjaxLoaderSlice";
import { showModal } from "../../../../redux/slices/ModalSlice";
import Button from "../../../UI/Button/Button";
import api from "../../../../utils/api/api";

const AddressDetail = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.address);
  const { user } = useSelector((state)=>state.auth);  

  const handleEditForm = (e) => {
    const addressId = e.target.id;
    dispatch(toggleAddressModal({ type: "editModal", id: addressId }));
  };

  const handleDeleteProduct = async (e) => {
    const addressId = e.target.id;
    const res = confirm("Are you sure you want to delete this address?");
    if (res) {
      dispatch(toggleAjaxLoader());
      try {
        const response = await api.delete(`/shop/delete/address/${addressId}`);
        if (response.status === 200) {
          dispatch(
            showModal({ type: "success", message: response.data?.message })
          );
          dispatch(fetchAddress(user.userId));
        }
      } catch (error) {
        dispatch(
          showModal({
            type: "error",
            message: error.response?.data?.message || error.message,
          })
        );
      } finally {
        dispatch(toggleAjaxLoader());
      }
    }
  };

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchAddress(user.userId));
    }
  }, [dispatch, user?.userId]);

  if (address.length === 0) {
    return (
      <div className="text-center font-semibold text-cyan-800 my-2 text-lg">
        No Address Found!
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
      {address.map((value) => (
        <div className="border border-gray-300 rounded-md p-2 cursor-pointer hover:border-gray-400 text-cyan-900 flex flex-col h-full" key={value.id}>
            <div className="flex gap-4">
            <ul>
                <li><b>Address</b></li>
                <li><b>State</b></li>
                <li><b>Pincode</b></li>
                <li><b>Phone</b></li>
                <li><b>Note</b></li>
            </ul>
            <ul>
                {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>:</li>
                ))}
            </ul>
            <ul>
                <li>{value.address}</li>
                <li>{value.state}</li>
                <li>{value.pincode}</li>
                <li>{value.phone}</li>
                <li>{value.note}</li>
            </ul>
            </div>
            <div className="flex justify-start items-center p-2 border-t border-teal-200 mt-auto">
                <Button type="button" className="bg-teal-500 text-white mx-2" id={value.id} onClick={handleEditForm}>Edit</Button>
                <Button type="button" className="bg-red-400 text-white" id={value.id} onClick={handleDeleteProduct}>Delete</Button>
            </div>
        </div>
      ))} 
    </div>
  );
};

export default AddressDetail;
