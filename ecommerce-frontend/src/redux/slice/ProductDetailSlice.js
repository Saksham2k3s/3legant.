import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk(
  "productSlice/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    console.log("this is product id", productId);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_PRODUCT_API_URL}/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("this is details of product", result.data);
      return result.data;
    } catch (error) {
      console.log("Inside error block");
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
  productDetail: {},
};

const productDetailSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload.message
      state.productDetail = action.payload.products;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload || action.error.message;
    });
  },
});

export default productDetailSlice.reducer