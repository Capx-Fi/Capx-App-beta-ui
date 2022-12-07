import React from "react";
import { HiArrowRight } from "react-icons/hi";

const buildProfile = ({actionData}) => {
  return (
    <div className="follow flex-col md:ml-20 px-5 md:px-0">
      <p className="reward-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : Complete your Profile</p>
        <button onClick={(e)=>actionData.handleCompleteAction(e,{type:"profile",value:""})} className="bg-gredient-2 action-btn self-stretch flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl text-white font-semibold fs-16">
         Complete your Profile <HiArrowRight className="text-xl ml-4" />
          </button>
    </div>
  );
};

export default buildProfile;
