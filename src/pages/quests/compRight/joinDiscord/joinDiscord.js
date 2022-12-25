import React from "react";
import {DiscordNegative, } from "../../../../assets/svg";

const joinDiscord = () => {
  return (
    <div className="follow flex-col md:ml-20 px-5 md:px-0">
      <p className="reward-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : Follow Capx on Twitter</p>
        <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-3xl text-white font-semibold fs-16">
        <img src={DiscordNegative} alt="coin"/> Join our Discord Community
          </button>
    </div>
  );
};

export default joinDiscord;
