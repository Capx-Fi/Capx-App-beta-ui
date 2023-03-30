import React, { useEffect, useState } from "react";
import Banner from "../banner";
import QuestLeft from "../compLeft";
import QuestDescription from "../compLeft/description/description.js";
import Modal from "../../../components/Modal/Modal";
import { analytics } from "../../../firebase/firebase";
import { logEvent } from "firebase/analytics";

// Day 01 Quest Imports ---------------------------------------------------------

import DailyReward from "../compRight/dailyReward/dailyRewards"; // [Day1]-Task 0
import WatchVideo from "../compRight/watchvideo/watchvideo"; // [Day1]-Task 1 & Task 2
import SingleQuiz from "../compRight/singleQuiz/singleQuiz"; // [Day1]-Task 1 & Task 2
import GenCodeStep1 from "../compRight/inviteCode/CodeStep1/CodeStep1"; // [Day1]-Task 3
import GenCodeStep2 from "../compRight/inviteCode/CodeStep2/CodeStep2"; // [Day1]-Task 3
import CreateName from "../compRight/buildProfile/createName/CreateName"; // [Day1]-Task 4
import TweetStep1 from "../compRight/tweetfromAcc/tweetstep1/tweetstep1"; // [Day1]-Task 5
import TweetStep2 from "../compRight/tweetfromAcc/tweetstep2/tweetstep2"; // [Day1]-Task 5
import Affiliate from "../compRight/affiliate/affiliate"; // [Day1]-Task 6
import { useFirestoreCollection } from "../../../hooks/useFirestoreCollection";
import { useSelector } from "react-redux";
import { useApi } from "../../../hooks/useApi";
import { useLinkAuthProviders } from "../../../hooks/useLinkAuthProviders";
import Profile from "../compRight/buildProfile/profile/Profile";

// Quest Right Component Imports End ---------------------------------------------------------

import QuestCompleteScreen from "../compRight/questComplete/QuestComplete";
import CongratulationModal from "../compRight/congratulationModal/CongratulationModal";
import ErrorModal from "../compRight/errorModal/ErrorModal";
import ActionCompleteModal from "../compRight/actionConpleteModal/ActionCompleteModal";
import ConnectTwitter from "../compRight/buildProfile/connectTwitter/ConnectTwitter";
import ConnectDiscord from "../compRight/buildProfile/connectDiscord/ConnectDiscord";
import UploadPicture from "../compRight/buildProfile/uploadPicture/UploadPicture";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuestOrderId } from "../../../store/slices/questSlice";
import { config } from "../../../config";
import TopLoader from "../../../components/topLoader/TopLoader";
import CapxBlog from "../compRight/capxBlog/CapxBlog";
import WriteArticle from "../compRight/writeArticle/WriteArticle1";
import WriteArticle2 from "../compRight/writeArticle/WriteArticle2";
import WeeklyFeedback from "../compRight/weeklyFeedback/WeeklyFeedback";
import AlphavDrop from "../compRight/alphaAirdrop/AlphaAirdrop";
import ConnectWallet from "../compRight/connectWallet/ConnectWallet";
import RedirectQuest from "../compRight/redirectQuest/RedirectQuest";

