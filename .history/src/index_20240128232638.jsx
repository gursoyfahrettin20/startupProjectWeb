import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from "./pages/SignUp"
import TopBar from "./components/header/TopBar"
import "./locales/i18nConfiguration"
import './index.scss'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <TopBar />
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>



  </StrictMode>,
)
