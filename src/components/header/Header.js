import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BellIcon, CoinSvg } from "../../assets/svg";

const Header = () => {
  const location = useLocation();
  const userData = useSelector((state) => state.user);
  const pathname = location.pathname.replace("/", "").replace("-", " ");
  return (
    <header className="header flex items-center border-primary-200 fixed top-0 w-full md:px-8 px-4">
      <h3 className="page-name capitalize">{pathname}</h3>
      <div className="flex-grow" />
      <button class="">
        <img src={CoinSvg} alt="coin" />
        <span className="mx-1">{userData.earned_rewards} xCapx</span>
      </button>
      <button class="">
        <img src={BellIcon} alt="Bell" />
      </button>
    </header>
  );
};

export default Header;
