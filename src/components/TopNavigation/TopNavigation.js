import React from "react";
import { Link } from "react-router-dom";
import {
  capxIcon,
  notiIcon,
} from "../../assets/images/nav";

const  TopNavigation = props => {
  console.log (props)
  return (
    <div className="top-nav flex flex-row h-fit items-center w-full">
        <p className="fs-21 font-extrabold"> {props.pagename} </p>

        <div className="right-chips flex flex-row gap-4 items-center justify-center">
          <div className="wallet flex flex-row fs-12 font-bold rounded-xl">
              <img src={capxIcon} alt="" className="w-4 h-5"/>
              <div className="wallet-balance flex flex-row items-center font-extrabold">
                  <p>100</p>
                  <p>xCapx</p>
              </div>
          </div>

          <div className="notification rounded-xl">
              <img src={notiIcon} alt="" className="w-5.5"/>
          </div>
      </div>
    </div>

   );
};

export default TopNavigation;

