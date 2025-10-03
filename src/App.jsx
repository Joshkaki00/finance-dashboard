import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import BudgetForm from './components/BudgetForm';
import FinancialTips from './components/FinancialTips';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 px-2">
            Personal Finance Dashboard
          </h1>
          
          {/* Mobile-first responsive grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Forms and Tips Section */}
            <div className="xl:col-span-1 space-y-4 sm:space-y-6">
              <TransactionForm />
              <BudgetForm />
              <FinancialTips />
            </div>
            
            {/* Dashboard and Transactions Section */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              <Dashboard />
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;