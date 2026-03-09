import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import { queryClient } from './services/queryClient';
import ThemeProviderWrapper from './components/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProviderWrapper>
            <App />
          </ThemeProviderWrapper>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);