import React from 'react';
import ReactDOM from 'react-dom';
import './input.css';
import { GlobalStyles }  from './styles/global';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
