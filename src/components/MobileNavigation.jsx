import React, { useState } from 'react';
import MobileTransactionForm from './MobileTransactionForm';
import TransactionList from './TransactionList';
import BudgetForm from './BudgetForm';
import MobileDashboard from './MobileDashboard';
import FinancialTips from './FinancialTips';

const MobileNavigation = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Overview',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      component: <MobileDashboard />
    },
    {
      id: 'transactions',
      name: 'Transactions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      component: <TransactionList />
    },
    {
      id: 'add',
      name: 'Add',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      component: <MobileTransactionForm />
    },
    {
      id: 'budget',
      name: 'Budget',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      component: <BudgetForm />
    },
    {
      id: 'tips',
      name: 'Tips',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      component: <FinancialTips />
    }
  ];

  const currentView = navigationItems.find(item => item.id === activeView);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Skip to content link */}
      <a 
        href="#mobile-main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-1 rounded text-sm z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-800 text-center" id="mobile-page-title">
          {currentView?.name || 'Finance Dashboard'}
        </h1>
      </header>

      {/* Content Area */}
      <main 
        id="mobile-main-content" 
        className="flex-1 overflow-y-auto p-4 pb-20"
        role="main"
        aria-labelledby="mobile-page-title"
      >
        {currentView?.component}
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="bg-white border-t border-gray-200 px-2 py-2"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-around">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-0 flex-1 mx-1 transition-colors min-h-[44px] ${
                activeView === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:text-gray-700 focus:bg-gray-50'
              }`}
              aria-current={activeView === item.id ? 'page' : undefined}
              aria-label={`Navigate to ${item.name}`}
              type="button"
            >
              <div className="mb-1" aria-hidden="true">
                {item.icon}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
