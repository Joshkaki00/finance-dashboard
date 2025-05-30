import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBudget } from '../store/budgetSlice';

const BudgetForm = () => {
  const dispatch = useDispatch();
  const budget = useSelector(state => state.budget);
  const categories = useSelector(state => 
    state.categories.filter(category => category !== 'income')
  );
  
  // Create a state object with current budget values
  const [budgetValues, setBudgetValues] = useState({...budget});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetValues({
      ...budgetValues,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update each category in the budget
    Object.entries(budgetValues).forEach(([category, amount]) => {
      if (category !== 'income') {
        dispatch(updateBudget({
          category,
          amount: parseFloat(amount) || 0
        }));
      }
    });
    
    alert('Budget updated successfully!');
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Budget</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Income Budget
          </label>
          <input
            type="number"
            name="income"
            value={budgetValues.income}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Current: {formatCurrency(budget.income)}
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Expense Categories</h3>
          
          {categories.map(category => (
            <div key={category} className="mb-4">
              <label className="block text-gray-700 capitalize mb-2">
                {category} Budget
              </label>
              <input
                type="number"
                name={category}
                value={budgetValues[category] || ''}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Current: {formatCurrency(budget[category] || 0)}
              </p>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Update Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;