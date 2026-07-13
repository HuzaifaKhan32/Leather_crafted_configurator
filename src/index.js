import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ./App likhne se woh App.jsx ko automatic utha lega

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);