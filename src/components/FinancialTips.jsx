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
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Financial Wisdom</h2>
        <div className="flex justify-center items-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-600">Loading financial tips...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Financial Wisdom</h2>
        <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 mb-4 rounded-r-md">
          <p className="text-red-700 text-sm">
            <span className="font-bold">Error:</span> {error || 'Failed to load financial tips.'}
          </p>
          <button 
            onClick={() => dispatch(fetchFinancialTips())}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded text-xs sm:text-sm transition-colors"
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
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Financial Wisdom</h2>
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <p className="text-sm sm:text-base">No financial tips available at the moment.</p>
          <button 
            onClick={() => dispatch(fetchFinancialTips())}
            className="mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded text-xs sm:text-sm transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Success state with data
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Financial Wisdom</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {tips.map((tip) => (
          <div key={`${tip.author}-${tip.quote.slice(0, 20)}`} className="pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
            <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">"{tip.quote}"</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 font-medium">— {tip.author}</p>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => dispatch(fetchFinancialTips())}
        className="mt-3 sm:mt-4 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
      >
        Get New Tips
      </button>
    </div>
  );
};

export default FinancialTips; 