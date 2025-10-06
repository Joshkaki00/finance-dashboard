import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import BudgetForm from './components/BudgetForm';
import FinancialTips from './components/FinancialTips';
import MobileNavigation from './components/MobileNavigation';
import TabletNavigation from './components/TabletNavigation';
import AccessibilityAssistant from './components/AccessibilityAssistant';

function App() {
  return (
    <Provider store={store}>
      {/* Skip to content link for keyboard navigation - WCAG 2.4.1 */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Mobile Navigation (< 768px) */}
      <div className="md:hidden">
        <MobileNavigation />
      </div>

      {/* Tablet Navigation (768px - 1279px) */}
      <div className="hidden md:block xl:hidden">
        <TabletNavigation />
      </div>

      {/* Desktop Layout (≥ 1280px) */}
      <div className="hidden xl:block min-h-screen bg-gray-100 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
          <header>
            <h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 px-2"
              id="main-heading"
            >
              Personal Finance Dashboard
            </h1>
          </header>
          
          {/* Desktop responsive grid */}
          <main id="main-content" role="main" aria-labelledby="main-heading">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              {/* Forms and Tips Section */}
              <section 
                className="xl:col-span-1 space-y-4 sm:space-y-6"
                aria-label="Financial tools and tips"
              >
                <TransactionForm />
                <BudgetForm />
                <FinancialTips />
              </section>
              
              {/* Dashboard and Transactions Section */}
              <section 
                className="xl:col-span-2 space-y-4 sm:space-y-6"
                aria-label="Financial overview and transaction history"
              >
                <Dashboard />
                <TransactionList />
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Accessibility Assistant - Available on all layouts */}
      <AccessibilityAssistant />
    </Provider>
  );
}

export default App;