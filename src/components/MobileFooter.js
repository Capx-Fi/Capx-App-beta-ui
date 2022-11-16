import React from "react";
import { NavLink } from "react-router-dom";
import { ElecIcon, HomeIcon, ProfileIcon, WalletIcon } from "../assets/svg";

const MobileFooter = () => {
  return (
    <footer className="mobile-footer w-full px-8 bg-white rounded-lg fixed bottom-0 md:hidden block">
      <div className="flex justify-between items-stretch">
        <NavLink
          to="/dashboard"
          className="flex justify-center items-center px-5 py-7 border-b-4 border-white"
        >
          <img className="w-5 h-5" src={HomeIcon} alt="Home" />
        </NavLink>
        <NavLink
          to="/"
          className="flex justify-center items-center px-5 py-7 border-b-4 border-white"
        >
          <img className="w-5 h-5" src={WalletIcon} alt="Wallet" />
        </NavLink>
        <NavLink
          to="/"
          className="flex justify-center items-center px-5 py-7 border-b-4 border-white"
        >
          <img className="w-5 h-5" src={ElecIcon} alt="Charge" />
        </NavLink>
        <NavLink
          to="/"
          className="flex justify-center items-center px-5 py-7 border-b-4 border-white"
        >
          <img className="w-5 h-5" src={ProfileIcon} alt="Profile" />
        </NavLink>
      </div>
    </footer>
  );
};

export default MobileFooter;
