import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { QuestBoySvg } from "../../../../assets/svg";

const QuestCompleteScreen = ({modalAction}) => {
  return (
    <div className="quest-complete flex flex-col items-center gap-3">
      <img className="box-img mb-3" src={QuestBoySvg} alt="complete" />
      <h2 className="heading $gradient-cgreen-2">Almost There!</h2>
      <p className="text mb-6">
        To complete the quest and to earn your rewards click on complete
      </p>
      <button className="action-btn bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl " onClick={modalAction?.claimReward}>
        Complete Quest
        <HiArrowRight className="text-xl ml-4" />
      </button>
    </div>
  );
};

export default QuestCompleteScreen;
