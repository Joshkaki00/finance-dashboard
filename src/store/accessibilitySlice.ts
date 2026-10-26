import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AccessibilityPreferences } from '../types';

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  textSize: '1.1',
  reducedMotion: false,
  enhancedFocus: false,
  keyboardHelper: false,
};

function isPreferences(value: unknown): value is AccessibilityPreferences {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.highContrast === 'boolean'
    && typeof record.textSize === 'string'
    && typeof record.reducedMotion === 'boolean'
    && typeof record.enhancedFocus === 'boolean'
    && typeof record.keyboardHelper === 'boolean'
  );
}

const loadAccessibilityPreferences = (): AccessibilityPreferences => {
  try {
    const saved = localStorage.getItem('accessibilityPreferences');
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (isPreferences(parsed)) return parsed;
    }
  } catch (error) {
    console.warn('Failed to load accessibility preferences:', error);
  }

  return defaultPreferences;
};

const saveAccessibilityPreferences = (state: AccessibilityPreferences) => {
  try {
    localStorage.setItem('accessibilityPreferences', JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save accessibility preferences:', error);
  }
};

const initialState = loadAccessibilityPreferences();

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    setHighContrast: (state, action: PayloadAction<boolean>) => {
      state.highContrast = action.payload;
      saveAccessibilityPreferences(state);
    },
    setTextSize: (state, action: PayloadAction<string>) => {
      state.textSize = action.payload;
      saveAccessibilityPreferences(state);
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
      saveAccessibilityPreferences(state);
    },
    setEnhancedFocus: (state, action: PayloadAction<boolean>) => {
      state.enhancedFocus = action.payload;
      saveAccessibilityPreferences(state);
    },
    setKeyboardHelper: (state, action: PayloadAction<boolean>) => {
      state.keyboardHelper = action.payload;
      saveAccessibilityPreferences(state);
    },
    resetAccessibilityPreferences: (state) => {
      Object.assign(state, defaultPreferences);
      saveAccessibilityPreferences(state);
    },
  },
});

export const {
  setHighContrast,
  setTextSize,
  setReducedMotion,
  setEnhancedFocus,
  setKeyboardHelper,
  resetAccessibilityPreferences,
} = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
