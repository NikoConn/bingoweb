import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './views/Main';
import './i18n';  // Importamos la configuración de i18next

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
