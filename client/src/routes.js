import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage, {
  action as updateAbout,
  loader as aboutLoader,
} from "./pages/AboutPage";
import ContactPage, {
  action as updateContact,
  loader as contactLoader,
} from "./pages/ContactPage";
import RootLayout from "./routes/RootLayout";
import Dashboard from "./routes/Dashboard";
import HomePage from "./pages/HomePage";
import { loader as uploadsLoader } from "./routes/uploads/Uploads";
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
  const [posts, news, uploads] = await Promise.all([
    postsLoader(),
    newsLoader(),
    uploadsLoader(),
  ]);

  return { posts, news, uploads };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "/",
            element: <HomePage />,
            // element: [<News key={1} />, <Posts key={2} />],
            loader: combinedLoader,
            children: [
              {
                path: "/dashboard/post/:id",
                element: <PostDetails />,
                action: editPostAction,

                loader: postLoader,
              },
              {
                path: "/dashboard/new/:id",
                element: <NewDetails />,
                action: editNewAction,

                loader: newLoader,
              },
            ],
          },
          {
            path: "/about",
            element: <AboutPage />,
            action: updateAbout,
            loader: aboutLoader,
          },
          {
            path: "/contact",
            element: <ContactPage />,
            action: updateContact,
            loader: contactLoader,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
          {
            element: <Dashboard />,
            children: [
              {
                path: "/dashboard",
                element: <HomePage />,
                // element: [<News key={1} />, <Posts key={2} />],
                loader: combinedLoader,
                children: [
                  {
                    path: "/dashboard/create-post",
                    element: <CreatePost />,
                    action: createPostAction,
                  },

                  {
                    path: "/dashboard/post/:id",
                    element: <PostDetails />,
                    action: editPostAction,
                    loader: postLoader,
                  },
                  {
                    path: "/dashboard/create-new",
                    element: <CreateNew />,
                    action: createNewAction,
                  },
                  {
                    path: "/dashboard/new/:id",
                    element: <NewDetails />,
                    action: editNewAction,
                    loader: newLoader,
                  },
                ],
              },
              {
                path: "/dashboard/customers",
                element: <Customers />,
                loader: customersLoader,
                children: [
                  {
                    path: "/dashboard/customers/create-user",
                    element: <CreateUser />,
                    action: createUserAction,
                  },
                  {
                    path: "/dashboard/customers/:id",
                    element: <CustomerDetails />,
                    action: editUserAction,
                    loader: userLoader,
                  },
                ],
              },
              {
                path: "/dashboard/files/",
                element: <Files />,
                loader: async () => {
                  const files = await Promise.all([userFilesLoader()]);
                  return { files };
                },
                children: [
                  {
                    path: "/dashboard/files/upload",
                    element: <FileUpload />,
                    action: fileUploadAction,
                  },
                ],

                // loader: userFilesLoader,
                // stateLoader,
                // loader: stateLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
