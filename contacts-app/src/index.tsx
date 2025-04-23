import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { SnackbarProvider } from 'context/snackbar/SnackbarProvider';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
