import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productAPI = process.env.REACT_APP_PRODUCT_API_URL


  export const deleteProduct = createAsyncThunk(
    "dashboardProductSlice/deleteProduct",
    async (productId, { rejectWithValue }) => {
      try {
        const result = await axios.delete(`${productAPI}/delete/${productId}`)
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

  const AdminProductDeleteSlice = createSlice({
      name : "deleteProduct",
      initialState : initialState,
      reducers : {
         setDeleteProductMessage : (state,action) => {
           state.successMessage = ""
         },
      },
      extraReducers : (builder) => {
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMessage = action.payload.message
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload || action.error.message;
        })
      }
  });
  export const { setDeleteProductMessage} = AdminProductDeleteSlice.actions;
  export default AdminProductDeleteSlice.reducer