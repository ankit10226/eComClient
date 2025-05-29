import { createSlice } from "@reduxjs/toolkit";
import { toggleAjaxLoader } from "./AjaxLoaderSlice";
import api from "../../utils/api/api";
import { showModal } from "./ModalSlice"; 

const initialState = {
  isOrderDetailModalVisible: false, 
  order:[],
  orderDetail:[]
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    toggleOrderDetailModal: (state,action) => {
      state.isOrderDetailModalVisible = !state.isOrderDetailModalVisible; 
    },
    setOrder: (state,action) =>{
      state.order = action.payload
    },
    setOrderDetail: (state,action) =>{
      state.orderDetail = action.payload
    }
  },
});

export const { toggleOrderDetailModal,setOrder,setOrderDetail } = OrderSlice.actions;

export const fetchOrder = (userId) => async (dispatch) => {  
  try { 
    dispatch(toggleAjaxLoader());
    const response = await api.get(`/shop/fetch/order/${userId}`); 
    dispatch(setOrder(response.data.order));  
  } catch (error) {
    dispatch(showModal({ type: "error", message: error.response?.data?.message || error.message }));
  }finally{
    dispatch(toggleAjaxLoader());
  }
};

export const fetchOrderDetail = (orderId) => async (dispatch) => {  
  try { 
    dispatch(toggleAjaxLoader());
    const response = await api.get(`/shop/fetch/orderDetail/${orderId}`); 
    dispatch(toggleOrderDetailModal());
    dispatch(setOrderDetail(response.data.orderDetail));  
  } catch (error) {
    dispatch(showModal({ type: "error", message: error.response?.data?.message || error.message }));
  }finally{
    dispatch(toggleAjaxLoader());
  }
};

export default OrderSlice.reducer