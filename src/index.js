import React from 'react';
import ReactDOM from 'react-dom';

// NOSSOS IMPORTS
import Rotas from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>
);
