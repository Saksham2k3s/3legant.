import { configureStore } from "@reduxjs/toolkit";
import adminProductDeleteReducer from './slice/Dashboard/DeleteProduct'
import adminProductReducer from './slice/Dashboard/ProductSlice';
import cartReducer from './slice/CartSlice';
import LoginSignUpSlice from "./slice/LoginSignUpSlice";
import productDetailReducer from './slice/ProductDetailSlice'
import productReducer from './slice/ProductSlice';
import userAuthReducer from "./slice/AuthSlice";
import wishlistReducer from "./slice/WishlistSlice"
export const store = configureStore({
  reducer: {
    adminProduct : adminProductReducer,
    cart : cartReducer,
    deleteProduct : adminProductDeleteReducer,
    loginSignUp: LoginSignUpSlice,
    productDetail : productDetailReducer,
    products : productReducer,
    userAuth: userAuthReducer,
    wishlist: wishlistReducer
  },
});
