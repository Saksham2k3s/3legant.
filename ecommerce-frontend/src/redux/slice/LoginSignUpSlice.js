import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register: true,
  showPassword: false,
  loading: false,
  error: null,
  validationError: null,
};

const loginSignUpSlice = createSlice({
  name: "loginSignUp",
  initialState,
  reducers: {
    toggleRegister: (state) => {
      state.register = !state.register;
    },
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setValidationError: (state, action) => {
      state.validationError = action.payload;
    },
  },
});

export const {
  toggleRegister,
  setShowPassword,
  setLoading,
  setError,
  setValidationError,
} = loginSignUpSlice.actions;
export default loginSignUpSlice.reducer;
