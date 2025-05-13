import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  income: 0.00,
  groceries: 0.00,
  utilities: 0.00,
  entertainment: 0.00,
  other: 0.00
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    updateBudget: (state, action) => {
      const { category, amount } = action.payload;
      state[category] = parseFloat(amount);
    }
  }
});

export const { updateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;