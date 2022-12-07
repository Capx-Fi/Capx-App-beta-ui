import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BellIcon, CoinSvg , Logout } from "../../assets/svg";


const Header = ({userAction}) => {
  const location = useLocation();
  const userData = useSelector((state) => state.user);
  const pathname = location.pathname.replace("/", "").replace("-", " ");
  

  const handleLogout = (e) =>{
    userAction.handleLogout(e)
  }

  return (
    <header className="header flex items-center border-primary-200 fixed top-0 w-full md:px-8 px-4">
      <h3 className="page-name capitalize">{pathname ? pathname : "Home"}</h3>
      <div className="flex-grow" />
      <button className="">
        <img src={CoinSvg} alt="coin" />
        <span className="mx-1">{userData.earned_rewards} xCapx</span>
      </button>
      <button className="" onClick={handleLogout}>
        <img src={BellIcon} alt="Logout" />
        <span className="mx-1">Logout</span>
      </button>
    </header>
  );
};

export default Header;
