import React from "react";
import { NavLink } from "react-router-dom";
import {
  BrandLogoSvg,
  HomeIconSvg,
  LeaderboardIconSvg,
  ProfileIconSvg,
  WalletIconSvg,
} from "../../assets/svg";

const SideNav = () => {
  return (
    <div className="sidenav flex flex-col items-center min-h-screen hidden md:flex border-primary-200">
      <img className="brand-logo" src={BrandLogoSvg} alt="Capx" />
      <NavLink
        to="/home"
        className="tabs flex flex-col items-center justify-center mt-14 mb-4"
      >
        <img className="icons" src={HomeIconSvg} alt="home" />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/home"
        className="tabs flex flex-col items-center justify-center mb-4"
      >
        <img className="icons" src={WalletIconSvg} alt="home" />
        <span>Wallet</span>
      </NavLink>
      <NavLink
        to="/leaderboard"
        className="tabs flex flex-col items-center justify-center mb-4"
      >
        <img className="icons" src={LeaderboardIconSvg} alt="home" />
        <span>Leaderboard</span>
      </NavLink>
      <div className="flex-grow" />
      <NavLink
        to="/home"
        className="tabs flex flex-col items-center justify-center"
      >
        <img className="icons" src={ProfileIconSvg} alt="home" />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default SideNav;
