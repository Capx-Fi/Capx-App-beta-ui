import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import SideNav from "../components/sideNav/SideNav";

const Layout = () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-grow flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow ">{Outlet}</main>
      </div>
    </div>
  );
};

export default Layout;
