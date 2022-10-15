import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import transactionsReducer from "./features/transactionsSlice";
import sidebarReducer from "./features/sidebarSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    sidebar: sidebarReducer,
  },
});
