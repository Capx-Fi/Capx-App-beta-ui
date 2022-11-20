import React from "react";
import { BellIcon, CoinSvg } from "../../assets/svg";

const Header = () => {
  return (
    <header className="header flex items-center border-primary-200 fixed top-0 w-full md:px-8 px-4">
      <h3 className="page-name">Leaderboard</h3>
      <div className="flex-grow" />
      <button class="">
        <img src={CoinSvg} alt="coin" />
        <span className="mx-1">5 xCapx</span>
      </button>
      <button class="">
        <img src={BellIcon} alt="Bell" />
      </button>
    </header>
  );
};

export default Header;
