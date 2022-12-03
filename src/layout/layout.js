import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import MobileNav from "../components/mobileNav/MobileNav";
import SideNav from "../components/sideNav/SideNav";
import { useFirestoreDoc } from "../hooks/useFirestoreDoc";
import { setUser } from "../store/slices/userSlice";

const Layout = () => {
  const [userDataFetch,setUserDataFetch] = useState(false);
	const user = useSelector((state)=>state.user)
  const auth = useSelector((state)=>state.auth.user);
	const navigate = useNavigate();
  const {data,isPending,error } = useFirestoreDoc("users",auth.uid);
  const dispatch = useDispatch();

  useEffect(()=>{

      if(user.username !== '' ){
        console.log("userData present on refresh")
				setUserDataFetch(true)
      }else if(userDataFetch){
        console.log('username not set')
        navigate('/create-username')
      }
   
	},[user,userDataFetch])

  useEffect(()=>{
    console.log(data,error);
      if(data){
        console.log("new User Data fetch")
        if(data.username && data.username !== '' ){
          setUserDataFetch(true)
          dispatch(setUser(data));
        }
      }else if(error && error === -1){
        console.log('username not set')
        navigate('/create-username')
      }
  },[data,error])


  return (
    <>
      {userDataFetch ? <div className="layout flex">
        <SideNav />
        <div className="flex-grow flex flex-col min-h-screen">
          <Header />
          <main className="main-wrapper flex-grow ">
            <div className="main">
              <Outlet />
            </div>
          </main>
        </div>
        <MobileNav />
      </div> : <p>Loading Data .....</p>}
    </>
  );
};

export default Layout;
