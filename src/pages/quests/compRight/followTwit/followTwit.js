import React from "react";
import { HiArrowRight } from "react-icons/hi";
import {TwitterNegative, } from "../../../../assets/svg";

const followTwit = () => {
  return (
    <div className="follow flex-col md:ml-20 px-5 md:px-0">
      <p className="reward-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : Follow Capx on Twitter</p>
        <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-3xl text-white font-semibold fs-16">
        <img src={TwitterNegative} alt="coin"/> Follow @CapxFi on Twitter
          </button>
    </div>
  );
};

export default followTwit;
