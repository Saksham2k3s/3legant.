import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCacheKey } from "../../helpers/product";

const REACT_APP_PRODUCT_API_URL = process.env.REACT_APP_PRODUCT_API_URL;

// Helper function to construct query parameters string
const buildQueryParams = (params) => {
  const queryParams = new URLSearchParams();

  // Only append parameters if they have values
  if (params.page) queryParams.append('page', params.page);
  if (params.query) queryParams.append('keyword', params.query);
  if (params.category) queryParams.append('category', params.category);

  return queryParams.toString();
};

export const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async ({page = 1, query = '', category = ''}, { getState, rejectWithValue }) => {
    const state = getState().products;
    const cacheKey = getCacheKey(page, query, category);

    // Check if data is already in cache
    if (cacheKey in state.cache) {
      return state.cache[cacheKey];
    }

    console.log("huuu");
    try {
      // Build the query parameters string
      const queryParams = buildQueryParams({ page, query, category });

      const result = await axios.get(
        `${REACT_APP_PRODUCT_API_URL}/all?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return {...result.data, cacheKey};
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);



const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    isLoading: false,
    isError: false,
    products: [],
    errorMessage: '',
    totalProducts : 0,
    resultPerPage : 0,
    page : 1,
    cache: {}
  },
  reducers: {
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    decrementPage: (state) => {
      if (state.page > 1) state.page = state.page - 1; // Ensure page doesn't go below 1
    },
    setPage : (state,action) => {
      state.page = action.payload
    },
    removeProduct : (state, action) => {
      const productId = action.payload;
      const filterProducts = state.products.filter((item) => item._id !== productId);
      state.products = filterProducts;
  }
  
   },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalProducts = action.payload.totalProducts;
      state.resultPerPage = action.payload.resultPerPage;
      state.products = action.payload.products || [];

      // Store response in cache
      const cacheKey = action.payload.cacheKey;
      state.cache[cacheKey] = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
  }
});

export const { incrementPage, decrementPage, setPage, removeProduct } = productSlice.actions;

export default productSlice.reducer;
