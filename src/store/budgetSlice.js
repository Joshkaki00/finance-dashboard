import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  income: 3000.00,
  groceries: 400.00,
  utilities: 200.00,
  entertainment: 150.00,
  other: 250.00
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