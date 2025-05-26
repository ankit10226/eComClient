import { createSlice } from "@reduxjs/toolkit"
import { toggleAjaxLoader } from "./AjaxLoaderSlice";
import { showModal } from "./ModalSlice";
import api from "../../utils/api/api";

const initialState = {
  dashboards : []
}

export const dashboardSlice = createSlice({
  name:'dashboard',
  initialState,
  reducers:{
    setDashboard:(state,action)=>{
      state.dashboards = action.payload
    }
  }
});

export const { setDashboard } = dashboardSlice.actions;

export const fetchDashboards = () => async (dispatch) => {
  try { 
    dispatch(toggleAjaxLoader());
    const response = await api.get('/admin/fetch/dashboard'); 
    dispatch(setDashboard(response.data.dashboard));  
  } catch (error) {
    dispatch(showModal({ type: "error", message: error.response?.data?.message || error.message }));
  }finally{
    dispatch(toggleAjaxLoader());
  }
};

export default dashboardSlice.reducer