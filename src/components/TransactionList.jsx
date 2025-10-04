import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../store/transactionsSlice';

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.transactions);
  const [filter, setFilter] = useState('all'); // 'all', 'income', 'expense'

  // Filter transactions based on type
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Handle transaction deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Transactions</h2>
        <div className="text-center py-8 sm:py-10 text-gray-500">
          <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="mt-2 text-base sm:text-lg font-medium">No transactions yet</p>
          <p className="mt-1 text-sm sm:text-base">Add a transaction to get started!</p>
        </div>
      </div>
    );
  }

  // Empty state after filtering
  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Transactions</h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({transactions.length})
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Income ({transactions.filter(t => t.type === 'income').length})
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Expenses ({transactions.filter(t => t.type === 'expense').length})
          </button>
        </div>
        
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <p className="text-sm sm:text-base">No {filter} transactions found.</p>
          <button 
            onClick={() => setFilter('all')}
            className="mt-2 text-sm underline text-blue-500 hover:text-blue-700 transition-colors"
          >
            View all transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md" aria-labelledby="transactions-heading">
      <h2 id="transactions-heading" className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Transactions</h2>
      
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Transaction filters">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          role="tab"
          aria-selected={filter === 'all'}
          aria-controls="transactions-content"
          id="filter-all"
        >
          All ({transactions.length})
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filter === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          role="tab"
          aria-selected={filter === 'income'}
          aria-controls="transactions-content"
          id="filter-income"
        >
          Income ({transactions.filter(t => t.type === 'income').length})
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            filter === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          role="tab"
          aria-selected={filter === 'expense'}
          aria-controls="transactions-content"
          id="filter-expense"
        >
          Expenses ({transactions.filter(t => t.type === 'expense').length})
        </button>
      </div>
      
      {/* Mobile Card Layout */}
      <div 
        className="block sm:hidden space-y-3"
        id="transactions-content"
        role="tabpanel"
        aria-labelledby={`filter-${filter}`}
      >
        {filteredTransactions.map((transaction) => (
          <article 
            key={transaction.id} 
            className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            aria-labelledby={`transaction-${transaction.id}-title`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                  <time className="text-xs text-gray-500" dateTime={transaction.date}>
                    {formatDate(transaction.date)}
                  </time>
                </div>
                <h3 
                  id={`transaction-${transaction.id}-title`}
                  className="font-medium text-gray-900 text-sm"
                >
                  {transaction.description || 'No description'}
                </h3>
                <p className="text-xs text-gray-500 capitalize mt-1">
                  {transaction.category}
                </p>
              </div>
              <div className="text-right ml-3">
                <p className={`text-lg font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span aria-label={transaction.type === 'income' ? 'Income' : 'Expense'}>
                    {transaction.type === 'income' ? '+' : '−'}
                  </span> {formatCurrency(transaction.amount)}
                </p>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-xs text-red-600 hover:text-red-800 mt-1 underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                  aria-label={`Delete transaction: ${transaction.description || transaction.category} ${formatCurrency(transaction.amount)}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div 
        className="hidden sm:block overflow-x-auto"
        id="transactions-content"
        role="tabpanel"
        aria-labelledby={`filter-${filter}`}
      >
        <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Transaction history">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <time dateTime={transaction.date}>{formatDate(transaction.date)}</time>
                </td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {transaction.description || '—'}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {transaction.category}
                </td>
                <td className={`px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span aria-label={transaction.type === 'income' ? 'Income' : 'Expense'}>
                    {transaction.type === 'income' ? '+' : '−'}
                  </span> {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-red-600 hover:text-red-900 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1"
                    aria-label={`Delete transaction: ${transaction.description || transaction.category} ${formatCurrency(transaction.amount)}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionList;