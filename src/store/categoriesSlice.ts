import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = ['income', 'groceries', 'utilities', 'entertainment', 'other'];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => state.filter((category) => category !== action.payload),
    hydrateCategories: (_state, action: PayloadAction<string[]>) => action.payload,
  },
});

export const { addCategory, removeCategory, hydrateCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
