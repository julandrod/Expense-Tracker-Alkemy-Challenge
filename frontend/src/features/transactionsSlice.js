import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTransactions = createAsyncThunk(
  "transactions/getAll",
  async ({ token, type }, { rejectWithValue }) => {
    let url = "/api/v1/transactions";

    if (type) {
      url = url + `?type=${type}`;
    }

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const getSingleTransaction = createAsyncThunk(
  "transactions/getSingleTransaction",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async ({ transactionInfo, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/transactions/",
        transactionInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteSingleTransaction = createAsyncThunk(
  "transactions/deleteSingleTransaction",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateSingleTransaction = createAsyncThunk(
  "transactions/updateSingleTransaction",
  async ({ token, id, transactionInfo }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/v1/transactions/${id}`,
        transactionInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  transactions: {},
  totalExpenses: 0,
  totalIncome: 0,
  balance: 0,
  quantity: 0,
  singleTransaction: {},
  transactionLoading: false,
  transactionError: false,
  transactionErrorInfo: "",
  transactionMessage: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: {
    // Get all transactions
    [getAllTransactions.pending]: (state) => {
      state.transactionLoading = true;
      state.transactionError = false;
      state.transactionErrorInfo = "";
      state.transactionMessage = "";
    },
    [getAllTransactions.fulfilled]: (state, action) => {
      state.transactionLoading = false;
      state.transactions = action.payload.transactions;
      state.quantity = action.payload.quantity;
      state.totalExpenses = action.payload.totalExpenses;
      state.totalIncome = action.payload.totalIncome;
      state.balance = action.payload.balance;
    },
    [getAllTransactions.rejected]: (state, action) => {
      state.transactionLoading = false;
      state.transactionError = true;
      state.transactionErrorInfo = action.payload;
    },
    // Get single transaction
    [getSingleTransaction.pending]: (state) => {
      state.transactionLoading = true;
      state.transactionError = false;
      state.transactionErrorInfo = "";
      state.transactionMessage = "";
    },
    [getSingleTransaction.fulfilled]: (state, action) => {
      state.transactionLoading = false;
      state.singleTransaction = action.payload;
    },
    [getSingleTransaction.rejected]: (state, action) => {
      state.transactionLoading = false;
      state.transactionError = true;
      state.transactionErrorInfo = action.payload;
    },
    // Create single transaction
    [createTransaction.pending]: (state) => {
      state.transactionLoading = true;
      state.transactionError = false;
      state.transactionErrorInfo = "";
      state.transactionMessage = "";
    },
    [createTransaction.fulfilled]: (state, action) => {
      state.transactionLoading = false;
      state.transactionMessage = action.payload.msg;
      state.singleTransaction = action.payload.result;
    },
    [createTransaction.rejected]: (state, action) => {
      state.transactionLoading = false;
      state.transactionError = true;
      state.transactionMessage = "";
      state.transactionErrorInfo = action.payload;
    },
    // Delete single transaction
    [deleteSingleTransaction.pending]: (state) => {
      state.transactionLoading = true;
      state.transactionError = false;
      state.transactionErrorInfo = "";
    },
    [deleteSingleTransaction.fulfilled]: (state, action) => {
      state.transactionLoading = false;
      state.transactionMessage = action.payload.msg;
    },
    [deleteSingleTransaction.rejected]: (state, action) => {
      state.transactionLoading = false;
      state.transactionError = true;
      state.transactionErrorInfo = action.payload;
    },
    // Update single transaction
    [updateSingleTransaction.pending]: (state) => {
      state.transactionLoading = true;
      state.transactionError = false;
      state.transactionErrorInfo = "";
      state.transactionMessage = "";
    },
    [updateSingleTransaction.fulfilled]: (state, action) => {
      state.transactionLoading = false;
      state.transactionMessage = action.payload.msg;
    },
    [updateSingleTransaction.rejected]: (state, action) => {
      state.transactionLoading = false;
      state.transactionError = true;
      state.transactionErrorInfo = action.payload;
    },
  },
});

export const selectTransactionsState = (state) => state.transactions;

export default transactionsSlice.reducer;
