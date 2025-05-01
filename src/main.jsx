import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ClanFinder from './components/ClanFinder'
import ClanChecker from './components/ClanChecker'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/finder",
    element: <ClanFinder />,
  },
  {
    path: "/checker",
    element: <ClanChecker />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