const AnswerQuiz = () => {
  const routeParams = useParams();
  const auth = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.user);
  const allQuestData = useSelector((state) => state.quest.allQuests);
  // const questOrderId = useSelector((state) => state.quest.currentQuest.questId);
  const [url, setUrl] = useState(config.API_URL);
  const [questData, setQuestData] = useState(null);
  const [questID, setQuestID] = useState(null);
  const [actionData, setActionData] = useState(null);
  const [currentActionData, setCurrentActionData] = useState(null);
  const [openCongratulationModal, setOpenCongratulationModal] = useState(false);
  const [
    openDailyQuestCongratulationModal,
    setOpenDailyQuestCongratulationModal,
  ] = useState(false);
  const [
    dailyQuestCongratulationsModalText,
    setDailyQuestCongratulationsModalText,
  ] = useState("");
  const [
    dailyQuestCongratulationsModalHeading,
    setDailyQuestCongratulationsModalHeading,
  ] = useState("");
  const [openActionCompleteModal, setOpenActionCompleteModel] = useState(false);
  const [isClaimQuest, setIsClaimQuest] = useState(false);
  const [showClaimScreen, setShowClaimScreen] = useState(false);
  const [showActionClaim, setShowActionClaim] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [errorModalHeading, setErrorModalHeading] = useState(null);
  const [errorModalMessage, setErrorModalMessage] = useState(null);
  const [reFetchInProgress, setReFetchInProgress] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPending, data, error, reFetchData } = useFirestoreCollection(
    config.QUEST_ORDER_COLLECTION,
    ["__name__", "==", routeParams.questID]
  );
  const {
    error: isError,
    isPending: apiIsPending,
    postData,
    data: apiData,
  } = useApi(url, "POST");

  const {
    unlinkWithSocail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
    linkDone: linkDone,
  } = useLinkAuthProviders();
  const [taskError, setTaskError] = useState(null);

  const handleCongratulationModal = () => {
    navigate("/");
    setOpenCongratulationModal((prev) => (prev ? !prev : prev));
  };

  const handleErrornModal = () => {
    setOpenErrorModal((prev) => (prev ? !prev : prev));
  };

  const handleActionCompleteDialog = () => {
    setOpenActionCompleteModel((prev) => (prev ? !prev : prev));
    setShowActionClaim((prev) => (prev ? !prev : prev));
  };

  const nextQuestSetup = () => {
    const newQuestData = allQuestData.filter((val) => {
      if (val.status === "new" && val.id !== questData.quest_id) {
        if (val.allowed_users.length > 0) {
          return val.allowed_users.includes(userData.username);
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    if (newQuestData.length > 0) {
      setQuestID(newQuestData[0].id);
      setReFetchInProgress(true);
      setOpenCongratulationModal(false);
      setShowClaimScreen(false);
      setShowActionClaim(false);
      setIsClaimQuest(false);
      logEvent(analytics, "QUEST_REGISTRATION_ATTEMPT", {
        questID: newQuestData[0].id,
        user: auth.uid,
      });
      const apiDataObject = { data: { questId: newQuestData[0].id } };
      postData(apiDataObject, "/registerForQuest");
    } else {
      navigate("/");
    }
  };

  const renderActionComponent = () => {
    if (actionData && questData) {
      switch (actionData.action_order_type) {
        case "Video":
          return (
            <WatchVideo
              actionData={{
                ...actionData,
                questID: questData.quest_id + "|" + auth.uid,
                handleCompleteAction: handleCompleteAction,
              }}
            />
          );
        case "Quiz":
          return (
            <SingleQuiz
              actionData={{
                ...actionData,
                questID: questData.quest_id + "|" + auth.uid,
                handleCompleteAction: handleCompleteAction,
              }}
            />
          );
        case "Notify":
          return (
            <Affiliate
              actionData={{ handleCompleteAction: handleCompleteAction }}
            />
          );
        case "updateFullName":
          return (
            <CreateName
              actionData={{
                ...actionData,
                questID: questData.quest_id + "|" + auth.uid,
                handleCompleteAction: handleCompleteAction,
                claimRewardHandler: claimRewardHandler,
              }}
            />
          );
        case "updateProfileImage":
          return (
            <UploadPicture
              actionData={{
                ...actionData,
                questID: questData.quest_id + "|" + auth.uid,
                handleCompleteAction: handleCompleteAction,
                claimRewardHandler: claimRewardHandler,
              }}
            />
          );
        case "linkTwitter":
          return (
            <ConnectTwitter
              actionData={{
                ...actionData,
                questID: questData.quest_id + "|" + auth.uid,
                handleCompleteAction: handleCompleteAction,
                claimRewardHandler: claimRewardHandler,
              }}
            />
          );
        case "linkDiscord":
          return (
            <ConnectDiscord
              actionData={{
                ...actionData,
                questID: questData.quest_id + "|" + auth.uid,
                handleCompleteAction: handleCompleteAction,
                claimRewardHandler: claimRewardHandler,
              }}
            />
          );
        case "Social_Twitter":
          return (
            <TweetStep1
              actionData={{
                handleCompleteAction: handleCompleteAction,
              }}
            />
          );
        case "Social_Twitter_Verify":
          return (
            <TweetStep2
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "Generate_Invite_Code":
          return (
            <GenCodeStep1
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
              }}
            />
          );
        case "Generate_OG_Invite_Code":
          return (
            <GenCodeStep1
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
              }}
            />
          );
        case "Share_Invite_Code":
          return (
            <GenCodeStep2
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
              }}
            />
          );
        case "Daily_Reward":
          return (
            <DailyReward
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "Alpha_AirDrop":
          return (
            <AlphavDrop
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "Blog":
          return (
            <CapxBlog
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "Info":
          return (
            <WriteArticle
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "SubmitForReview":
          return (
            <WriteArticle2
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "FeedbackForm":
          return (
            <WeeklyFeedback
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "Verify_OnChain":
          return (
            <RedirectQuest
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        case "Harbor_AirDrop":
          return (
            <ConnectWallet
              actionData={{
                ...actionData,
                handleCompleteAction: handleCompleteAction,
                questID: routeParams.questID,
              }}
            />
          );
        default:
          return <p>No data</p>;
      }
    }
  };

  useEffect(() => {
    renderActionComponent();
  }, [actionData]);

  const claimRewardHandler = () => {
    if (questData?.quest_category !== "Build_Profile") {
      logEvent(analytics, "QUEST_CLAIM_ATTEMPT", {
        questOrderId: routeParams.questID,
        questType: questData.quest_category,
        user: auth.uid,
      });
      let apiDataObject = {
        data: { quest_order_id: routeParams.questID },
      };
      postData(apiDataObject, "/claimReward");
    } else if (questData?.quest_category === "Build_Profile") {
      logEvent(analytics, "QUEST_ACTION_CLAIM_ATTEMPT", {
        questOrderId: routeParams.questID,
        questType: questData.quest_category,
        user: auth.uid,
        action_order_id: actionData.action_order_id,
      });
      let apiDataObject = {
        data: { action_order_id: actionData.action_order_id },
      };
      setShowActionClaim(true);
      postData(apiDataObject, "/claimReward");
    }
  };

  const handleCompleteAction = (e, input) => {
    if (e !== null) {
      e.preventDefault();
    }
    let apiDataObject;
    logEvent(analytics, "QUEST_ACTION_COMPLETE_ATTEMPT", {
      questOrderId: routeParams.questID,
      questType: questData.quest_category,
      user: auth.uid,
      actionType: actionData.action_order_type,
      value:
        input.value != null || input.value != undefined
          ? input.value
          : "no value",
      action_order_id: actionData.action_order_id,
    });
    setCurrentActionData(actionData);
    switch (input.type) {
      case "singleQuiz": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            answer: input.value,
          },
        };
        setIsClaimQuest(true);
        break;
      }
      case "video": {
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
        break;
      }
      case "inviteCode": {
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };

        break;
      }
      case "affiliate": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            email: input.value,
          },
        };
        break;
      }
      case "profile": {
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
        break;
      }
      case "twitterCopy": {
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
        break;
      }
      case "verifyTweet": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            tweet_url: input.value,
          },
        };
        setIsClaimQuest(true);
        break;
      }
      case "twitterVerify": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
          },
        };
        setIsClaimQuest(true);
        break;
      }
      case "dailyReward": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
          },
        };
        break;
      }
      case "buildProfileName": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            name: input.value,
          },
        };
        break;
      }
      case "profileImage": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            image_url: input.value,
          },
        };
        break;
      }
      case "connectTwitter": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
          },
        };
        break;
      }
      case "submitDocLink": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            doc_link: input.value,
          },
        };
        break;
      }
      case "submitFeedback": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            answers: input.value.answers,
            comment: input.value.comment,
          },
        };
        break;
      }
      case "harborAirdrop": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            comdex_address: input.value.address,
          },
        };
        // setIsClaimQuest(true);
        break;
      }
      case "Verify_OnChain": {
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
        setIsClaimQuest(true);
        break;
      }
      default:
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
    }
    if (input.accessToken && input.accessToken.length > 0) {
      postData(apiDataObject, "/completeAction", input.accessToken);
    } else {
      postData(apiDataObject, "/completeAction");
    }
  };

  const taskErrorReset = () => {
    setTaskError(null);
    // setErrorModalHeading(null);
  };

  useEffect(() => {
    if (data) {
      setQuestData(data[0]);
      logEvent(analytics, "QUEST_OPENED", {
        questOrderId: routeParams.questID,
        questType: data[0].quest_category,
        user: auth.uid,
      });
      let actionsData = [];
      if (data[0].quest_category === "Daily_Reward") {
        actionsData = Object.values(data[0].actions).filter((val) => {
          return val.action_order_status !== "COMPLETED";
        });
      } else {
        actionsData = Object.values(data[0].actions).filter((val) => {
          return val.is_claimed !== true;
        });
      }
      if (actionsData.length === 0) {
        console.log("All actions completed");
        if (isClaimQuest) {
          setActionData(null);
        } else if (
          data[0].quest_type.toLowerCase() === "special" &&
          data[0].status.toLowerCase() === "claimed"
        ) {
          setActionData({
            ...Object.values(data[0].actions)
              .filter((val) => {
                return val.action_order_status === "COMPLETED";
              })
              .sort((a, b) => (a.action_id > b.action_id ? 1 : -1))
              .reverse()[0],
          });
        } else if (
          data[0].quest_type.toLowerCase() !== "special" &&
          data[0].status.toLowerCase() === "completed"
        ) {
          setShowClaimScreen(true);
          setActionData(null);
        } else if (
          data[0].quest_type.toLowerCase() === "special" &&
          data[0].status.toLowerCase() === "completed"
        ) {
          setShowClaimScreen(true);
          setActionData(null);
        } else if (data[0].quest_category === "Daily_Reward") {
          setDailyQuestCongratulationsModalText(apiData?.result.message);
          setOpenDailyQuestCongratulationModal(true);
        } else {
          setOpenCongratulationModal(true);
        }
      } else {
        setActionData({
          ...actionsData.sort((a, b) =>
            a.action_id > b.action_id ? 1 : -1
          )[0],
        });
      }
      if (reFetchInProgress === true) {
        setReFetchInProgress(false);
      }
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);
  useEffect(() => {
    if (!apiIsPending) {
      if (apiData && !isError) {
        if (!showClaimScreen && !showActionClaim && !reFetchInProgress) {
          if (apiData.result.success === true) {
            logEvent(analytics, "QUEST_ACTION_COMPLETE_SUCCESS", {
              questOrderId: routeParams.questID,
              questType: questData.quest_category,
              user: auth.uid,
              actionType: currentActionData.action_order_type,
              action_order_id: currentActionData.action_order_id,
            });
            if (apiData?.result?.message.includes("|")) {
              const modalData = apiData?.result?.message.split("|");
              setDailyQuestCongratulationsModalHeading(modalData[0]);
              setDailyQuestCongratulationsModalText(modalData[1]);
            }

            if (!actionData) {
              if (questData.quest_category === "Daily_Reward") {
                setOpenDailyQuestCongratulationModal(true);
              } else {
                setShowClaimScreen(true);
              }
            } else {
              if (
                questData.quest_category === "OG_Invite_Code" ||
                questData.quest_category === "Invite_Code" ||
                questData.quest_category === "Alpha_AirDrop"
              ) {
                setOpenCongratulationModal(true);
              } else if (
                (questData.quest_category === "Build_Profile" ||
                  questData.quest_category === "Harbor_AirDrop") &&
                questData.status === "CLAIMED"
              ) {
                setOpenCongratulationModal(true);
              }
            }
          }
        } else if (showClaimScreen && !isPending && !reFetchInProgress) {
          if (apiData.result.success === true) {
            logEvent(analytics, "QUEST_CLAIM_COMPLETE_SUCCESS", {
              questOrderId: routeParams.questID,
              questType: questData.quest_category,
              user: auth.uid,
              actionType: currentActionData.action_order_type,
              action_order_id: currentActionData.action_order_id,
            });
            if (questData.quest_category !== "Feedback") {
              setOpenCongratulationModal(true);
            }
          }
        } else if (showActionClaim && !isPending && !reFetchInProgress) {
          logEvent(analytics, "QUEST_ACTION_COMPLETE_SUCCESS", {
            questOrderId: routeParams.questID,
            questType: questData.quest_category,
            user: auth.uid,
            actionType: currentActionData.action_order_type,
            action_order_id: currentActionData.action_order_id,
          });
          if (apiData.result.success === true) {
            setOpenActionCompleteModel(true);
          }
        } else if (reFetchInProgress) {
          if (apiData.result.success === true) {
            logEvent(analytics, "QUEST_REGISTRATION_SUCCESS", {
              questID: questID,
              user: auth.uid,
              questOrder: apiData.result.quest_order_id,
            });
            dispatch(
              setQuestOrderId({ questId: apiData.result.quest_order_id })
            );
            reFetchData({
              status: true,
              data: ["__name__", "==", apiData.result.quest_order_id],
            });
            navigate(`/quest/${apiData.result.quest_order_id}`);
          }
        }
      } else if (apiData && isError) {
        if (apiData.result.success === false) {
          console.log(apiData.result?.message.includes("|"));
          if (apiData.result?.message.includes("|")) {
            const errorModalData = apiData.result?.message.split("|");
            setErrorModalHeading(errorModalData[0]);
            setErrorModalMessage(errorModalData[1]);
          } else {
            setErrorModalHeading(apiData.result?.message);
          }
          if (
            apiData.result?.message ===
            "ERROR: Twitter already linked to different user"
          ) {
            unlinkWithSocail("twitter");
          }
        }
        setTaskError(true);
      } else if (isError) {
        console.log(isError);
        if (isError === "unexpected_error") {
          navigate("/");
        }
        setTaskError(true);
      }
    }
  }, [apiData, apiIsPending, isError]);

  return (
    <div className="quest-layout flex flex-col px-4 py-8 md:p-8 md:gap-0 gap-8 ">
      {/* Pass Banner Details Here --------------------------------------------------------------------- */}
      <div className="banner-wrapper md:px-3">
        {questData && (
          <Banner
            data={{
              title: questData.quest_title,
              rewards: questData.max_rewards,
              rewards_type: questData.rewards_type,
            }}
          />
        )}
      </div>

      <div className="quest flex flex-col-reverse gap-10 md:gap-0 md:flex-row md:py-10 md:px-2 ">
        <div className="quest-details-1 flex flex-col md:gap-16 gap-12 md:px-5">
          {/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

          {true && (
            <QuestDescription
              primarydetails={{
                qdescription: questData?.quest_description,
                qexpiry: questData?.quest_end_date,
              }}
            />
          )}

          {/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

          {
            <div className="qabout flex flex-col gap-3 pb-5">
              <p className="qexpiry-title action-heading font-semibold underline underline-offset-4 text-cgreen-700 pb-1">
                Actions
              </p>

              {questData &&
                Object.values(questData.actions)
                  .sort((a, b) => (a.action_id > b.action_id ? 1 : -1))
                  .map((details3) => {
                    return (
                      <QuestLeft
                        data={{
                          actiondata: details3,
                          id: details3.action_order_id,
                          title: details3.action_order_left_title,
                          actionnum: details3.action_id,
                          actiontag: details3.action_tag,
                          completed:
                            details3.action_order_status === "COMPLETED"
                              ? true
                              : false,
                          actionBtn: details3.action_order_status,
                          currentActionId: actionData?.action_order_id,
                        }}
                        key={details3.action_order_id}
                      />
                    );
                  })}
            </div>
          }
        </div>

        <div className="quest-details-2 flex flex-col">
          {taskError === null &&
            !showClaimScreen &&
            questData &&
            actionData &&
            renderActionComponent()}
          {showClaimScreen && !actionData && (
            <QuestCompleteScreen
              modalAction={{ claimReward: claimRewardHandler }}
            />
          )}

          {showProfilePage && actionData.length === 0 && <Profile />}

          {openCongratulationModal && (
            <CongratulationModal
              open={openCongratulationModal}
              modalText={
                questData?.max_rewards == 0
                  ? `You have successfully completed the quest. Keep learning! Keep earning!`
                  : `You have earned ${questData?.max_rewards} ${
                      questData.rewards_type === "IOU" ? " xCapx" : " xHARBOR"
                    } tokens as reward for
                  successfully completing the quest`
              }
              leftButton={{ text: "Next Quest", handler: nextQuestSetup }}
              rightButton={{
                text: "Go To Home",
                handler: handleCongratulationModal,
              }}
            />
          )}

          {openDailyQuestCongratulationModal && (
            <CongratulationModal
              open={
                openDailyQuestCongratulationModal &&
                !!dailyQuestCongratulationsModalText
              }
              heading={dailyQuestCongratulationsModalHeading}
              modalText={dailyQuestCongratulationsModalText}
              leftButton={{
                text: "Go To Home",
                handler: handleCongratulationModal,
              }}
              rightButton={{
                text: "Go To Wallet",
                handler: () => {
                  navigate("/my-wallet");
                },
              }}
            />
          )}

          <ActionCompleteModal
            open={openActionCompleteModal}
            handleClose={handleActionCompleteDialog}
          />

          <ErrorModal
            open={taskError === true ? true : false}
            heading={errorModalHeading}
            handleClose={taskErrorReset}
            message={errorModalMessage}
          />
        </div>
      </div>

      {apiIsPending && <TopLoader />}
    </div>
  );
};

export default AnswerQuiz;
