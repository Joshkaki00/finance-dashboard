import { createSlice } from '@reduxjs/toolkit';

// Load accessibility preferences from localStorage
const loadAccessibilityPreferences = () => {
  try {
    const saved = localStorage.getItem('accessibilityPreferences');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load accessibility preferences:', error);
  }
  
  // Default preferences
  return {
    highContrast: false,
    textSize: '1.1', // Normal size
    reducedMotion: false,
    enhancedFocus: false,
    keyboardHelper: false
  };
};

// Save accessibility preferences to localStorage
const saveAccessibilityPreferences = (state) => {
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
    setHighContrast: (state, action) => {
      state.highContrast = action.payload;
      saveAccessibilityPreferences(state);
    },
    setTextSize: (state, action) => {
      state.textSize = action.payload;
      saveAccessibilityPreferences(state);
    },
    setReducedMotion: (state, action) => {
      state.reducedMotion = action.payload;
      saveAccessibilityPreferences(state);
    },
    setEnhancedFocus: (state, action) => {
      state.enhancedFocus = action.payload;
      saveAccessibilityPreferences(state);
    },
    setKeyboardHelper: (state, action) => {
      state.keyboardHelper = action.payload;
      saveAccessibilityPreferences(state);
    },
    resetAccessibilityPreferences: (state) => {
      const defaults = {
        highContrast: false,
        textSize: '1.1',
        reducedMotion: false,
        enhancedFocus: false,
        keyboardHelper: false
      };
      Object.assign(state, defaults);
      saveAccessibilityPreferences(state);
    }
  }
});

export const {
  setHighContrast,
  setTextSize,
  setReducedMotion,
  setEnhancedFocus,
  setKeyboardHelper,
  resetAccessibilityPreferences
} = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
