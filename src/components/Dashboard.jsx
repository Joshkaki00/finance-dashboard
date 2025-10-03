import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
  const transactions = useSelector(state => state.transactions.transactions);
  const budget = useSelector(state => state.budget);
  
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
  
  // Calculate spending by category for chart
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
  
  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];
  
  // Budget vs. Actual Comparison
  const budgetComparison = Object.entries(expensesByCategory)
    .filter(([category]) => category !== 'income')
    .map(([category, spent]) => ({
      category,
      spent,
      budget: budget[category] || 0,
      remaining: (budget[category] || 0) - spent,
      percentUsed: budget[category] ? Math.round((spent / budget[category]) * 100) : 0,
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Summary Cards */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Financial Summary</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-xs sm:text-sm font-medium text-blue-700">Total Income</h3>
            <p className="text-lg sm:text-2xl font-bold text-blue-800 break-words">{formatCurrency(totalIncome)}</p>
          </div>
          
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-xs sm:text-sm font-medium text-red-700">Total Expenses</h3>
            <p className="text-lg sm:text-2xl font-bold text-red-800 break-words">{formatCurrency(totalExpenses)}</p>
          </div>
          
          <div className={`p-3 sm:p-4 rounded-lg ${balance >= 0 ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <h3 className={`text-xs sm:text-sm font-medium ${balance >= 0 ? 'text-green-700' : 'text-yellow-700'}`}>
              Current Balance
            </h3>
            <p className={`text-lg sm:text-2xl font-bold break-words ${balance >= 0 ? 'text-green-800' : 'text-yellow-800'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Expense Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Expenses by Category</h2>
        
        {chartData.length > 0 ? (
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => window.innerWidth > 640 ? `${name} ${(percent * 100).toFixed(0)}%` : `${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[chartData.indexOf(entry) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8 sm:py-12 text-sm sm:text-base">No expense data to display.</p>
        )}
      </div>
      
      {/* Budget Tracking */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Budget Tracking</h2>
        
        {budgetComparison.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {budgetComparison.map(item => (
              <div key={item.category} className="space-y-1 sm:space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="capitalize text-sm sm:text-base font-medium">{item.category}</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-600">
                    {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                  <div 
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                      (() => {
                        if (item.percentUsed > 100) return 'bg-red-600';
                        if (item.percentUsed > 75) return 'bg-yellow-500';
                        return 'bg-green-600';
                      })()
                    }`}
                    style={{ width: `${Math.min(item.percentUsed, 100)}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {item.percentUsed}% used
                  {item.remaining > 0 && (
                    <span className="ml-2 text-green-600">
                      ({formatCurrency(item.remaining)} remaining)
                    </span>
                  )}
                  {item.remaining < 0 && (
                    <span className="ml-2 text-red-600">
                      ({formatCurrency(Math.abs(item.remaining))} over budget)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8 sm:py-12 text-sm sm:text-base">No budget data to display.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;