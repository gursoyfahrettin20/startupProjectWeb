import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import "./locales/i18nConfiguration"
import './index.scss'
import router from './router'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <RouterProvider router={router} />
)
