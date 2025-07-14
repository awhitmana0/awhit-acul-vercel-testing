import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Find the root element or create it if it doesn't exist
let rootElement = document.getElementById('root');

if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
  console.warn("Created missing '#root' element for React to render into.");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);