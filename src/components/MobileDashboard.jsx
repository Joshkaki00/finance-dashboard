import React from 'react';
import { useSelector } from 'react-redux';

const MobileDashboard = () => {
  const transactions = useSelector(state => state.transactions.transactions);
  
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Calculate spending by category for quick stats
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

  // Get top spending category
  const topCategory = Object.entries(expensesByCategory)
    .sort(([,a], [,b]) => b - a)[0];

  // Recent transactions (last 3)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <div className={`rounded-xl p-6 text-white ${balance >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
        <div className="text-center">
          <p className="text-sm opacity-90">Current Balance</p>
          <p className="text-3xl font-bold mt-1">{formatCurrency(balance)}</p>
        </div>
      </div>

      {/* Income & Expenses */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-blue-700">Income</p>
              <p className="text-lg font-bold text-blue-800">{formatCurrency(totalIncome)}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-red-500 rounded-full p-2 mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-red-700">Expenses</p>
              <p className="text-lg font-bold text-red-800">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Transactions</span>
            <span className="font-medium">{transactions.length}</span>
          </div>
          {topCategory && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Spending</span>
              <div className="text-right">
                <div className="font-medium capitalize text-sm">{topCategory[0]}</div>
                <div className="text-xs text-gray-500">{formatCurrency(topCategory[1])}</div>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avg. Transaction</span>
            <span className="font-medium">
              {transactions.length > 0 ? formatCurrency((totalIncome + totalExpenses) / transactions.length) : '$0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <svg className={`w-4 h-4 ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={transaction.type === 'income' ? "M7 11l5-5m0 0l5 5m-5-5v12" : "M17 13l-5 5m0 0l-5-5m5 5V6"} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {transaction.category}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Your Dashboard</h3>
          <p className="text-gray-500 text-sm mb-4">Start by adding your first transaction to see your financial overview.</p>
        </div>
      )}
    </div>
  );
};

export default MobileDashboard;
