import React  from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css'


import Nav from './home'
import ErrorPage from './not_found';
import CreateTasks from './script/CreateTasks';
import TaskList from './script/TaskList';
import Templates from './script/TemplateList';
import MailList from './script/SubsceriberList'

import Task from './script/task'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav/>,
    errorElement: <ErrorPage/>,
    children:[
      
      {

        path:"/",
        element:<CreateTasks/>,
      },
      {

        path:"Tasks/",
        element:<TaskList/>,
      },
      {
        path:"Tasks/:taskId",
        element: <Task/>
      },
      {
        path:"Templates/",
        element:<Templates/>,
      },
      {
        path:"Subscribers/",
        element:<MailList/>,
      }

    ],
  }
])



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>);
