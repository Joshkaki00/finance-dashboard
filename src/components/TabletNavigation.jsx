import React, { useState, Suspense, lazy } from 'react';
import TabletTransactionForm from './TabletTransactionForm';
import TransactionList from './TransactionList';
import BudgetForm from './BudgetForm';

// Lazy load heavy components
const TabletDashboard = lazy(() => import('./TabletDashboard'));
const FinancialTips = lazy(() => import('./FinancialTips'));

// Loading skeleton for tablet components
const TabletComponentSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-48 bg-gray-200 rounded"></div>
      <div className="h-48 bg-gray-200 rounded"></div>
    </div>
    <div className="h-64 bg-gray-200 rounded"></div>
  </div>
);

const TabletNavigation = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      component: (
        <Suspense fallback={<TabletComponentSkeleton />}>
          <TabletDashboard />
        </Suspense>
      ),
      description: 'Financial overview and insights'
    },
    {
      id: 'transactions',
      name: 'Transactions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      component: <TransactionList />,
      description: 'View and manage all transactions'
    },
    {
      id: 'add',
      name: 'Add Transaction',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      component: <TabletTransactionForm />,
      description: 'Add new income or expense'
    },
    {
      id: 'budget',
      name: 'Budget',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      component: <BudgetForm />,
      description: 'Set and manage monthly budgets'
    },
    {
      id: 'tips',
      name: 'Financial Tips',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      component: (
        <Suspense fallback={<TabletComponentSkeleton />}>
          <FinancialTips />
        </Suspense>
      ),
      description: 'Get financial wisdom and advice'
    }
  ];

  const currentView = navigationItems.find(item => item.id === activeView);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Skip to content link */}
      <a 
        href="#tablet-main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Sidebar Navigation */}
      <aside className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col" aria-label="Main navigation">
        {/* Header */}
        <header className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800" id="tablet-app-title">Finance Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your personal finances</p>
        </header>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2" aria-labelledby="tablet-app-title">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 min-h-[44px] ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 focus:bg-gray-50 focus:text-gray-800'
              }`}
              aria-current={activeView === item.id ? 'page' : undefined}
              aria-label={`Navigate to ${item.name}: ${item.description}`}
              type="button"
            >
              <div className={`mr-4 ${activeView === item.id ? 'text-blue-600' : 'text-gray-400'}`} aria-hidden="true">
                {item.icon}
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-base">{item.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
              </div>
              {activeView === item.id && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <div className="font-semibold text-sm">Tablet Optimized</div>
                <div className="text-xs opacity-90">Enhanced for touch</div>
              </div>
            </div>
          </div>
        </footer>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800" id="tablet-page-title">{currentView?.name}</h2>
              <p className="text-sm text-gray-600">{currentView?.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main 
          id="tablet-main-content"
          className="flex-1 overflow-y-auto p-8"
          role="main"
          aria-labelledby="tablet-page-title"
        >
          {currentView?.component}
        </main>
      </div>
    </div>
  );
};

export default TabletNavigation;
