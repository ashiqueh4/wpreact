import React from 'react'
import Homelayout from '../pages/homesections/Homelayout';
import Aboutus from '../pages/aboutus/Aboutus';
import Contact from '../pages/contact/Contact';
import ErrorPage from '../../error-page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/About",
    element: <Aboutus/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/Contact",
    element: <Contact/>,
    errorElement: <ErrorPage />
  },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router