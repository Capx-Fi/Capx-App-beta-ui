import React, { useState,useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { config } from "../../../../config";

const WatchVideo = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` + actionData.questID + `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    [
      "__name__",
      "==",
      String(actionData.questID + "-" + actionData.action_id),
    ]
  );
  useEffect(() => {
    if (data) {
      setActionDetails(data[0]);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);
  return (
    <div className="watch-video flex flex-col gap-3">
      <p className="action-title action-heading font-bold underline underline-offset-4 text-cgreen-700 fs-15">
        {actionDetails && actionDetails.action_order_title}
      </p>
      <div className="video-wrapper p-2 pb-5 bg-slate-50 w-full rounded-3xl border-2 mb-10">
        <div className="responsive-iframe">
          <iframe
            src={actionDetails ? actionDetails.action_order_details.media_link:""}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="rounded-2xl video-iframe"
          />
        </div>
      </div>
      <button
        id="videoClick"
        className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold w-full"
        onClick={(e) =>
          actionData.handleCompleteAction(e, { type: "video", value: "" })
        }
      >
        Next Action
        <HiArrowRight className="text-xl ml-4" />
      </button>
    </div>
  );
};

export default WatchVideo;
