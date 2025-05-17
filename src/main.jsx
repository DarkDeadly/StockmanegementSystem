import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter,RouterProvider, } from "react-router";
import './util/global.css'
import './index.css'
import HomePage from './Pages/HomePage/HomePage.jsx';

const routing  = createBrowserRouter(
  [
    {
      path : '/',
      element: <HomePage/>

    }
  ]
)




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={routing} />
  </StrictMode>,
)
