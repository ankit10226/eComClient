import { createSlice } from '@reduxjs/toolkit'
import api from '../../utils/api/api';

const initialState = {
  user:null, 
  isLoggedIn:false,
  isCheckingSession: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser:(state,action)=>{
      state.user = action.payload; 
      state.isLoggedIn = true; 
      state.isCheckingSession = false;
    },
    logoutUser:(state)=>{
      state.user = null; 
      state.isLoggedIn = false; 
      state.isCheckingSession = false;
    },
    setCheckingSession: (state, action) => {
      state.isCheckingSession = action.payload;
    }
  },
})
 
export const { setUser,logoutUser,setCheckingSession } = authSlice.actions

export const checkUserSession = () => async (dispatch) => {
  dispatch(setCheckingSession(true));
  try {
    const response = await api.get("/verify-user");  
    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(logoutUser());
  } finally {
    dispatch(setCheckingSession(false)); 
  }
};


export const destroyUserSession = () => async (dispatch) =>{
 try {
    await api.post("/logout");
    dispatch(logoutUser());
 } catch (error) {
  dispatch(logoutUser());
 }
};

export default authSlice.reducer
