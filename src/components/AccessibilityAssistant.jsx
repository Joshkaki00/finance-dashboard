import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setHighContrast, 
  setTextSize, 
  setReducedMotion, 
  setEnhancedFocus,
  setKeyboardHelper 
} from '../store/accessibilitySlice';

const AccessibilityAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const accessibility = useSelector(state => state.accessibility);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast mode
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Text size scaling
    root.style.setProperty('--text-scale', accessibility.textSize);

    // Reduced motion
    if (accessibility.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Enhanced focus
    if (accessibility.enhancedFocus) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // Keyboard helper
    if (accessibility.keyboardHelper) {
      root.classList.add('keyboard-helper');
    } else {
      root.classList.remove('keyboard-helper');
    }
  }, [accessibility]);

  // Keyboard navigation for the panel
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const toggleHighContrast = () => {
    dispatch(setHighContrast(!accessibility.highContrast));
  };

  const handleTextSizeChange = (size) => {
    dispatch(setTextSize(size));
  };

  const toggleReducedMotion = () => {
    dispatch(setReducedMotion(!accessibility.reducedMotion));
  };

  const toggleEnhancedFocus = () => {
    dispatch(setEnhancedFocus(!accessibility.enhancedFocus));
  };

  const toggleKeyboardHelper = () => {
    dispatch(setKeyboardHelper(!accessibility.keyboardHelper));
  };

  return (
    <>
      {/* Accessibility Button - Fixed Position */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-indigo-700 hover:bg-indigo-800 text-white p-3 rounded-full shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 border-2 border-white hover:scale-105 active:scale-95"
        aria-label="Open accessibility settings for visual, motor, and cognitive disabilities"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        title="Accessibility Support - Visual impairments, dyslexia, color blindness, motor disabilities"
        style={{
          minWidth: '48px',
          minHeight: '48px'
        }}
      >
        {/* Universal Accessibility Icon - Person with arms spread in a circle */}
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-label="Universal accessibility symbol"
        >
          {/* Head */}
          <circle cx="12" cy="5" r="2" />
          {/* Body and arms spread wide (universal accessibility symbol) */}
          <path d="M12 8c-1.5 0-3 .5-4 1.5L6.5 11l1.5 1.5L9.5 11c.5-.5 1.5-1 2.5-1s2 .5 2.5 1l1.5 1.5L17.5 11l-1.5-1.5C15 8.5 13.5 8 12 8z"/>
          {/* Legs */}
          <path d="M10 13v7h1.5v-7h1v7H14v-7c0-.5-.5-1-1-1h-2c-.5 0-1 .5-1 1z"/>
          {/* Outer circle representing inclusion */}
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
        </svg>
        
        {/* Text label for screen readers and dyslexic users */}
        <span className="sr-only">
          Accessibility Support - Visual disabilities, dyslexia, color blindness, motor impairments
        </span>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          id="accessibility-panel"
          className="fixed bottom-20 right-4 z-40 bg-white dark:bg-gray-900 border-2 border-indigo-600 dark:border-yellow-400 rounded-lg shadow-xl p-4 w-80 max-w-[calc(100vw-2rem)]"
          role="dialog"
          aria-labelledby="accessibility-title"
          aria-modal="true"
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif', // Dyslexia-friendly font
            lineHeight: '1.5',
            letterSpacing: '0.01em'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 
                id="accessibility-title"
                className="text-lg font-bold text-gray-900 dark:text-white mb-1"
              >
                🛠️ Accessibility
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Visual & motor support
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              aria-label="Close accessibility panel"
              style={{ minWidth: '32px', minHeight: '32px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {/* High Contrast */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg" role="img" aria-label="High contrast icon">🔲</span>
                  <label 
                    htmlFor="high-contrast-toggle"
                    className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    High Contrast
                  </label>
                </div>
                <button
                  id="high-contrast-toggle"
                  type="button"
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 border ${
                    accessibility.highContrast 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.highContrast}
                  aria-describedby="high-contrast-description"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow ${
                      accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.highContrast ? 'Disable' : 'Enable'} high contrast mode
                  </span>
                </button>
              </div>
              <p id="high-contrast-description" className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-7">
                Better visibility for low vision & color blindness
              </p>
            </div>

            {/* Text Size */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg" role="img" aria-label="Text size icon">📝</span>
                <label className="text-sm font-semibold text-gray-900 dark:text-white">
                  Text Size
                </label>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: '1', label: 'S', description: '100%' },
                  { value: '1.1', label: 'M', description: '110%' },
                  { value: '1.25', label: 'L', description: '125%' },
                  { value: '1.5', label: 'XL', description: '150%' }
                ].map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => handleTextSizeChange(size.value)}
                    className={`p-2 text-xs rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      accessibility.textSize === size.value
                        ? 'bg-green-600 text-white border-green-700'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    aria-pressed={accessibility.textSize === size.value}
                    title={`${size.description} text size`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-bold">{size.label}</span>
                      <span className="text-xs opacity-75">{size.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg" role="img" aria-label="Reduced motion icon">🐌</span>
                  <label 
                    htmlFor="reduced-motion-toggle"
                    className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Reduce Motion
                  </label>
                </div>
                <button
                  id="reduced-motion-toggle"
                  type="button"
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 border ${
                    accessibility.reducedMotion 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.reducedMotion}
                  aria-describedby="reduced-motion-description"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow ${
                      accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.reducedMotion ? 'Disable' : 'Enable'} reduced motion
                  </span>
                </button>
              </div>
              <p id="reduced-motion-description" className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-7">
                Minimizes animations for motion sensitivity
              </p>
            </div>

            {/* Enhanced Focus */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg" role="img" aria-label="Enhanced focus icon">🎯</span>
                  <label 
                    htmlFor="enhanced-focus-toggle"
                    className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Enhanced Focus
                  </label>
                </div>
                <button
                  id="enhanced-focus-toggle"
                  type="button"
                  onClick={toggleEnhancedFocus}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 border ${
                    accessibility.enhancedFocus 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.enhancedFocus}
                  aria-describedby="enhanced-focus-description"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow ${
                      accessibility.enhancedFocus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.enhancedFocus ? 'Disable' : 'Enable'} enhanced focus indicators
                  </span>
                </button>
              </div>
              <p id="enhanced-focus-description" className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-7">
                Larger focus indicators for better visibility
              </p>
            </div>

            {/* Keyboard Helper */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg" role="img" aria-label="Keyboard helper icon">⌨️</span>
                  <label 
                    htmlFor="keyboard-helper-toggle"
                    className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Keyboard Helper
                  </label>
                </div>
                <button
                  id="keyboard-helper-toggle"
                  type="button"
                  onClick={toggleKeyboardHelper}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 border ${
                    accessibility.keyboardHelper 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.keyboardHelper}
                  aria-describedby="keyboard-helper-description"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow ${
                      accessibility.keyboardHelper ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.keyboardHelper ? 'Disable' : 'Enable'} keyboard navigation helper
                  </span>
                </button>
              </div>
              <p id="keyboard-helper-description" className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-7">
                Shows keyboard shortcuts and navigation hints
              </p>
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          {accessibility.keyboardHelper && (
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg" role="img" aria-label="Keyboard shortcuts">⌨️</span>
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  Keyboard Shortcuts
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { key: 'Tab', description: 'Navigate forward', icon: '➡️' },
                  { key: 'Shift+Tab', description: 'Navigate backward', icon: '⬅️' },
                  { key: 'Enter/Space', description: 'Activate buttons', icon: '✅' },
                  { key: 'Esc', description: 'Close dialogs', icon: '❌' }
                ].map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center space-x-2 text-xs">
                    <span className="text-sm" role="img" aria-hidden="true">{shortcut.icon}</span>
                    <kbd className="px-2 py-1 bg-indigo-600 text-white font-bold rounded text-xs min-w-[60px] text-center">
                      {shortcut.key}
                    </kbd>
                    <span className="text-gray-700 dark:text-gray-300 flex-1">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-25"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AccessibilityAssistant;
