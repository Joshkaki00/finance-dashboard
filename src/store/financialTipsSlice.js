import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk action to fetch financial tips from the API
export const fetchFinancialTips = createAsyncThunk(
  'financialTips/fetchTips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=money', {
        headers: {
          'X-Api-Key': 'YOUR_API_NINJAS_KEY' // In a real app, store this in .env file
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch financial tips');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tips: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const financialTipsSlice = createSlice({
  name: 'financialTips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialTips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFinancialTips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tips = action.payload;
        state.error = null;
      })
      .addCase(fetchFinancialTips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default financialTipsSlice.reducer; 