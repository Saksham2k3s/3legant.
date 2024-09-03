import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productAPI = process.env.REACT_APP_PRODUCT_API_URL

export const addProduct = createAsyncThunk(
    "addProduct",
    async (productData, { rejectWithValue }) => {
      try {
        const result = await axios.post(`${productAPI}/new`, productData)
        return result.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );


  const initialState = {
    isLoading : false,
    isError : false,
    errorMessage : '',
    successMessage : '',
    product : {}
  }

  const AdminProductSlice = createSlice({
      name : "productSlice",
      initialState : initialState,
      reducers : {
      
      },
      extraReducers : (builder) => {
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload.product;
            state.successMessage = action.payload.message
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload || action.error.message;
        })
      }
  });
  export default AdminProductSlice.reducer