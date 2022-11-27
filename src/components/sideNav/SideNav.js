import React from "react";
import { NavLink } from "react-router-dom";
import {
  ActiveHomeIcon,
  ActiveLeaderboardIconSvg,
  ActiveProfiletIcon,
  ActiveWalletIcon,
  BrandLogoSvg,
  HomeIconSvg,
  LeaderboardIconSvg,
  ProfileIconSvg,
  WalletIconSvg,
} from "../../assets/svg";

const SideNav = () => {
  return (
    <div className="sidenav flex flex-col items-center max-h-screen hidden md:flex border-primary-200 sticky top-0 ">
      <img className="brand-logo" src={BrandLogoSvg} alt="Capx" />
      <NavLink
        to="/"
        className="tabs flex flex-col items-center justify-center mt-14 mb-4"
      >
        <img className="icons" src={HomeIconSvg} alt="home" />
        <img className="icons active-icon" src={ActiveHomeIcon} alt="home" />

        <span>Home</span>
      </NavLink>
      <NavLink
        to="/my-wallet"
        className="tabs flex flex-col items-center justify-center mb-4"
      >
        <img className="icons" src={WalletIconSvg} alt="home" />
        <img className="icons  active-icon" src={ActiveWalletIcon} alt="home" />
        <span>Wallet</span>
      </NavLink>
      <NavLink
        to="/leaderboard"
        className="tabs flex flex-col items-center justify-center mb-4"
      >
        <img className="icons" src={LeaderboardIconSvg} alt="home" />
        <img
          className="icons active-icon"
          src={ActiveLeaderboardIconSvg}
          alt="home"
        />
        <span>Leaderboard</span>
      </NavLink>
      <div className="flex-grow" />
      <NavLink
        to="/profile"
        className="tabs flex flex-col items-center justify-center"
      >
        <img className="icons" src={ProfileIconSvg} alt="home" />
        <img
          className="icons  active-icon"
          src={ActiveProfiletIcon}
          alt="home"
        />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default SideNav;
