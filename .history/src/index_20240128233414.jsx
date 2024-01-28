import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from "./pages/SignUp"
import TopBar from "./components/header/TopBar"
import "./locales/i18nConfiguration"
import './index.scss'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    Component: <div>Burası Ana sayfa olacak</div>
  }, {
    path: '/signup',
    Component: SignUp
  },
]);


root.render(
  <StrictMode>
    <TopBar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Burası Ana sayfa olacak</div>} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
