import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import MobileNav from "../components/mobileNav/MobileNav";
import SideNav from "../components/sideNav/SideNav";

const Layout = () => {
  return (
    <div className="layout flex">
      <SideNav />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="main-wrapper flex-grow ">
          <div className="main">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;
