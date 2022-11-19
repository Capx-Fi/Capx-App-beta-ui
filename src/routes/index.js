import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Congratulaions from "../pages/congratulations/index.js";
import CreateUsername from "../pages/create-username/index.js";
import EmailLogin from "../pages/emailLogin/index.js";
import EmailSignup from "../pages/emailSignup/index.js";
import Home from "../pages/home";
import InviteCode from "../pages/inviteCode/index.js";
import Login from "../pages/login";
import Onboarding from "../pages/onboarding";
import ResetPassword from "../pages/reserPassword/index.js";
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
    path: "/signup/email",
    element: <EmailSignup />,
  },
  {
    path: "/create-username",
    element: <CreateUsername />,
  },
  {
    path: "/invite-code",
    element: <InviteCode />,
  },
  {
    path: "/congratulation",
    element: <Congratulaions />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/signin/email",
    element: <EmailLogin />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
];

export default function Routes({ isloggedIn }) {
  return useRoutes(routes(isloggedIn));
}
