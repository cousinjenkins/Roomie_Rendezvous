import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'


const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("No element with ID 'root' found!");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
