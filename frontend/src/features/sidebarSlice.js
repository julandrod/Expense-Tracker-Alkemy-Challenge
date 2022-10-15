import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarOpen: (state) => {
      state.isSidebarOpen = true;
    },
    sidebarClose: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { sidebarOpen, sidebarClose } = sidebarSlice.actions;

export const selectSidebarState = (state) => state.sidebar;

export default sidebarSlice.reducer;
