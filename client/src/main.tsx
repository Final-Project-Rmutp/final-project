import React from 'react';
import { createRoot } from 'react-dom/client';
import './input.scss';
import { GlobalStyles } from './styles/global';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  );
}
