import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ClanApp from "./components/ClanApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><ClanApp /></Suspense>,
  },
  {
    path: "/finder",
    element: <Suspense fallback={<div>Loading...</div>}><ClanApp /></Suspense>,
  },
  {
    path: "/checker",
    element: <Suspense fallback={<div>Loading...</div>}><ClanApp /></Suspense>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
