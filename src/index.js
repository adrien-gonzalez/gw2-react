import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render( // Utilisez createRoot
  // Problem strictMode with react dnd
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

reportWebVitals();
