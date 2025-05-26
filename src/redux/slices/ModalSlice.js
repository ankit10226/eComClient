import { createSlice } from "@reduxjs/toolkit";

const initialState={
  isVisible:false,
  type:'',
  message:''
}
export const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers:{
    showModal:(state,action)=>{
      state.isVisible=true;
      state.type=action.payload.type;
      state.message=action.payload.message;
    },
    hideModal:(state)=>{
      state.isVisible=false;
      state.type='';
      state.message='';
    }
  }
});

export const { showModal,hideModal } = modalSlice.actions

export default modalSlice.reducer