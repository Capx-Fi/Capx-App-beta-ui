import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import TopLoader from "../../../../components/topLoader/TopLoader";
import { config } from "../../../../config";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";

const CapxBlog = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [isEnableActionCompleteButton, setIsEnableActionCompleteButton] =
    useState(false);

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

  const handleReadBlogButton = () => {
    window.open(actionDetails?.action_order_details.media_link);
    setIsEnableActionCompleteButton(true);
  };

  const handleActionCompleteButton = (e) => {
    if (isEnableActionCompleteButton) {
      actionData.handleCompleteAction(e, { type: "", value: "" });
    }
  };
  console.log(actionDetails);

  return (
    <div className="capx-blog-read flex flex-col gap-3">
      <p className="action-heading">
        {actionData?.is_claimed === false
          ? actionData?.action_title
          : "ALL TASKS COMPLETE"}
      </p>
      <button
        onClick={handleReadBlogButton}
        className="blog-btn text-white outlined-effect flex items-center justify-center"
      >
        <span>Read Capx Blog</span>
      </button>
      <button
        onClick={handleActionCompleteButton}
        className={`action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl ${
          isEnableActionCompleteButton
            ? "bg-gredient-2 contained-effect"
            : "disabled"
        }`}
      >
        Complete Action
        <HiArrowRight className="text-xl " />
      </button>
      {isPending && <TopLoader />}
    </div>
  );
};

export default CapxBlog;
