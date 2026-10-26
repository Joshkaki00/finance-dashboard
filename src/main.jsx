import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'
import { measurePerformance, preloadCriticalResources, registerServiceWorker } from './utils/performance'
import { loadFinance, startSaving } from './db/client'
import { hydrateTransactions, setExampleUser } from './store/transactionsSlice'
import { hydrateBudget } from './store/budgetSlice'
import { hydrateCategories } from './store/categoriesSlice'

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.classList.remove('app-loaded');

function renderApp() {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  document.body.classList.add('app-loaded');
  measurePerformance();
  preloadCriticalResources();
  registerServiceWorker();
}

loadFinance()
  .then((data) => {
    store.dispatch(hydrateTransactions(data.transactions));
    store.dispatch(setExampleUser(data.exampleUser));
    store.dispatch(hydrateBudget(data.budget));
    store.dispatch(hydrateCategories(data.categories));
    startSaving();
  })
  .catch((error) => {
    console.error('Finance database failed to open. Changes in this visit will not be saved.', error);
  })
  .finally(renderApp);