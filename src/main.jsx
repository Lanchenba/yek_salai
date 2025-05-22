import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ClanApp from "./components/ClanApp";

const App = lazy(() => import('./App.jsx'));
const ClanFinder = lazy(() => import('./components/ClanFinder'));
const ClanChecker = lazy(() => import('./components/ClanChecker'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><ClanApp /></Suspense>,
  },
  {
    path: "/finder",
    element: <Suspense fallback={<div>Loading...</div>}><ClanFinder /></Suspense>,
  },
  {
    path: "/checker",
    element: <Suspense fallback={<div>Loading...</div>}><ClanChecker /></Suspense>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
