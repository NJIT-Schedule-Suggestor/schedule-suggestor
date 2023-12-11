import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Courses from './pages/Courses';
import TimePreference from './pages/TimePreference';
import Generate from './pages/Generate';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/courses",
        element: <Courses/>,
      },
      {
        path: "/time-preference",
        element: <TimePreference/>,
      },
      {
        path: "/generate",
        element: <Generate/>,
      },
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);