import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_WISHLIST_API_URL = process.env.REACT_APP_WISHLIST_API_URL;
axios.defaults.withCredentials = true;
// Action fetch users wishlist products
export const getMyProducts = createAsyncThunk(
  "wishlist/myProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${REACT_APP_WISHLIST_API_URL}`);
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

// Action to wishlist the product
export const wishlistProduct = createAsyncThunk(
  "wishlist/addProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const result = await axios.patch(
        `${REACT_APP_WISHLIST_API_URL}/${productId}`,
        {
          withCredentials: true,
        }
      );
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

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    myProducts: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const index = state.myProducts.findIndex(
        (item) => item._id === product._id
      );

      if (index !== -1) {
        state.myProducts?.splice(index, 1);
      } else {
        state.myProducts?.push({ _id: product._id });
      }
    },
    setSuccessMessage: (state) => {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myProducts = action.payload.items;
    });
    builder.addCase(getMyProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
    builder.addCase(wishlistProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(wishlistProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(wishlistProduct.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
  },
});
export const { setSuccessMessage, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
