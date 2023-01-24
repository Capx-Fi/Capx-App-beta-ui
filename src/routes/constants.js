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
import EmailLogin from "../pages/emailLogin";
import ForgotPassowrd from "../pages/forgetPassword/ForgetPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import { Navigate } from "react-router-dom";
import AnswerQuiz from "../pages/quests/quest-layout/index.js";
import Leaderboard from "../pages/leaderboard";
import EmailVerificationExpired from "../pages/emailVerificationExpired/EmailVerificationExpired";
import EmailVerification from "../pages/emailverification/EmailVerification";

const Redirect = ({ to }) => {
  return <Navigate to={to} />;
};

export const publicRoutes = [
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
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/email-verification-expired",
    element: <EmailVerificationExpired />,
  },
  {
    path: "*",
    element: <Redirect to="/" />,
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
        path: "/quest/:questID",
        element: <AnswerQuiz />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Redirect to="/" />,
  },
];

export const semiProtectedRoutes = [
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
    element: <Redirect to="/create-username" />,
  },
];

export const verificationRoute = [
  {
    path: "/email-verify",
    element: <EmailVerification />,
  },
  {
    path: "*",
    element: <Redirect to="/email-verify" />,
  },
]
