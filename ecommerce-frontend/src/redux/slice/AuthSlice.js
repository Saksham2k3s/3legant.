import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_USER_API_URL = process.env.REACT_APP_USER_API_URL
axios.defaults.withCredentials = true;
// Action => Login API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${REACT_APP_USER_API_URL}/login`,
        body,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
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

// Action => Sign Up API
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${REACT_APP_USER_API_URL}/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
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



const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    user: null,
    token: null,
    successMessage : ''
  },
  reducers: {
    setLogout : (state, action) => {
       state.user = {};
       state.token = '';
    },
    setErrorMessage : (state) => {
      state.errorMessage = ''
    },
    setSuccessMessage : (state) => {
      state.successMessage = ''
    },
    setUser : (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isError = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload || action.error.message;
      })
      // Sign Up User
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload || action.error.message;
      })
  },
});

export const { setLogout, setErrorMessage, setSuccessMessage, setUser } = authSlice.actions;
export default authSlice.reducer;
