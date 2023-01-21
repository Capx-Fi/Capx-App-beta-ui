import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";

const CapxBlog = ({ actionData }) => {
  const [isEnableActionCompleteButton, setIsEnableActionCompleteButton] =
    useState(false);
  return (
    <div className="capx-blog-read flex flex-col gap-3">
      <p className="action-heading">
        {actionData?.is_claimed === false
          ? actionData?.action_title
          : "ALL TASKS COMPLETE"}
      </p>
      <button
        onClick={() => {
          window.open(
            "https://elfin-acrylic-eab.notion.site/Capx-App-8-to-27-Quests-Details-2cdfd70e1b7c4066a6869edc55490509#1aa065543e144d21aaf1e7ec93467062"
          );
          setIsEnableActionCompleteButton(true);
        }}
        className="blog-btn text-white outlined-effect flex items-center justify-center"
      >
        <span>Read Capx Blog</span>
      </button>
      <button
        onClick={(e) => {
          // actionData.handleCompleteAction(e, { type: "profile", value: "" })
        }}
        className={`action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
          isEnableActionCompleteButton
            ? "bg-gredient-2 contained-effect"
            : "disabled"
        }`}
      >
        Complete Action
        <HiArrowRight className="text-xl " />
      </button>
    </div>
  );
};

export default CapxBlog;
