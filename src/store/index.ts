import { configureStore, type Middleware, type UnknownAction } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import budgetReducer from './budgetSlice';
import categoriesReducer from './categoriesSlice';
import financialTipsReducer from './financialTipsSlice';
import accessibilityReducer from './accessibilitySlice';
import { saveChange } from '../db/client';
import type { Transaction, TransactionsState } from '../types';

interface FinanceState {
  transactions: TransactionsState;
}

function isAction(value: unknown): value is UnknownAction & { payload?: unknown } {
  return typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'string';
}

function isTransaction(value: unknown): value is Transaction {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === 'number' && typeof record.amount === 'number';
}

const financePersistMiddleware: Middleware<object, FinanceState> = (storeApi) => (next) => (action) => {
  const result = next(action);

  if (!isAction(action)) return result;

  switch (action.type) {
    case 'transactions/addTransaction': {
      const transactions = storeApi.getState().transactions.transactions;
      const latest = transactions[transactions.length - 1];
      if (latest) saveChange('addTransaction', latest);
      break;
    }
    case 'transactions/deleteTransaction':
      if (typeof action.payload === 'number') saveChange('deleteTransaction', action.payload);
      break;
    case 'transactions/updateTransaction':
      if (isTransaction(action.payload)) saveChange('updateTransaction', action.payload);
      break;
    case 'budget/updateBudget': {
      const payload = action.payload;
      if (
        typeof payload === 'object'
        && payload !== null
        && 'category' in payload
        && 'amount' in payload
        && typeof payload.category === 'string'
        && typeof payload.amount === 'number'
      ) {
        saveChange('updateBudget', { category: payload.category, amount: payload.amount });
      }
      break;
    }
    case 'categories/addCategory':
      if (typeof action.payload === 'string') saveChange('addCategory', action.payload);
      break;
    case 'categories/removeCategory':
      if (typeof action.payload === 'string') saveChange('removeCategory', action.payload);
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
