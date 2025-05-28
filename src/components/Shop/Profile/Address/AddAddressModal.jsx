import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress,toggleAddressModal } from "../../../../redux/slices/AddressSlice";
import Button from "../../../UI/Button/Button";
import TextArea from "../../../UI/TextArea/TextArea";
import Input from "../../../UI/Input/Input";
import { toggleAjaxLoader } from "../../../../redux/slices/AjaxLoaderSlice";
import { showModal } from "../../../../redux/slices/ModalSlice";
import api from "../../../../utils/api/api";

const initialFormData = {
  address: "",
  state: "",
  pincode: "",
  phone: "",
  note: "",
};

const initialError = {
  address: false,
  state: false,
  pincode: false,
  phone: false,
  note: false,
};

const AddAddressModal = () => {
  const dispatch = useDispatch();
  const {isAddressModalVisible,modalType,editModalId,address} = useSelector((state) => state.address);
  const { user } = useSelector((state)=>state.auth);   

  const [formData,setFormData] = useState(initialFormData);
  const [error,setError] = useState(initialError);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let hasError = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key];
      const isEmpty =
        typeof value === "string" ? value.trim() === "" : value === "";
      setError((prev) => ({
        ...prev,
        [key]: isEmpty,
      }));
      return acc || isEmpty;
    }, false);
    if (hasError) return; 
    dispatch(toggleAjaxLoader());
    try {
      const payload = {
        ...formData,
        userId: user.userId,
      };   
      const endpoint =
        modalType === "editModal"
          ? `/shop/update/address/${editModalId}`
          : "/shop/upload/address";
      const method = modalType === "editModal" ? "put" : "post";
      const response = await api[method](endpoint, payload);

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
      dispatch(toggleAddressModal());
      dispatch(toggleAjaxLoader());
    }
  };

  useEffect(() => {
    if (isAddressModalVisible) {
      setFormData(initialFormData);
      setError(initialError); 
    }
    if(modalType === 'editModal' && editModalId){
      const editAddressDetails = address.find(value => value.id == editModalId); 
      if (editAddressDetails) { 
        setFormData({
          address: editAddressDetails.address || '',
          state: editAddressDetails.state || '',
          pincode: editAddressDetails.pincode || '',
          phone: editAddressDetails.phone || '',
          note: editAddressDetails.note || '',  
        });  
      }
    }
  }, [isAddressModalVisible,modalType, editModalId, address]); 

  if (!isAddressModalVisible) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-40"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white p-4 lg:w-1/4 md:w-1/2 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleFormSubmit}> 
          <Input
            type="text"
            name="address"
            id="address"
            label="Address"
            className={`${error.address ? "border-2 border-red-400" : "mb-4"}`}
            value={formData.address}
            onChange={handleInputChange}
          />
          {error.address && (
            <p className="text-red-400 font-light text-sm">{`This field is required!`}</p>
          )}
          <Input
            type="text"
            name="state"
            id="state"
            label="State"
            className={`${error.state ? "border-2 border-red-400" : "mb-4"}`}
            value={formData.state}
            onChange={handleInputChange}
          />
          {error.state && (
            <p className="text-red-400 font-light text-sm">{`This field is required!`}</p>
          )}
          <Input
            type="number"
            name="pincode"
            id="pincode"
            label="Pincode"
            className={`${error.pincode ? "border-2 border-red-400" : "mb-4"}`}
            value={formData.pincode}
            onChange={handleInputChange}
          />
          {error.pincode && (
            <p className="text-red-400 font-light text-sm">{`This field is required!`}</p>
          )}
          <Input
            type="number"
            name="phone"
            id="phone"
            label="Phone"
            className={`${error.phone ? "border-2 border-red-400" : "mb-4"}`}
            value={formData.phone}
            onChange={handleInputChange}
          />
          {error.phone && (
            <p className="text-red-400 font-light text-sm">{`This field is required!`}</p>
          )}
          <TextArea
            type="number"
            name="note"
            id="note"
            label="Note"
            className={`${
              error.note ? "border-2 border-red-400" : "mb-4"
            }`}
            value={formData.note}
            onChange={handleInputChange}
          />

          {error.note && (
            <p className="text-red-400 font-light text-sm">{`This field is required!`}</p>
          )}
          <div className="flex justify-end ">
            <Button
              type="button"
              className="bg-teal-500 text-white mr-2"
              onClick={() => dispatch(toggleAddressModal())}
            >
              Close
            </Button>
            <Button type="submit" className="bg-teal-500 text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AddAddressModal;
