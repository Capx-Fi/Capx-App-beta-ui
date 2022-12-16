import React from "react";
import { HiArrowRight } from "react-icons/hi";

const buildProfile = ({ actionData }) => {
  return (
    <div className="create-profile flex flex-col">
      <p className="reward-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">
        Action #1 : Complete your Profile
      </p>
      <div className="create-profile-wrapper flex flex-col gap-1">
        <label className="label" for="name">
          ENTER YOUR PROFILE NAME*
        </label>
        <input className="name-input mb-4" type="text" name="name" id="name" />
        <button
          // onClick={(e) =>
          //   actionData.handleCompleteAction(e, { type: "profile", value: "" })
          // }
          className="bg-gredient-2 action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl"
        >
          Claim 1 xCapx <HiArrowRight className="text-xl " />
        </button>
      </div>
    </div>
  );
};

export default buildProfile;
