import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SignUp from "./pages/SignUp"
import TopBar from "./components/header/TopBar"
import './index.scss'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <TopBar/> */}
    <SignUp />
  </StrictMode>,
)
