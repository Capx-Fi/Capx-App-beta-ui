import React from "react";
import { HiArrowRight } from "react-icons/hi";

const codestep1 = () => {
  return (
    <div className="codestep flex-col md:ml-20 px-5 md:px-0 md:w-3/5 w-full">
      <p className="codestep-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : Generate Invite Code </p>
      <div className="codestep-wrapper w-full flex flex-col gap-6 p-3 md:p-4 border-2 md:rounded-3xl rounded-2xl">
          <p className=" codestep-placeholder fs-22 font-bold px-5 pt-4 pb-2 w-full bg-slate-50 rounded-2xl">* * * * *</p>
        <button className="bg-gredient-2 action-btn self-stretch flex w-full justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16">
            Generate Invite Code
            <HiArrowRight className="text-xl ml-4" />
          </button>
    </div>
    </div>
  );
};

export default codestep1;
