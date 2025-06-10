import React from 'react';
import ReactDOM from 'react-dom/client';
import '@link/admin/styles/index.css';
import '@link/admin/i18n';
import App from '@link/admin/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
