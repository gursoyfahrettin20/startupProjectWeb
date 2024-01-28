import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import TopBar from "./components/header/TopBar"
import "./locales/i18nConfiguration"
import './index.scss'
import router from './router'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <TopBar />
    <RouterProvider router={router} />
  </StrictMode>,
)
