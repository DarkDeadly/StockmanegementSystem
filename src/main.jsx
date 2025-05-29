import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter,RouterProvider, } from "react-router";
import './util/global.css'
import './index.css'
import HomePage from './Pages/HomePage/HomePage.jsx';
import AboutUs from './Pages/AboutUs/AboutUs.jsx';
import Analytics from './Pages/Analytics/Analytics.jsx';
import UserManagement from './Pages/UserManagement/UserManagement.jsx';
import Auth from './Pages/Authentication/Auth.jsx';
import Register from './Component/authenticationcomponents/Register';
import Product from './Pages/Products/Product.jsx';
import Profile from './Pages/Profile/Profile.jsx';

const routing  = createBrowserRouter(
  [
    {
      path : '/',
      element: <HomePage/>

    }, 
    {
      path: '/About',
      element : <AboutUs/>
    },
 
    {
      path : '/Users',
      element: <UserManagement/>

    }, 
    {
      path : '/Authentication',
      element: <Auth/>

    }, 
    {
      path : '/Authentication/Register',
      element : <Register/>
    },
    {
      path : '/Products',
      element : <Product/>
    },
    {
      path : "/Profile",
      element : <Profile/>
    }
  ]
)




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={routing} />
  </StrictMode>,
)
