import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAjaxLoaderVisible: false,
};
export const AjaxLoaderSlice = createSlice({
  name: 'ajaxLoader',
  initialState,
  reducers: {
    toggleAjaxLoader: (state) => {
      state.isAjaxLoaderVisible = !state.isAjaxLoaderVisible;
    },
  },
});

export const { toggleAjaxLoader } = AjaxLoaderSlice.actions;

export default AjaxLoaderSlice.reducer
