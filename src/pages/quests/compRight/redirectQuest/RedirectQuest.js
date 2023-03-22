import React, { useEffect, useState } from "react";
import { config } from "../../../../config";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { GoLinkExternal } from "react-icons/go";
import ErrorModal from "../errorModal/ErrorModal";
import TopLoader from "../../../../components/topLoader/TopLoader";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";

const RedirectQuest = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [enableVerify, setEnableVerify] = useState(false);
  const [ModalHeadning, setModalHeadning] = useState("");
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const userData = useSelector((state) => state.user);

  const handleErrorModal = () => {
    SetIsOpenErrorModal(false);
  };

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

  const handleActionComplete = (e) => {
    if (userData.wallets?.cosmos?.comdex) {
      actionData.handleCompleteAction(e, { type: "" });
    } else {
      setModalHeadning("Please connect your wallet");
      SetIsOpenErrorModal(true);
    }
  };

  return (
    <div className="createtweet relative flex flex-col gap-3">
      <p className="createtweet-title action-heading ">
        {actionDetails?.action_order_title}
      </p>

      <div className="createtweet-wrapper p-4 w-full border-2 rounded-3xl flex flex-col gap-8">
        <div className="createtweet-1 flex flex-col gap-1">
          <button
            className="url-box p-4 flex items-center justify-between outlined-effect heading text-cgreen-700 opacity-50 font-medium pl-2 fs-15"
            onClick={() => {
              window.open(actionDetails.action_order_info.link);
              setEnableVerify(true);
            }}
          >
            {actionDetails && <p>{actionDetails.action_order_info.details}</p>}

            <div className="ml-3">
              <GoLinkExternal className="text-xl" />
            </div>
          </button>
        </div>
        <button
          className={`${
            !enableVerify ? "disabled" : "bg-gredient-2 contained-effect"
          } action-btn self-stretch flex justify-center items-center p-3 rounded-2xl`}
          onClick={handleActionComplete}
          disabled={!enableVerify}
        >
          Verify
          <HiArrowRight className="text-xl ml-4" />
        </button>
      </div>
      <ErrorModal
        heading={ModalHeadning}
        open={isOpenErrorModal}
        handleClose={handleErrorModal}
      />
      {isPending && <TopLoader />}
    </div>
  );
};

export default RedirectQuest;
