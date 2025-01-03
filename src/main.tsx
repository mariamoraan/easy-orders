import React from 'react';
import ReactDOM from 'react-dom/client';
import './core/styles/globals.css';
import { RouterProvider } from 'react-router-dom';
import { AppRouting } from './core/routing/app-routing';
import '@/core/i18n/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRouting} />
  </React.StrictMode>,
);
