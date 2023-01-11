import React from "react";
import { HiArrowRight } from "react-icons/hi";

const codestep1 = ({ actionData }) => {
  return (
    <div className="codestep flex-col  w-full">
      <p className="codestep-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">
        Action #1 : Generate the invite code to earn 2 xCapx tokens
      </p>
      <div className="flex flex-col gap-8">
        <div className="codestep-wrapper w-full flex flex-col gap-6  md:rounded-3xl rounded-2xl">
          <p className=" codestep-placeholder fs-22 font-bold px-5 md:pt-4 md:pb-2 pt-2 pb-1 w-full rounded-2xl">
            * * * * *
          </p>
        </div>
        <button
          onClick={(e) =>
            actionData.handleCompleteAction(e, { type: "inviteCode" })
          }
          className="bg-gredient-2 contained-effect action-btn self-stretch flex w-full justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16"
        >
          Generate Invite Code
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
    </div>
  );
};

export default codestep1;
