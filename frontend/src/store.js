import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import transactionsReducer from "./features/transactionsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});
