import React from "react";
import { DailyQuestsIcon } from "../../../../assets/svg";

import { ImArrowRight2 } from "react-icons/im";

const Skeleton = () => {
  return (
    <div className="flex flex-col home-skeleton gap-8 animate-pulse">
      <div className="home-wrapper-1-inner  flex flex-col gap-5 ">
        <div className="home-title flex flex-row items-center gap-2">
          <img src={DailyQuestsIcon} className="w-8" alt="quest" />
          <p className="fs-16 font-black">Daily Rewards</p>
        </div>
        <div className="home-tasks flex flex-row 11/12">
          <div className="daily-card flex flex-col items-stretch bg-white rounded-xl p-3 gap-3">
            <div className="image-box skeleton-bg rounded-xl" />
            <div className="heading-wrapper px-3">
              <div className="heading skeleton-bg rounded" />
            </div>
            <div className="button skeleton-bg text-white flex justify-between items-center rounded-xl">
              <span>Begin Quest</span>
              <ImArrowRight2 className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="home-wrapper-1-inner flex flex-col items-start gap-5">
        <div className="home-title flex flex-row items-center gap-2">
          <img src={DailyQuestsIcon} className="w-8" />
          <p className="fs-16 font-black">Special Quests</p>
        </div>
        <div className="home-tasks ">
          <div className="special-card flex flex-col gap-3 rounded-xl p-3">
            <div className="img-box skeleton-bg rounded-xl" />
            <div className="flex heading-wrapper items-center">
              <div className="heading skeleton-bg rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
