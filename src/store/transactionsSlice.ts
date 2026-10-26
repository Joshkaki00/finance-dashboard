import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction, TransactionInput, TransactionsState } from '../types';

const initialState: TransactionsState = {
  transactions: [],
  exampleUser: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionInput>) => {
      state.transactions.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    hydrateTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setExampleUser: (state, action: PayloadAction<string | null>) => {
      state.exampleUser = action.payload;
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  hydrateTransactions,
  setExampleUser,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
