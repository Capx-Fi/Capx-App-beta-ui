import React from "react";
import { HiArrowRight } from "react-icons/hi";
import {TwitterNegative, } from "../../../../../assets/svg";
import Input from "../../../../../components/Input/Input";


const tweetstep2 = () => {
  return (
    <div className="verifytweet flex-col md:ml-20 px-5 md:px-0 md:w-3/5 w-full">
      <p className="verifytweet-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #2 : Verify Tweet</p>
      <div className="verifytweet-wrapper w-full flex flex-col gap-6 p-3 md:p-4 border-2 md:rounded-3xl rounded-2xl">
                  <Input
                    placeholder="Enter your twitter post link"
                    label="PASTE TWEET LINK"
                    type="text"
                    name="PASTE YOUR TWEET LINK"
                  />
        <button className="bg-gredient-2 action-btn self-stretch flex w-full justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16">
            Submit & Claim Reward
            <HiArrowRight className="text-xl ml-4" />
          </button>
    </div>
    </div>
  );
};

export default tweetstep2;
