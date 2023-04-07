import React, { useEffect, useState } from "react";
import { config } from "../../../../config";
import { useFirestoreCollection } from "../../../../hooks/useFirestoreCollection";
import { GoLinkExternal } from "react-icons/go";
import ErrorModal from "../errorModal/ErrorModal";
import TopLoader from "../../../../components/topLoader/TopLoader";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase/firebase";
import { useApi } from "../../../../hooks/useApi";
import { RxLapTimer } from "react-icons/rx";

const RedirectQuest = ({ actionData }) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [enableVerify, setEnableVerify] = useState(false);
  const [ModalHeadning, setModalHeadning] = useState("");
  const [errorModalBtnText, setErrorModalBtnText] = useState("");
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [isOpenErrorModal, SetIsOpenErrorModal] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const questData = useSelector((state) => state.quest.allQuests);

  const {
    isError,
    isPending: isApiPenind,
    postData,
    data: apiData,
  } = useApi(config.API_URL, "POST");

  const handleErrorModal = () => {
    if (
      actionData?.poolData &&
      actionData.poolData.claimedRewards === actionData.poolData.totalRewards
    ) {
      navigate("/");
    } else {
      if (userData.wallets?.cosmos?.comdex) {
        SetIsOpenErrorModal(false);
      } else {
        if (questData.length > 0) {
          const connectWalletQuest = questData.filter((quest) => {
            return (
              quest.quest_category === "Harbor_AirDrop" &&
              quest.taskCategory === "Special"
            );
          })[0];
          if (connectWalletQuest.status === "new") {
            const apiDataObject = {
              data: { questId: actionDetails?.action_order_info?.req_quest_id },
            };
            postData(apiDataObject, "/registerForQuest");
          } else {
            navigate(
              `/quest/${
                actionDetails?.action_order_info?.req_quest_id +
                "|" +
                auth.currentUser.uid
              }`
            );
          }
        } else {
          const apiDataObject = {
            data: { questId: actionDetails?.action_order_info?.req_quest_id },
          };
          postData(apiDataObject, "/registerForQuest");
        }
      }
    }

    SetIsOpenErrorModal(false);
  };

  useEffect(() => {
    if (apiData && !isApiPenind) {
      navigate(
        `/quest/${
          actionDetails?.action_order_info?.req_quest_id +
          "|" +
          auth.currentUser.uid
        }`
      );
    }
  }, [apiData, isApiPenind]);

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
    if (
      actionData?.poolData &&
      actionData.poolData.claimedRewards === actionData.poolData.totalRewards
    ) {
      setModalHeadning(
        "xHARBOR token pool for this quest has been fully distributed"
      );
      setErrorModalBtnText("Go to home");
      setErrorModalMessage(" ");
      SetIsOpenErrorModal(true);
    } else {
      if (userData.wallets?.cosmos?.comdex) {
        actionData.handleCompleteAction(e, { type: "Verify_OnChain" });
      } else {
        setModalHeadning("Please connect your wallet");
        setErrorModalBtnText("Connect Wallet");
        SetIsOpenErrorModal(true);
      }
    }
  };

  const handleRedirectButton = () => {
    if (
      actionData?.poolData &&
      actionData.poolData.claimedRewards === actionData.poolData.totalRewards
    ) {
      setModalHeadning(
        "xHARBOR token pool for this quest has been fully distributed"
      );
      setErrorModalBtnText("Go to home");
      setErrorModalMessage(" ");
      SetIsOpenErrorModal(true);
    } else {
      window.open(actionDetails.action_order_info.link);
      setEnableVerify(true);
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
            className="bg-gredient-2 contained-effect action-btn self-stretch flex justify-center items-center p-3 rounded-2xl"
            onClick={handleRedirectButton}
          >
            {actionDetails && (
              <p>{actionDetails.action_order_info.details.replace(".", "")}</p>
            )}

            <div className="ml-3">
              <GoLinkExternal className="text-xl" />
            </div>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {actionData.btnState === true && actionData.countDown < 60 && (
            <p className="flex items-center gap-1">
              <RxLapTimer />
              Please wait till 00:{actionData.countDown}
            </p>
          )}
          <button
            className={`${
              !enableVerify || actionData.btnState
                ? "disabled"
                : "bg-gredient-2 contained-effect"
            } action-btn self-stretch flex justify-center items-center p-3 rounded-2xl`}
            onClick={handleActionComplete}
            disabled={!enableVerify || actionData.btnState}
          >
            Verify
            <HiArrowRight className="text-xl ml-4" />
          </button>
        </div>
      </div>
      <ErrorModal
        heading={ModalHeadning}
        open={isOpenErrorModal}
        handleClose={handleErrorModal}
        message={errorModalMessage}
        BtnText={errorModalBtnText}
      />
      {(isPending || isApiPenind) && <TopLoader />}
    </div>
  );
};

export default RedirectQuest;
