// import logo from './logo.svg';
import './App.css';
import Layout from './components/Layoutpage';

import Homelayout from './components/pages/homesections/Homelayout'; 
import Aboutus from './components/pages/aboutus/Aboutus';
import Contact from './components/pages/contact/Contact';
import Projects  from './components/pages/project/project';
import Service  from './components/pages/service/Servicepage';
import Ourteam  from './components/pages/teampage/Ourteam';
import Testimonial from './components/pages/testimonialpage/Testimonialpage';
import ErrorPage from './error-page';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    errorElement: <ErrorPage />,
    children: [
  {
    index:true,
    element: <Homelayout/>,
  },
  {
    path: "/About",
    element: <Aboutus/>,
  },
  {
    path: "/Service",
    element: <Service/>,
  },
  {
    path: "/Project",
    element: <Projects/>,
  },
  {
    path: "/Our-team",
    element: <Ourteam/>,
  },
  {
    path: "/Testimonial",
    element: <Testimonial/>,
  },
  {
    path: "/Contact",
    element: <Contact/>,
  },

]
  }
]);



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
