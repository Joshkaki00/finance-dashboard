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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Summary Cards */}
      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-700">Total Income</h3>
            <p className="text-2xl font-bold text-blue-800">{formatCurrency(totalIncome)}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-700">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-800">{formatCurrency(totalExpenses)}</p>
          </div>
          
          <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <h3 className={`text-sm font-medium ${balance >= 0 ? 'text-green-700' : 'text-yellow-700'}`}>
              Current Balance
            </h3>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-800' : 'text-yellow-800'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Expense Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses by Category</h2>
        
        {chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">No expense data to display.</p>
        )}
      </div>
      
      {/* Budget Tracking */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Budget Tracking</h2>
        
        {budgetComparison.length > 0 ? (
          <div className="space-y-4">
            {budgetComparison.map(item => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="capitalize">{item.category}</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      item.percentUsed > 100 ? 'bg-red-600' : 
                      item.percentUsed > 75 ? 'bg-yellow-500' : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(item.percentUsed, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">No budget data to display.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;