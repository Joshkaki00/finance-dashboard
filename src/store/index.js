import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import budgetReducer from './budgetSlice';
import categoriesReducer from './categoriesSlice';
import financialTipsReducer from './financialTipsSlice';
import accessibilityReducer from './accessibilitySlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    categories: categoriesReducer,
    financialTips: financialTipsReducer,
    accessibility: accessibilityReducer,
  },
});