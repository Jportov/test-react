import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import ThemeProviderWrapper from './components/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);