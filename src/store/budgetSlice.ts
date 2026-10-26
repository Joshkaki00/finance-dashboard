import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BudgetMap } from '../types';

const initialState: BudgetMap = {
  income: 0,
  groceries: 0,
  utilities: 0,
  entertainment: 0,
  other: 0,
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    updateBudget: (state, action: PayloadAction<{ category: string; amount: number }>) => {
      const { category, amount } = action.payload;
      state[category] = amount;
    },
    hydrateBudget: (_state, action: PayloadAction<BudgetMap>) => action.payload,
  },
});

export const { updateBudget, hydrateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
