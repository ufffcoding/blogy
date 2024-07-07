import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Blog from "./components/Blog.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Profile from "./Pages/Profile.jsx";
import AddBlog from "./Pages/AddBlog.jsx";
import EditBlog from "./Pages/EditBlog.jsx";
import { PersistGate } from "redux-persist/lib/integration/react";
import AuthLayout from "./components/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    exact: true,
    children: [
      {
        path: "/",
        element: <Home />,
        exact: true,
      },
      {
        path: "/profile",
        element: <Profile />,
        exact: true,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
        exact: true,
      },
      {
        path: "/add-blog",
        element: (
          <AuthLayout authentication>
            <AddBlog />
          </AuthLayout>
        ),
        exact: true,
      },
      {
        path: "/edit-blog/:id",
        element: (
          <AuthLayout authentication>
            <EditBlog />
          </AuthLayout>
        ),
        exact: true,
      },
    ]
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
    exact: true,
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
    exact: true,
  },
  {
    path: "/logout",
    element: (
      <Logout />
    ),
    exact: true,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
