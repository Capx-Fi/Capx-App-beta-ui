import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default function Routes({ isloggedIn }) {
  return useRoutes(routes(isloggedIn));
}
