import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFinancialTips } from '../store/financialTipsSlice';

const FinancialTips = () => {
  const dispatch = useDispatch();
  const { tips, status, error } = useSelector((state) => state.financialTips);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFinancialTips());
    }
  }, [status, dispatch]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Wisdom</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600">Loading financial tips...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Wisdom</h2>
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">
            <span className="font-bold">Error:</span> {error || 'Failed to load financial tips.'}
          </p>
          <button 
            onClick={() => dispatch(fetchFinancialTips())}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (status === 'succeeded' && (!tips || tips.length === 0)) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Wisdom</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No financial tips available at the moment.</p>
          <button 
            onClick={() => dispatch(fetchFinancialTips())}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Success state with data
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Financial Wisdom</h2>
      
      {tips.map((tip, index) => (
        <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
          <p className="text-gray-700 italic">"{tip.quote}"</p>
          <p className="text-gray-600 text-sm mt-2">— {tip.author}</p>
        </div>
      ))}
      
      <button 
        onClick={() => dispatch(fetchFinancialTips())}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded text-sm"
      >
        Get New Tips
      </button>
    </div>
  );
};

export default FinancialTips; 