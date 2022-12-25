import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import MobileNav from "../components/mobileNav/MobileNav";
import SideNav from "../components/sideNav/SideNav";
import Modal from "../components/Modal/Modal";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import { setUser } from "../store/slices/userSlice";
import { useFireBaseLogout } from "../hooks/useFireBaseLogout";
import { logoutUser } from "../store/slices/authSlice";
import Footer from "../components/footer/Footer";
import { config } from "../config";
import { auth } from "../firebase/firebase";
const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const authUser = useSelector((state) => state.auth.user);
  const [userDataFetch, setUserDataFetch] = useState(false);
  const [userLogout, setUserLogout] = useState(false);
  const [userQuests,setUserQuests] = useState(null);
  const { data, error, isPending } = useFirestoreCollection(config.USER_COLLECTION, [
    '__name__',
    "==",
    `${authUser ? authUser.uid : ""}`,
  ]);
  const {
    data: questData,
    error: questError,
    isPending: questIsPending,
  } = useFirestoreCollection(
    `${config.USER_COLLECTION}/${authUser ? authUser.uid : "dummy"}/quest-order`,
    ["docType", "==", "Aggregate"]
  );
  const {
    signOutUser,
    error: logoutError,
    isPending: logoutPending,
  } = useFireBaseLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    signOutUser();
    setUserLogout(true);
  };

  useEffect(() => {
    
    if (data && !logoutPending && !userLogout && userQuests) {
      if (data[0].username && data[0].username !== "") {
        dispatch(setUser({...data[0],userQuest:userQuests}));
      }
      setUserDataFetch(true);
    } else if (error && error === -1) {
      console.log("user Data update error");
    } else if (userLogout && !logoutPending) {
      dispatch(logoutUser());
    }
  }, [data, error, userLogout,userQuests]);

  useEffect(() => {
    
    let result = [];
    if (
      questData &&
      questData.length > 0 &&
      questData[0].quests &&
      !userLogout &&
      !questIsPending
    ) {
      const userQuestData = questData[0].quests;
      Object.keys(userQuestData).forEach((key) => {
        result.push({
          ...userQuestData[key],
          questID: key.split("|")[0],
          quest_order_id: key,
        });
      });
      setUserQuests(result);
    }else if(!questIsPending && !userLogout && questError ){
      setUserQuests(result)
    }
    
  }, [questData,questError]);

  return (
    <>
      {userDataFetch && !userLogout &&user.username && user.username.trim().length > 0 ? (
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
