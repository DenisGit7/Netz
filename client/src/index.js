import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import RootLayout from "./routes/RootLayout";
import Dashboard from "./routes/Dashboard";

import Posts, { loader as postsLoader } from "./routes/post/Posts";
import CreatePost, {
  action as createPostAction,
} from "./routes/post/CreatePost";
import PostDetails, {
  action as editPostAction,
  loader as postLoader,
} from "./routes/post/PostDetails";

import News, { loader as newsLoader } from "./routes/new/News";
import CreateNew, { action as createNewAction } from "./routes/new/CreateNew";
import NewDetails, {
  action as editNewAction,
  loader as newLoader,
} from "./routes/new/NewDetails";

import Customers, { loader as customersLoader } from "./routes/user/Customers";
import CreateUser, {
  action as createUserAction,
} from "./routes/user/CreateUser";
import CustomerDetails, {
  action as editUserAction,
  loader as userLoader,
} from "./routes/user/CustomerDetails";

import Files, { loader as userFilesLoader } from "./routes/file/Files";
import FileUpload, {
  action as fileUploadAction,
} from "./routes/file/FileUpload";

const combinedLoader = async () => {
  const [posts, news] = await Promise.all([postsLoader(), newsLoader()]);

  return { posts, news };
};

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
            element: [<News />, <Posts />],
            loader: combinedLoader,
            children: [
              {
                path: "/create-post",
                element: <CreatePost />,
                action: createPostAction,
              },

              {
                path: "/post/:id",
                element: <PostDetails />,
                action: editPostAction,
                loader: postLoader,
              },
              {
                path: "/create-new",
                element: <CreateNew />,
                action: createNewAction,
              },
              {
                path: "/new/:id",
                element: <NewDetails />,
                action: editNewAction,
                loader: newLoader,
              },

              // ],
              // path: "/",
              // element: <News />,
              // loader: newsLoader,
              // children: [
              //   {
              //     path: "/create-new",
              //     element: <CreateNew />,
              //     action: createNewAction,
              //   },
              //   {
              //     path: "/:id",
              //     element: <NewDetails />,
              //     action: editNewAction,
              //     loader: newLoader,
              //   },
            ],
          },

          // {
          //   path: "/",
          //   element: <News />,
          //   loader: newsLoader,
          //   children: [
          //     {
          //       path: "/create-new",
          //       element: <CreateNew />,
          //       action: createNewAction,
          //     },
          //     {
          //       path: "/:id",
          //       element: <NewDetails />,
          //       action: editNewAction,
          //       loader: newLoader,
          //     },
          //   ],
          // },
          {
            path: "/customers",
            element: <Customers />,
            loader: customersLoader,
            children: [
              {
                path: "/customers/create-user",
                element: <CreateUser />,
                action: createUserAction,
              },
              {
                path: "/customers/:id",
                element: <CustomerDetails />,
                action: editUserAction,
                loader: userLoader,
              },
            ],
          },
          {
            path: "/files",
            element: <Files />,
            loader: userFilesLoader,
            children: [
              {
                path: "/files/upload",
                element: <FileUpload />,
                action: fileUploadAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
