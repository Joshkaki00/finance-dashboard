import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'

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

// Hide loading spinner once React has mounted
setTimeout(() => {
  document.body.classList.add('app-loaded');
}, 100);