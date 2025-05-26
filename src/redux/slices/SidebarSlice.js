import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible : false
};
export const SidbarSlice = createSlice({
  name:'sidebar',
  initialState,
  reducers:{
    toggleSidebar:(state)=>{
      state.isVisible = !state.isVisible;
    }
  }
});

export const { toggleSidebar } = SidbarSlice.actions;

export default SidbarSlice.reducer