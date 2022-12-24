import React, {useState,useEffect} from "react";
import { HiArrowRight } from "react-icons/hi";
import { CoinSvg } from "../../../../assets/svg";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { config } from "../../../../config";

const DailyRewards = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_ACTION_COLLECTION}/` + actionData.questID + `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    [
      "action_order_id",
      "==",
      String(actionData.action_order_id),
    ]
  );
  useEffect(() => {
    if (data) {
      console.log(data[0]);
      setActionDetails(data[0]);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);
  const handleCompleteAction = (e) => {
    e.preventDefault();
    const input = {
      type: "dailyReward",
    };
    actionData.handleCompleteAction(e, input);
  };
  return (
    <div className="rewards flex flex-col gap-3">
      <p className="reward-title action-heading">
        {actionDetails?.action_order_title}
      </p>
      <div className="reward-wrapper-outer flex flex-col p-4 w-full border-2 rounded-3xl gap-6">
        <div className="reward-wrapper md:py-5 py-3 rounded-3xl flex flex-row items-center justify-center">
          <img src={CoinSvg} alt="coin" className="w-10" />
          <p className="text-white ml-4 text-cgreen-700 fs-22 font-bold">
            1 xCapx
          </p>
        </div>
        <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full" onClick={handleCompleteAction}>
          {actionDetails?.action_order_cta}
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
    </div>
  );
};

export default DailyRewards;
