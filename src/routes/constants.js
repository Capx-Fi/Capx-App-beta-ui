import Onboarding from "../pages/onboarding/onboarding";
import Signup from "../pages/signup/signup";
import Login from "../pages/login/login";
import EmailSignup from "../pages/emailSignup/emailSignup";
import CreateUsername from "../pages/createUsername/createUsername";
import Layout from "../layout/layout";
import InviteCode from "../pages/inviteCode/inviteCode";
import Congratulaions from "../pages/congratulations/congratulations";
import Home from "../pages/home/home";
import MyWallet from "../pages/MyWallet";
import Profile from "../pages/profile";
import QuestLayout from "../pages/quests/quest-layout/index.js";
import EmailLogin from "../pages/emailLogin"
import ForgotPassowrd from "../pages/forgetPassword/forgetPassword"
import { Navigate } from "react-router-dom";

const Redirect = ({ to }) => {
  return <Navigate to={to} />;
};

export const publicRoutes =  [
    {
      path: "/",
      element: <Onboarding />,
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
			path: "/signup/email",
			element: <EmailSignup />,
		},
    {
      path: "/signin/email",
      element: <EmailLogin />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassowrd />,
    },
    {
      path: "*",
      element: <Redirect to="/onboarding" />,
    },
];

export const privateRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
			{
        path: "/my-wallet",
        element: <MyWallet />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
			{
        path: "/quest",
        element: <QuestLayout />,
      },
    ],
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
    path: "*",
    element: <Redirect to="/" />,
  },
];