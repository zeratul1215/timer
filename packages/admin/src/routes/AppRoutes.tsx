import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useRouteError } from 'react-router';
import { BaseLayout } from '@link/admin/layouts';

const Dashboard = lazy(() => import('@link/admin/views/Dashboard'));
const Timer = lazy(() => import('@link/admin/views/Timer'));

function RootErrorBoundary() {
  const error = useRouteError() as Error;
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    location.reload();
  }
  return null;
}

const lazyView = (view: JSX.Element) => {
  return <Suspense fallback="Loading...">{view}</Suspense>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<BaseLayout />}
        errorElement={<RootErrorBoundary />}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={lazyView(<Dashboard />)} />
        <Route path="timer" element={lazyView(<Timer />)} />
        <Route path="*" element={lazyView(<Dashboard />)} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
