import React from "react";
import { NavLink } from "react-router-dom";
import {
  ActiveHomeIcon,
  ActiveLeaderboardIconSvg,
  ActiveProfiletIcon,
  ActiveWalletIcon,
  HomeIconSvg,
  LeaderboardIconSvg,
  ProfileIconSvg,
  WalletIconSvg,
} from "../../assets/svg";

const MobileNav = () => {
  return (
    <div className="mobile-nav flex justify-evenly px-3 pb-3 md:hidden block fixed bottom-0">
      <NavLink to="/" className="tabs">
        <img className="icons" src={HomeIconSvg} alt="home" />
        <img className="icons active-icon" src={ActiveHomeIcon} alt="home" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/" className="tabs">
        <img className="icons" src={WalletIconSvg} alt="home" />
        <img className="icons active-icon" src={ActiveWalletIcon} alt="home" />
        <span>Wallet</span>
      </NavLink>
      <NavLink to="/leaderboard" className="tabs">
        <img className="icons" src={LeaderboardIconSvg} alt="home" />
        <img
          className="icons active-icon"
          src={ActiveLeaderboardIconSvg}
          alt="home"
        />
        <span>Leaderboard</span>
      </NavLink>

      <NavLink to="/" className="tabs">
        <img className="icons" src={ProfileIconSvg} alt="home" />
        <img
          className="icons active-icon"
          src={ActiveProfiletIcon}
          alt="home"
        />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default MobileNav;
