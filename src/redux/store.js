import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/AuthSlice";
import modalReducer from "./slices/ModalSlice";
import sidebarReducer from "./slices//SidebarSlice"
import productReducer from "./slices/ProductSlice"
import addressReducer from "./slices/AddressSlice"
import orderReducer from "./slices/OrderSlice"
import dashboardReducer from "./slices/DashboardSlice"
import ajaxLoaderReducer from "./slices/AjaxLoaderSlice"
import cartReducer from "./slices/CartSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    modal:modalReducer,
    sidebar:sidebarReducer,
    product:productReducer,
    address:addressReducer,
    order:orderReducer,
    dashboard:dashboardReducer,
    ajaxLoader:ajaxLoaderReducer,
    cart:cartReducer
  },
})