import React, { Suspense, lazy } from 'react';

// Lazy load the Dashboard component to reduce initial bundle size
const Dashboard = lazy(() => import('./Dashboard'));

// Loading component for better perceived performance
const DashboardSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="mt-6 h-64 bg-gray-200 rounded"></div>
  </div>
);

const LazyDashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
};

export default LazyDashboard;
