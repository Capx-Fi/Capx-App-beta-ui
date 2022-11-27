import React from "react";
import { HiArrowRight } from "react-icons/hi";
import {TwitterNegative, } from "../../../../assets/svg";
import Input from "../../../../components/Input/Input";


const affiliate = () => {
  return (
    <div className="follow flex-col md:ml-20 px-5 md:px-0 md:w-3/5 w-full">
      <p className="reward-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : Get Notified for the meme contest</p>
      <div className="w-full mb-4">
                  <Input
                    placeholder="Enter your email"
                    label="email"
                    type="text"
                    name="email"
                  /></div>
        <button className="bg-gredient-2 action-btn self-stretch flex w-full justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16">
            Notify Me
            <HiArrowRight className="text-xl ml-4" />
          </button>
    </div>
  );
};

export default affiliate;
