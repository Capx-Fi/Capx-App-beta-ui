import React from "react";
import { LeaderboardBadge, OnboardSvg } from "../../assets/svg";
import Banner from "../../components/banner/Banner";
import Table from "./components/Table";

const Leaderboard = () => {
  return (
    <div className="leaderboard md:px-10 p-6 md:py-11 flex">
      <div className="left-bar bg-stale-500">
        <div className="mb-6">
          <Banner />
        </div>
        <div className="badge flex items-center mb-4">
          <img src={LeaderboardBadge} alt="Badge" />
          <p className="ml-2">Leaderboard</p>
        </div>
        <div>
          <Table />
        </div>
      </div>
      <div className="right-bar  justify-end items-end hidden lg:flex flex-grow ">
        <img className="fixed bottom-0 right-0" src={OnboardSvg} alt="img" />
      </div>
    </div>
  );
};

export default Leaderboard;
