import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const getInitialCartItems = () => {
  const localData = localStorage.getItem("cartItems");
  return localData ? JSON.parse(localData) : [];
};

const initialState = {
  showShoppingCartModal: false,
  cartItems: getInitialCartItems(),
  totalAmount : 0
}; 

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleShoppingCartModal:(state)=>{
      state.showShoppingCartModal = !state.showShoppingCartModal
    },
    setCartItem: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalAmount : (state,action) => {  
      const {type,value} = action.payload;
      if(type === 'empty'){
        state.totalAmount = parseFloat(value);
      }else{
        state.totalAmount += parseFloat(value);
      }
    }, 
    updateCartQty: (state, action) => {
      const { id, type } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id == id);

      if (itemIndex !== -1) {
        if (type === "add") {
          state.cartItems[itemIndex].cartQty += 1;
          state.totalAmount += parseFloat(state.cartItems[itemIndex].price);
        } else if (type === "minus") {
          if (state.cartItems[itemIndex].cartQty > 1) {
            state.cartItems[itemIndex].cartQty -= 1;
            state.totalAmount -= parseFloat(state.cartItems[itemIndex].price);
          } else { 
            const isConfirm = confirm('Are you sure? Item will be removed from cart.');
            if(isConfirm){
              state.totalAmount -= parseFloat(state.cartItems[itemIndex].price);
              state.cartItems.splice(itemIndex, 1);
            }
          }
        } 
      }
    },
    deleteCartItem : (state,action) => {
      const {id} = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id == id);
      if (itemIndex !== -1) {
        const isConfirm = confirm('Are you sure? Item will be removed from cart.'); 
        if(isConfirm){ 
          let deductAmount = (state.cartItems[itemIndex].price) * (state.cartItems[itemIndex].cartQty);
          state.totalAmount -= deductAmount;
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },

  },
});

export const { setCartItem,updateCartQty,deleteCartItem,toggleShoppingCartModal,setTotalAmount } = cartSlice.actions

export default cartSlice.reducer
