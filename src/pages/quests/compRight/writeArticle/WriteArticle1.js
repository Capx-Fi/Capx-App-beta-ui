import React, { useEffect, useState } from "react";
import { FcDocument } from "react-icons/fc";
import { SiNotion } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { config } from "../../../../config";
import { useSelector } from "react-redux";

const WriteArticle = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [enableNextQuestBtn, setEnableNextQuestBtn] = useState(false);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  const { isPending, data, error } = useFirestoreCollection(
    `${config.QUEST_ORDER_COLLECTION}/` +
      actionData.questID +
      `/${config.QUEST_ORDER_ACTION_COLLECTION}/`,
    ["__name__", "==", String(actionData.action_order_id)]
  );

  useEffect(() => {
    if (data) {
      setActionDetails(data[0]);
      if (window.keplr) {
        setIsWalletInstalled(true);
      } else {
        setIsWalletInstalled(false);
      }
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);
  console.log(data);

  if (actionDetails?.action_order_details?.comdex_chain) {
    return (
      !isPending &&
      actionDetails && (
        <div className="connect-wallet flex flex-col gap-3">
          <p className="reward-title action-heading">
            {actionDetails?.action_order_title}
          </p>
          {!isWalletInstalled ? (
            <>
              <p className="quest-text text-center">
                You have not installed the wallet extention, please install the
                extension and create a wallet and refresh the page.
              </p>
              <button
                onClick={() => {
                  window.open("https://www.keplr.app/download");
                }}
                className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
              >
                Download the extension
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                window.open(actionDetails?.action_order_details.comdex_chain);
                setEnableNextQuestBtn(true);
              }}
              className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold fs-16 w-full"
            >
              Add comdex chain
            </button>
          )}
          <button
            onClick={(e) => {
              actionData.handleCompleteAction(e, { type: "", value: "" });
            }}
            disabled={!enableNextQuestBtn}
            className={`${
              !enableNextQuestBtn
                ? "disabled"
                : "bg-gredient-2 contained-effect"
            } action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl`}
          >
            Next action
            <HiArrowRight className="text-xl " />
          </button>
        </div>
      )
    );
  } else {
    return (
      !isPending &&
      actionDetails && (
        <div className="write-article flex flex-col gap-3">
          <p className="action-heading">
            {actionData?.is_claimed === false
              ? actionData?.action_title
              : "ALL TASKS COMPLETE"}
          </p>

          <div className=" p-4 w-full border-2 rounded-3xl flex flex-col gap-3">
            <button
              onClick={() => {
                window.open(actionDetails?.action_order_details.notion);
                setEnableNextQuestBtn(true);
              }}
              className="notion-btn outlined-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl text-white font-semibold w-full"
            >
              <SiNotion className="fs-26 w-6" />
              Go to Notion Doc
            </button>
            <button
              onClick={() => {
                window.open(actionDetails?.action_order_details.google_docs);
                setEnableNextQuestBtn(true);
              }}
              className="google-btn outlined-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl font-semibold w-full"
            >
              <FcDocument className="fs-28 w-6" />
              Go to Google Doc
            </button>
          </div>

          <button
            onClick={(e) => {
              actionData.handleCompleteAction(e, { type: "", value: "" });
            }}
            disabled={!enableNextQuestBtn}
            className={`${
              !enableNextQuestBtn
                ? "disabled"
                : "bg-gredient-2 contained-effect"
            } action-btn flex justify-center items-center py-4 px-8 gap-2 md:gap-6 rounded-2xl`}
          >
            Next action
            <HiArrowRight className="text-xl " />
          </button>
        </div>
      )
    );
  }
};

export default WriteArticle;
