import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FinancialTip } from '../types';

function isFinancialTip(value: unknown): value is FinancialTip {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.quote === 'string' && typeof record.author === 'string';
}

export const fetchFinancialTips = createAsyncThunk<FinancialTip[], void, { rejectValue: string }>(
  'financialTips/fetchTips',
  async (_, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_API_NINJAS_KEY;
      if (!apiKey) {
        return rejectWithValue('missing-key');
      }

      const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=money', {
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch financial tips');
      }

      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(isFinancialTip)) {
        return rejectWithValue('Unexpected quotes response');
      }
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch financial tips';
      return rejectWithValue(message);
    }
  },
);

interface FinancialTipsState {
  tips: FinancialTip[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FinancialTipsState = {
  tips: [],
  status: 'idle',
  error: null,
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
        state.error = action.payload ?? action.error.message ?? 'Failed to load financial tips';
      });
  },
});

export default financialTipsSlice.reducer;
