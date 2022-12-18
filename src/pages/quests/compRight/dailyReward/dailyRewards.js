import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { CoinSvg } from "../../../../assets/svg";

const dailyRewards = () => {
  return (
    <div className="rewards flex flex-col gap-3">
      <p className="reward-title action-heading">
        Action #1 : Claim your Daily Sign-in Reward
      </p>
      <div className="reward-wrapper-outer flex flex-col p-4 w-full border-2 rounded-3xl gap-6">
        <div className="reward-wrapper md:py-5 py-3 rounded-3xl flex flex-row items-center justify-center">
          <img src={CoinSvg} alt="coin" className="w-10" />
          <p className="text-white ml-4 text-cgreen-700 fs-22 font-bold">
            1 xCapx
          </p>
        </div>
        <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full">
          Claim now
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
    </div>
  );
};

export default dailyRewards;