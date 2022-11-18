import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Onboarding from "../pages/onboarding";
import Signup from "../pages/signup";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
];

export default function Routes({ isloggedIn }) {
  return useRoutes(routes(isloggedIn));
}
