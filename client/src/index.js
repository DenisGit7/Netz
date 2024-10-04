import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import './index.css'
import RootLayout from "./routes/RootLayout.js";
import App from "./App";
import Dashboard from "./routes/Dashboard";
import Posts from "./routes/Posts";
import NewPost from "./routes/NewPost";
import FileList from "./features/file/FileList.js";
import Customers from "./features/user/Customers";
import CreateUser from "./features/user/CreateUser";
import Authentication from "./features/user/Authentication";
import PostsList from "./features/post/PostsList";

// Here is where we can list all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "/",
            element: <Posts />,
            // loader: () => {},
            children: [{ path: "/create-post", element: <NewPost /> }],
          },
        ],
      },
      {
        path: "/files",
        element: <FileList />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     { path: "/customers", element: <Customers /> },
  //     { path: "/create-user", element: <CreateUser /> },
  //     { path: "/auth", element: <Authentication /> },
  //   ],
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
