import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  exampleUser: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push({
        id: Date.now(),
        ...action.payload
      });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        transaction => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    hydrateTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setExampleUser: (state, action) => {
      state.exampleUser = action.payload;
    }
  }
});

export const { addTransaction, deleteTransaction, updateTransaction, hydrateTransactions, setExampleUser } = transactionsSlice.actions;
export default transactionsSlice.reducer;