import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { config } from "../../../../config";

const AlphavDrop = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` +
      actionData.questID +
      `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    ["__name__", "==", String(actionData.action_order_id)]
  );
  useEffect(() => {
    if (data) {
      setActionDetails(data[0]);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  return (
    <div className="rewards flex flex-col gap-3">
      <p className="reward-title action-heading">
        {actionDetails?.action_order_title}
      </p>
      <div className="reward-wrapper-outer flex flex-col p-4 w-full border-2 rounded-3xl gap-6">
        <button
          className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
          onClick={(e) => {
            actionData.handleCompleteAction(e, { type: "no value" });
          }}
        >
          {actionDetails?.action_order_cta}
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
    </div>
    //   {isPending && <TopLoader />}
  );
};

export default AlphavDrop;
