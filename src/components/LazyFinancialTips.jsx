import React, { Suspense, lazy } from 'react';

// Lazy load the FinancialTips component to reduce initial bundle size
const FinancialTips = lazy(() => import('./FinancialTips'));

// Loading component for better perceived performance
const FinancialTipsSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  </div>
);

const LazyFinancialTips = () => {
  return (
    <Suspense fallback={<FinancialTipsSkeleton />}>
      <FinancialTips />
    </Suspense>
  );
};

export default LazyFinancialTips;
