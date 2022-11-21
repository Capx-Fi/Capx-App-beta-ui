import React from "react";
import { Link } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import ConsTasks from "./components/ConsTasks/ConsTasks";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import { HistoryIcon } from "../../assets/images/wallet";

function Home() {
  return (
    <div className="flex flex-row h-screen ">
        <LeftNavigation />
    <div className="flex flex-col w-screen">
        <TopNavigation pagename="Home"/>
    <div className="home-wrapper flex flex-col md:flex-row">
      <div className="flex flex-col basis-8/12 items-center border-r-2 h-full p-5 md:p-10 gap-9">
        <HomeBanner />

        <div className="consttasks-inner flex flex-col gap-5 overflow-y-scroll ">
              <div className="wallet-title flex flex-row w-full items-center gap-5">
                  <div className="wallet-title-wrapper flex flex-row gap-3 w-3/4 items-center">
                      <img src={HistoryIcon} alt="" className="w-8"/>
                      <p className="font-black fs-18 text-cgreen-700 opacity-80">Special Tasks</p>
                  </div>
              </div>
              <ConsTasks />
              </div>

      </div>
      <div className="flex flex-column basis-4/12 items-center">
      </div>
    </div>
    
    </div>
    </div>
      );
};

export default Home;

