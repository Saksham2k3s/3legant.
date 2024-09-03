import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addIntoCart = createAsyncThunk(
  "addIntoCart",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_CART_API_URL}/${id}`);
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

export const getUserCart = createAsyncThunk(
  "getUserCart",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_CART_API_URL}`);
      const userCart = result.data;
      const filterCart = userCart?.cart?.filter(cart => cart !== null);
      return filterCart;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeProduct = createAsyncThunk(
  "removeProduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_CART_API_URL}/${id}`
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

const cartSlice = createSlice({
  name: "productSlice",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    cart: [],
  },
  reducers: {
    setSuccessMessage: (state) => {
      state.successMessage = "";
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product._id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product._id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addIntoCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addIntoCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(addIntoCart.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
    builder.addCase(getUserCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.successMessage = action.payload.message;
    });
    builder.addCase(getUserCart.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
  },
});

export const { setSuccessMessage, incrementQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
