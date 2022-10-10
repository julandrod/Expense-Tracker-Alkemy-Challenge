import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setupUser = createAsyncThunk(
  "auth/setupUser",
  async ({ dataUser, endpoint }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/${endpoint}`, dataUser);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  userLoading: false,
  userError: false,
  errorInfo: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    // Login / Register user
    [setupUser.pending]: (state) => {
      state.userLoading = true;
    },
    [setupUser.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.userInfo = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);
    },
    [setupUser.rejected]: (state, action) => {
      state.userLoading = false;
      state.userError = true;
      state.errorInfo = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
