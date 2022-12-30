import React from "react";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="leaderboard-banner rounded-2xl w-full md:rounded-3xl">
      <div className="flex flex-col items-start  gap-6">
        <h2>
          Welcome to the leaderboard! <br /> Keep learning,
          <br className="md:hidden block" /> Keep earning
        </h2>
        <Link to="/">
          <button className="flex items-center text-white justify-between ">
            <span className="fs-16 font-black mr-3">Explore Quests</span>
            <ImArrowRight2 />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
