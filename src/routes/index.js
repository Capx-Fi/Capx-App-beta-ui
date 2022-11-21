import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/MyProfile";
import MyProfileEdit from "../pages/MyProfileEdit";
import MyWallet from "../pages/MyWallet";
import Leaderboard from "../pages/Leaderboard";

const Redirect = ({ to }) => {
  return <Navigate to={to} />;
};

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit-profile",
    element: <MyProfileEdit />,
  },
  {
    path: "/wallet",
    element: <MyWallet />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "*",
    element: <Redirect to="/" />,
  },
  
];

export default function Routes({ isloggedIn }) {
  return useRoutes(routes(isloggedIn));
}
