import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'
import { measurePerformance, preloadCriticalResources, registerServiceWorker } from './utils/performance'

// Add app loaded class to hide loading spinner
const root = ReactDOM.createRoot(document.getElementById('root'));

// Show loading spinner initially
document.body.classList.remove('app-loaded');

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Initialize performance monitoring
measurePerformance();
preloadCriticalResources();

// Hide loading spinner once React has mounted
setTimeout(() => {
  document.body.classList.add('app-loaded');
}, 100);

// Register service worker for caching
registerServiceWorker();