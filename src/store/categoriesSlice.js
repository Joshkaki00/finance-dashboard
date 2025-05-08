import { createSlice } from '@reduxjs/toolkit';

const initialState = ['income', 'groceries', 'utilities', 'entertainment', 'other'];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    removeCategory: (state, action) => {
      return state.filter(category => category !== action.payload);
    }
  }
});

export const { addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;