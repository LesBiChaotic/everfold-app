import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Register Everfold PWA Service Worker in production/supporting browsers
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        console.log('Everfold PWA Service Worker registered:', reg.scope);
      })
      .catch((err) => {
        console.warn('Everfold PWA Service Worker registration failed:', err);
      });
  });
}

