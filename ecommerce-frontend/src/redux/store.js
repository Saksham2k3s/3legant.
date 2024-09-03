import { configureStore } from "@reduxjs/toolkit";
import LoginSignUpSlice from "./slice/LoginSignUpSlice";
import userAuthReducer from "./slice/AuthSlice";
import productReducer from './slice/ProductSlice';
import cartReducer from './slice/CartSlice';
import adminProductReducer from './slice/Dashboard/ProductSlice';
import adminProductDeleteReducer from './slice/Dashboard/DeleteProduct'
import productDetailReducer from './slice/ProductDetailSlice'
export const store = configureStore({
  reducer: {
    loginSignUp: LoginSignUpSlice,
    userAuth: userAuthReducer,
    products : productReducer,
    cart : cartReducer,
    adminProduct : adminProductReducer,
    deleteProduct : adminProductDeleteReducer,
    productDetail : productDetailReducer
  },
});
