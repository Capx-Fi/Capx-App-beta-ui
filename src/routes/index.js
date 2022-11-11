import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";
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
];

export default function Routes({ isloggedIn }) {
  return useRoutes(routes(isloggedIn));
}
