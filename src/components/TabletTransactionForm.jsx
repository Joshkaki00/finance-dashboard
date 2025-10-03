import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../store/transactionsSlice';

const TabletTransactionForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'expense'
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.amount || !formData.category || !formData.date) {
      alert('Please fill all required fields');
      return;
    }
    
    // Process amount (ensure it's a positive number)
    const amount = parseFloat(formData.amount);
    
    dispatch(addTransaction({
      ...formData,
      amount
    }));
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setFormData({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      type: 'expense'
    });
  };

  const quickAmounts = [
    { value: 10, label: '$10' },
    { value: 25, label: '$25' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
    { value: 250, label: '$250' },
    { value: 500, label: '$500' }
  ];

  const categoryIcons = {
    groceries: '🛒',
    utilities: '💡',
    entertainment: '🎬',
    income: '💰',
    other: '📦'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center shadow-sm">
          <div className="bg-green-500 rounded-full p-2 mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-green-800 font-semibold text-lg">Transaction Added Successfully!</h4>
            <p className="text-green-700">Your transaction has been recorded and will appear in your dashboard.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Transaction Type Selection */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Transaction Type</h3>
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'expense'})}
              className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                formData.type === 'expense'
                  ? 'border-red-500 bg-red-50 text-red-700 shadow-lg transform scale-105'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  formData.type === 'expense' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                </div>
                <span className="text-xl font-semibold">Expense</span>
                <span className="text-sm opacity-75 mt-1">Money going out</span>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'income'})}
              className={`p-8 rounded-2xl border-2 transition-all duration-200 ${
                formData.type === 'income'
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-lg transform scale-105'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  formData.type === 'income' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <span className="text-xl font-semibold">Income</span>
                <span className="text-sm opacity-75 mt-1">Money coming in</span>
              </div>
            </button>
          </div>
        </div>

        {/* Amount and Quick Selection */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Amount</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Amount Input */}
            <div>
              <label htmlFor="tablet-amount" className="block text-sm font-medium text-gray-700 mb-3">Enter Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl font-semibold">$</span>
                <input
                  id="tablet-amount"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className="w-full pl-12 pr-6 py-4 text-2xl border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            
            {/* Quick Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Quick Select</label>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map(amount => (
                  <button
                    key={amount.value}
                    type="button"
                    onClick={() => setFormData({...formData, amount: amount.value.toString()})}
                    className={`py-3 px-4 text-lg font-semibold rounded-xl transition-all ${
                      formData.amount === amount.value.toString()
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Selection */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Category</h3>
            <div className="grid grid-cols-1 gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFormData({...formData, category})}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.category === category
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{categoryIcons[category] || '📦'}</span>
                    <span className="text-lg font-medium capitalize">{category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Description */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Details</h3>
            
            <div>
              <label htmlFor="tablet-date" className="block text-sm font-medium text-gray-700 mb-3">Date</label>
              <input
                id="tablet-date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full py-4 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                required
              />
            </div>
            
            <div>
              <label htmlFor="tablet-description" className="block text-sm font-medium text-gray-700 mb-3">Description (Optional)</label>
              <textarea
                id="tablet-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full py-4 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
                placeholder="What was this transaction for?"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <button
            type="submit"
            disabled={!formData.amount || !formData.category}
            className={`w-full py-6 px-8 rounded-2xl font-semibold text-xl transition-all duration-200 ${
              formData.amount && formData.category
                ? formData.type === 'income'
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {formData.amount && formData.category ? (
              <>
                Add {formData.type === 'income' ? 'Income' : 'Expense'} of ${formData.amount}
              </>
            ) : (
              'Please fill required fields'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TabletTransactionForm;
