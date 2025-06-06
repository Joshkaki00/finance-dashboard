import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
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
    }
  }
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;