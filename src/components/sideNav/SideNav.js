import React from "react";
import { NavLink } from "react-router-dom";
import {
  ActiveHomeIcon,
  ActiveLeaderboardIconSvg,
  ActiveWalletIcon,
  BrandLogoSvg,
  HomeIconSvg,
  LeaderboardIconSvg,
  WalletIconSvg,
} from "../../assets/svg";

const SideNav = () => {
  return (
    <div className="sidenav flex flex-col items-center min-h-screen hidden md:flex border-primary-200">
      <img className="brand-logo" src={BrandLogoSvg} alt="Capx" />
      <NavLink
        to="/"
        className="tabs flex flex-col items-center justify-center mt-10 mb-3"
      >
        <img className="icons" src={HomeIconSvg} alt="home" />
        <img className="icons active-icon" src={ActiveHomeIcon} alt="home" />

        <span>Home</span>
      </NavLink>
      <NavLink
        to="/my-wallet"
        className="tabs flex flex-col items-center justify-center mb-3"
      >
        <img className="icons" src={WalletIconSvg} alt="home" />
        <img className="icons  active-icon" src={ActiveWalletIcon} alt="home" />
        <span>Wallet</span>
      </NavLink>
      <NavLink
        to="/leaderboard"
        className="tabs flex flex-col items-center justify-center mb-3"
      >
        <img className="icons" src={LeaderboardIconSvg} alt="home" />
        <img
          className="icons active-icon"
          src={ActiveLeaderboardIconSvg}
          alt="home"
        />
        <span>Leaderboard</span>
      </NavLink>
    </div>
  );
};

export default SideNav;
