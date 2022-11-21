import React from "react";
import { NavLink } from "react-router-dom";
import {
  capxLogo,
  homeIcon,
  homeIconact,
  walletIcon,
  walletIconact,
  leaderboardIcon,
  leaderboardIconact,
  profileIcon,
  profileIconact,
} from "../../assets/images/nav";

const  LeftNavigation = () => {
  return (

    <div className="sidenav flex flex-col items-center min-h-screen hidden md:flex border-primary-200 border-r-2 text-cgreen-500 md: hidden" >
      <img className="brand-logo" src={capxLogo} alt="Capx" />
      <NavLink to="/" className="tabs flex flex-col items-center justify-center mt-14 mb-4">
        <img className="icons" src={homeIcon} alt="home" />
        <img className="icons active-icon" src={homeIconact} alt="home" />
        <span className="fs-12 font-black">Home</span>
      </NavLink>

      <NavLink
        to="/wallet"
        className="tabs flex flex-col items-center justify-center mb-4">
        <img className="icons" src={walletIcon} alt="home" />
        <img className="icons active-icon" src={walletIconact} alt="home" />
        <span className="fs-12 font-black">Wallet</span>
      </NavLink>

      <NavLink
        to="/leaderboard"
        className="tabs flex flex-col items-center justify-center mb-4">
        <img className="icons" src={leaderboardIcon} alt="home" />
        <img className="icons active-icon" src={leaderboardIconact} alt="home"/>
        <span className="fs-12 font-black">Leaderboard</span>
      </NavLink>

      <div className="flex-grow" />

      <NavLink
        to="/profile"
        className="tabs flex flex-col items-center justify-center">
        <img className="icons" src={profileIcon} alt="home" />
        <img className="icons  active-icon" src={profileIconact} alt="home"/>
        <span className="fs-12 font-black">Profile</span>
      </NavLink>
    </div>


   );
};

export default LeftNavigation;