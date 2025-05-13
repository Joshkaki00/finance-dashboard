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
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Personal Finance Dashboard
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <TransactionForm />
              <BudgetForm />
              <FinancialTips />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
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