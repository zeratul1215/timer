import React from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from '@link/admin/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
