import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import MobileNav from "../components/mobileNav/MobileNav";
import SideNav from "../components/sideNav/SideNav";
import Modal from "../components/Modal/Modal";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import { setUser, setUserWithQuest } from "../store/slices/userSlice";
import { useFireBaseLogout } from "../hooks/useFireBaseLogout";
import { logoutUser } from "../store/slices/authSlice";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const authUser = useSelector((state) => state.auth.user);
  const [userDataFetch, setUserDataFetch] = useState(false);
  const [userLogout, setUserLogout] = useState(false);
  const { data, error, isPending } = useFirestoreCollection("users", [
    "email",
    "==",
    `${authUser ? authUser.email : ""}`,
  ]);
  const {
    data: questData,
    error: questError,
    isPending: questIsPending,
  } = useFirestoreCollection(
    `users/${authUser ? authUser.uid : "dummy"}/quest-order`,
    ["docType", "==", "Aggregate"]
  );
  const {
    signOutUser,
    error: logoutError,
    isPending: logoutPending,
  } = useFireBaseLogout();
  console.log("i rendered");

  const handleLogout = async (e) => {
    e.preventDefault();
    signOutUser();
    setUserLogout(true);
  };

  useEffect(() => {
    if (data && !logoutPending && !userLogout) {
      console.log("new User Data fetch");
      console.log(authUser);
      if (data[0].username && data[0].username !== "") {
        setUserDataFetch(true);
        dispatch(setUser(data[0]));
      }
    } else if (error && error === -1) {
      console.log("user Data update error");
    } else if (userLogout && !logoutPending) {
      console.log("i triggered");
      dispatch(logoutUser());
      //navigate('/onboarding')
    }
  }, [data, error, userLogout]);

  useEffect(() => {
    if (
      questData &&
      questData.length > 0 &&
      questData[0].quests &&
      !userLogout
    ) {
      const userQuestData = questData[0].quests;
      let result = [];
      Object.keys(userQuestData).forEach((key) => {
        result.push({
          ...userQuestData[key],
          questID: key.split("|")[0],
          quest_order_id: key,
        });
      });
      dispatch(setUserWithQuest({ quest_data: result }));
    }
  }, [questData]);

  return (
    <>
      {userDataFetch && user.username && user.username.trim().length > 0 ? (
        <div className="layout flex">
          <SideNav />
          <div className="flex-grow flex flex-col min-h-screen">
            <Header userAction={{ handleLogout: handleLogout }} />
            <main className="main-wrapper flex-grow ">
              <div className="main">
                <Outlet />
              </div>
              <Footer />
            </main>
          </div>

          <MobileNav />
        </div>
      ) : (
        <Modal />
      )}
      {logoutPending && userLogout && <Modal />}
    </>
  );
};

export default Layout;
