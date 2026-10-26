import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import budgetReducer from './budgetSlice';
import categoriesReducer from './categoriesSlice';
import financialTipsReducer from './financialTipsSlice';
import accessibilityReducer from './accessibilitySlice';
import { saveChange } from '../db/client';

const financePersistMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case 'transactions/addTransaction': {
      const transactions = storeApi.getState().transactions.transactions;
      saveChange('addTransaction', transactions[transactions.length - 1]);
      break;
    }
    case 'transactions/deleteTransaction':
      saveChange('deleteTransaction', action.payload);
      break;
    case 'transactions/updateTransaction':
      saveChange('updateTransaction', action.payload);
      break;
    case 'budget/updateBudget':
      saveChange('updateBudget', action.payload);
      break;
    case 'categories/addCategory':
      saveChange('addCategory', action.payload);
      break;
    case 'categories/removeCategory':
      saveChange('removeCategory', action.payload);
      break;
    default:
      break;
  }

  return result;
};

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
    categories: categoriesReducer,
    financialTips: financialTipsReducer,
    accessibility: accessibilityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(financePersistMiddleware),
});