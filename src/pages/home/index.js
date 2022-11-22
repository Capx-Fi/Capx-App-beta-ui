import React from "react";
import { Link } from "react-router-dom";
import ConsTasks from "./components/ConsTasks/ConsTasks";
import DailyTasks from "./components/DailyTasks/DailyTasks";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import OldTasks from "./components/OldTasks/OldTasks";
import SpecialTasks from "./components/SpecialTasks/SpecialTasks";
import {goldcoin, checkicon, pencilicon, alerticon, thumbicon, } from "../../assets/images/home";

function Home() {
  return (
    <div className="home flex flex-col md:flex-row p-8 gap-16">
      <div className="home-wrapper-1 flex flex-col gap-8 w-full md:w-3/5">
        <HomeBanner/>
        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={checkicon} className="w-8"></img>
            <p className="fs-16 font-black">Daily Rewards</p>
            </div>
            <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
            <ConsTasks />
            </div>
        </div>

        <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={checkicon} className="w-8"></img>
            <p className="fs-16 font-black">Daily Quests</p>
            </div>
            <div className="home-tasks flex flex-row 11/12 pb-8 overflow-x-scroll">
            <DailyTasks />
            </div>
        </div>

      </div>
      <div className="home-wrapper-2 w-full md:w-2/5">
      <div className="home-wrapper-1-inner flex flex-col gap-5">
          <div className="home-title flex flex-row items-center gap-2">
            <img src={alerticon} className="w-8"></img>
            <p className="fs-16 font-black">Unclaimed 16xCapx</p>
            </div>
          <OldTasks/>
        </div>
      </div>
    </div>
  );
};

export default Home;

