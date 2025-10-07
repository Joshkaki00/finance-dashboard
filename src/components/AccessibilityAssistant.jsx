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
        className="fixed bottom-4 right-4 z-50 bg-indigo-700 hover:bg-indigo-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-4 border-2 border-white hover:scale-110 active:scale-95"
        aria-label="Open accessibility settings and assistance options for visual, motor, and cognitive disabilities"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        title="Accessibility & Disability Support Options - Click to open settings for visual impairments, dyslexia, color blindness, and more"
        style={{
          minWidth: '56px',
          minHeight: '56px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {/* Universal Accessibility Icon - Person with arms spread in a circle */}
        <svg 
          className="w-7 h-7" 
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
          className="fixed bottom-20 right-4 z-40 bg-white dark:bg-gray-900 border-4 border-indigo-600 dark:border-yellow-400 rounded-xl shadow-2xl p-6 w-96 max-w-[calc(100vw-2rem)]"
          role="dialog"
          aria-labelledby="accessibility-title"
          aria-modal="true"
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif', // Dyslexia-friendly font
            lineHeight: '1.6',
            letterSpacing: '0.02em'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 
                id="accessibility-title"
                className="text-xl font-bold text-gray-900 dark:text-white mb-1"
                style={{ fontWeight: '700' }}
              >
                🛠️ Accessibility Support
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Settings for visual, motor, and cognitive disabilities
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white p-2 rounded-lg border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-indigo-500 transition-all"
              aria-label="Close accessibility support panel"
              style={{ minWidth: '40px', minHeight: '40px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Options */}
          <div className="space-y-6">
            {/* High Contrast */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label="High contrast icon">🔲</span>
                  <label 
                    htmlFor="high-contrast-toggle"
                    className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    High Contrast Mode
                  </label>
                </div>
                <button
                  id="high-contrast-toggle"
                  type="button"
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 border-2 ${
                    accessibility.highContrast 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.highContrast}
                  aria-describedby="high-contrast-description"
                  style={{ minWidth: '56px', minHeight: '32px' }}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      accessibility.highContrast ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.highContrast ? 'Disable' : 'Enable'} high contrast mode
                  </span>
                </button>
              </div>
              <p id="high-contrast-description" className="text-sm text-gray-700 dark:text-gray-300 ml-11">
                <strong>For:</strong> Low vision, color blindness, light sensitivity<br/>
                <strong>Effect:</strong> Increases color contrast and makes text more visible
              </p>
            </div>

            {/* Text Size */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl" role="img" aria-label="Text size icon">📝</span>
                <label className="text-base font-semibold text-gray-900 dark:text-white">
                  Text Size
                </label>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 ml-11">
                <strong>For:</strong> Low vision, dyslexia, reading difficulties<br/>
                <strong>Effect:</strong> Makes all text larger and easier to read
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '1', label: 'Small', icon: '🔤', description: '100%' },
                  { value: '1.1', label: 'Normal', icon: '🔠', description: '110%' },
                  { value: '1.25', label: 'Large', icon: '🔡', description: '125%' },
                  { value: '1.5', label: 'Extra Large', icon: '🔢', description: '150%' }
                ].map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => handleTextSizeChange(size.value)}
                    className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400 hover:scale-105 ${
                      accessibility.textSize === size.value
                        ? 'bg-green-600 text-white border-green-700 shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    aria-pressed={accessibility.textSize === size.value}
                    style={{ minHeight: '60px' }}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-lg" role="img" aria-hidden="true">{size.icon}</span>
                      <span className="font-semibold">{size.label}</span>
                      <span className="text-xs opacity-75">{size.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label="Reduced motion icon">🐌</span>
                  <label 
                    htmlFor="reduced-motion-toggle"
                    className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Reduce Motion
                  </label>
                </div>
                <button
                  id="reduced-motion-toggle"
                  type="button"
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 border-2 ${
                    accessibility.reducedMotion 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.reducedMotion}
                  aria-describedby="reduced-motion-description"
                  style={{ minWidth: '56px', minHeight: '32px' }}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      accessibility.reducedMotion ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.reducedMotion ? 'Disable' : 'Enable'} reduced motion
                  </span>
                </button>
              </div>
              <p id="reduced-motion-description" className="text-sm text-gray-700 dark:text-gray-300 ml-11">
                <strong>For:</strong> Vestibular disorders, motion sensitivity, ADHD<br/>
                <strong>Effect:</strong> Minimizes animations and moving elements
              </p>
            </div>

            {/* Enhanced Focus */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label="Enhanced focus icon">🎯</span>
                  <label 
                    htmlFor="enhanced-focus-toggle"
                    className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Enhanced Focus
                  </label>
                </div>
                <button
                  id="enhanced-focus-toggle"
                  type="button"
                  onClick={toggleEnhancedFocus}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 border-2 ${
                    accessibility.enhancedFocus 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.enhancedFocus}
                  aria-describedby="enhanced-focus-description"
                  style={{ minWidth: '56px', minHeight: '32px' }}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      accessibility.enhancedFocus ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.enhancedFocus ? 'Disable' : 'Enable'} enhanced focus indicators
                  </span>
                </button>
              </div>
              <p id="enhanced-focus-description" className="text-sm text-gray-700 dark:text-gray-300 ml-11">
                <strong>For:</strong> Low vision, keyboard navigation, motor impairments<br/>
                <strong>Effect:</strong> Makes focus indicators larger and more visible
              </p>
            </div>

            {/* Keyboard Helper */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label="Keyboard helper icon">⌨️</span>
                  <label 
                    htmlFor="keyboard-helper-toggle"
                    className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Keyboard Navigation Helper
                  </label>
                </div>
                <button
                  id="keyboard-helper-toggle"
                  type="button"
                  onClick={toggleKeyboardHelper}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 border-2 ${
                    accessibility.keyboardHelper 
                      ? 'bg-green-600 border-green-700' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={accessibility.keyboardHelper}
                  aria-describedby="keyboard-helper-description"
                  style={{ minWidth: '56px', minHeight: '32px' }}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      accessibility.keyboardHelper ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                  <span className="sr-only">
                    {accessibility.keyboardHelper ? 'Disable' : 'Enable'} keyboard navigation helper
                  </span>
                </button>
              </div>
              <p id="keyboard-helper-description" className="text-sm text-gray-700 dark:text-gray-300 ml-11">
                <strong>For:</strong> Motor impairments, screen reader users, keyboard-only navigation<br/>
                <strong>Effect:</strong> Shows keyboard shortcuts and navigation hints
              </p>
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          {accessibility.keyboardHelper && (
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border-2 border-indigo-200 dark:border-indigo-700">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl" role="img" aria-label="Keyboard shortcuts">⌨️</span>
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
                  Keyboard Shortcuts Guide
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { key: 'Tab', description: 'Navigate forward through elements', icon: '➡️' },
                  { key: 'Shift+Tab', description: 'Navigate backward through elements', icon: '⬅️' },
                  { key: 'Enter/Space', description: 'Activate buttons and links', icon: '✅' },
                  { key: 'Esc', description: 'Close dialogs and menus', icon: '❌' },
                  { key: 'Arrow keys', description: 'Navigate lists and menus', icon: '🔄' }
                ].map((shortcut, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-600">
                    <span className="text-lg" role="img" aria-hidden="true">{shortcut.icon}</span>
                    <kbd className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-md border-2 border-indigo-700 shadow-sm min-w-[80px] text-center">
                      {shortcut.key}
                    </kbd>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium flex-1">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-600">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                  💡 <strong>Tip:</strong> Use these shortcuts to navigate without a mouse. Focus indicators will show your current position.
                </p>
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
