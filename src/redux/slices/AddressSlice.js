import { createSlice } from "@reduxjs/toolkit";
import { toggleAjaxLoader } from "./AjaxLoaderSlice";
import api from "../../utils/api/api";
import { showModal } from "./ModalSlice"; 

const initialState = {
  isAddressModalVisible: false,
  modalType:null,
  editModalId:null,
  address:[]
};

export const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    toggleAddressModal: (state,action) => {
      state.isAddressModalVisible = !state.isAddressModalVisible;
      const {type,id} = action.payload || {};
      state.modalType = type || null;
      state.editModalId = id || null;
    },
    setAddress: (state,action) =>{
      state.address = action.payload
    }
  },
});

export const { toggleAddressModal,setAddress } = AddressSlice.actions;

export const fetchAddress = (userId) => async (dispatch) => {  
  try { 
    dispatch(toggleAjaxLoader());
    const response = await api.get(`/shop/fetch/address/${userId}`); 
    dispatch(setAddress(response.data.address));  
  } catch (error) {
    dispatch(showModal({ type: "error", message: error.response?.data?.message || error.message }));
  }finally{
    dispatch(toggleAjaxLoader());
  }
};

export default AddressSlice.reducer