import React from "react";
import { LeaderboardBadge, OnboardSvg } from "../../assets/svg";
import Banner from "../../components/banner/Banner";
import Table from "./components/Table";

const Leaderboard = () => {
  return (
    <div className="leaderboard md:px-10 p-6 md:py-11 flex">
      <div className="left-bar bg-stale-500">
        <div className="mb-6">
          <Banner heading="You’re on leaderboard rank #8!" />
        </div>

        <div>
          <div className="badge flex items-center mb-4">
            <img src={LeaderboardBadge} alt="Badge" />
            <p className="ml-2">Leaderboard</p>
          </div>
          <Table />
        </div>
      </div>
      <div className="right-bar  justify-end items-end hidden lg:flex flex-grow ">
        <img className="fixed" src={OnboardSvg} alt="img" />
      </div>
    </div>
  );
};

export default Leaderboard;
