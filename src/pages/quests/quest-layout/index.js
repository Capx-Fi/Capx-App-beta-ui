import React, { useEffect, useState } from "react";
import {
  InstaContainedIcon,
  TwitterContainedIcon,
  TwitterIcon,
} from "../../../assets/svg";
import Banner from "../banner";
import QuestLeft from "../compLeft";
import QuestDescription from "../compLeft/description/Description.js";
import Modal from "../../../components/Modal/Modal";

// Day 01 Quest Imports ---------------------------------------------------------

import DailyReward from "../compRight/dailyReward/dailyRewards"; // [Day1]-Task 0
import WatchVideo from "../compRight/watchvideo/watchvideo"; // [Day1]-Task 1 & Task 2
import SingleQuiz from "../compRight/singleQuiz/singleQuiz"; // [Day1]-Task 1 & Task 2
import GenCodeStep1 from "../compRight/inviteCode/CodeStep1/CodeStep1"; // [Day1]-Task 3
import GenCodeStep2 from "../compRight/inviteCode/CodeStep2/CodeStep2"; // [Day1]-Task 3
//import BuildProfile from "../compRight/buildProfile/buildProfile"; // [Day1]-Task 4
import TweetStep1 from "../compRight/tweetfromAcc/tweetstep1/tweetstep1"; // [Day1]-Task 5
import TweetStep2 from "../compRight/tweetfromAcc/tweetstep2/tweetstep2"; // [Day1]-Task 5
import Affiliate from "../compRight/affiliate/affiliate"; // [Day1]-Task 6
import QuestComplete from "../compRight/questComplete/QuestComplete";
import CongratulationModal from "../compRight/congratulationModal/CongratulationModal";
import ErrorModal from "../compRight/errorModal/ErrorModal";
import ActionCompleteModal from "../compRight/actionCompleteModal/ActionCompleteModal";
import ConnectTwitter from "../compRight/buildProfile/connectTwitter/ConnectTwitter";
import ConnectDiscord from "../compRight/buildProfile/connectDiscord/ConnectDiscord";
import UpdateProfileImage from "../compRight/buildProfile/updateProfileImage/UpdateProfileImage";


import SuccessMsg from "../compRight/success/success"; // Success-Message
import FailedMsg from "../compRight/failure/failure"; // Failure-Message




import { useFirestoreCollection } from "../../../hooks/useFirestoreCollection";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useApi } from "../../../hooks/useApi";

// Quest Right Component Imports End ---------------------------------------------------------

const AnswerQuiz = () => {
  const routeData = useLocation();
  console.log(routeData.state);
  const auth = useSelector((state) => state.auth.user);
  const questOrderId = useSelector((state) => state.quest.currentQuest.questId);
  const [url, setUrl] = useState(
    "https://capx-gateway-cnfe7xc8.uc.gateway.dev"
  );
  const [questData, setQuestData] = useState(null);
  const [actionData, setActionData] = useState(null);
  const [openCongratulationModal, setOpenCongratulationModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const { isPending, data, error } = useFirestoreCollection("quest_order", [
    "quest_order_id",
    "==",
    questOrderId,
  ]);
  const {
    isError,
    isPending: apiIsPending,
    postData,
    data: apiData,
  } = useApi(url, "POST");
  const [taskError, setTaskError] = useState(null);

  const handleCongratulationModal = () => {
    setOpenCongratulationModal((prev) => (prev ? !prev : prev));
  };

  const handleErrornModal = () => {
    setOpenErrorModal((prev) => (prev ? !prev : prev));
  };


  const renderActionComponent = () => {
    if (data && actionData && questData) {
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
        // case "CheckProfile":
        //   return (
        //     <BuildProfile
        //       actionData={{ handleCompleteAction: handleCompleteAction }}
        //     />
        //   );
        case "Social_Twitter":
          return (
            <TweetStep1
              actionData={{ handleCompleteAction: handleCompleteAction }}
            />
          );
        case "Social_Twitter_Verify":
          return (
            <TweetStep2
              actionData={{ handleCompleteAction: handleCompleteAction }}
            />
          );
        case "Generate_Invite_Code":
          return (
            <GenCodeStep1
              actionData={{ handleCompleteAction: handleCompleteAction }}
            />
          );
        case "Verify_Invite_Code":
          return (
            <GenCodeStep2
              actionData={{ handleCompleteAction: handleCompleteAction }}
            />
          );
        case "Daily_Rewards":
          return <DailyReward />;
        default:
          return <p>No data</p>;
      }
    }
  };

  const handleCompleteAction = (e, input) => {
    if (e !== null) {
      e.preventDefault();
    }
    let apiDataObject = {
      data: { action_order_id: actionData.action_order_id },
    };
    console.log(input);
    switch (input.type) {
      case "singleQuiz": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            answer: input.value,
          },
        };
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
      case "twitterVerify": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            answer: input.value,
          },
        };
        break;
      }
      default:
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
    }
    postData(apiDataObject, "/completeUserAction");
  };

  const taskErrorReset = () => {
    console.log("error reset");
    setTaskError(null);
  };

  useEffect(() => {
    if (data) {
      console.log(
        Object.values(data[0].actions).sort((a, b) =>
          a.action_id > b.action_id ? 1 : -1
        )
      );
      setQuestData(data[0]);

      setActionData({
        ...Object.values(data[0].actions)
          .filter((val) => {
            return val.action_order_status !== "COMPLETED";
          })
          .sort((a, b) => (a.action_id > b.action_id ? 1 : -1))[0],
      });
      console.log(actionData);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (apiData) {
      console.log(apiData);
      if (apiData.result.success === true) {
        setTaskError(false);
      } else {
        setTaskError(true);
      }
    }
    console.log(taskError);
  }, [apiData]);

  return (
    <div className="quest-layout flex-col px-2 py-8 md:p-8 ">
      {/* Pass Banner Details Here --------------------------------------------------------------------- */}
      <div className="banner-wrapper px-3">
        {questData && (
          <Banner
            data={{
              title: questData.quest_title,
              rewards: questData.max_rewards,
            }}
          />
        )}
      </div>

      <div className="quest flex flex-col-reverse gap-10 md:flex-row py-10 px-2 ">
        <div className="quest-details-1 px-5 w-full md:w-2/5">
          {/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

          {questData && (
            <QuestDescription
              primarydetails={{
                qdescription: questData.quest_description,
                qexpiry: questData.quest_end_date,
              }}
            />
          )}

          {/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

          {
            <div className="qabout flex flex-col pb-5">
              <p className="qexpiry-title font-semibold underline underline-offset-4 text-cgreen-700 fs-15 pb-1">
                Actions
              </p>
              {questData &&
                Object.values(questData.actions)
                  .sort((a, b) => (a.action_id > b.action_id ? 1 : -1))
                  .map((details3) => {
                    return (
                      <QuestLeft
                        data={{
                          title: details3.action_title,
                          actionnum: details3.action_id,
                          actiontag: details3.action_order_type,
                          completed:
                            details3.action_order_status === "COMPLETED"
                              ? true
                              : false,
                          actionBtn: details3.action_order_status,
                        }}
                      />
                    );
                  })}
            </div>
          }
        </div>

        <div className="quest-details-2 flex flex-row w-full md:w-3/5 ">
          {taskError === null && questData && renderActionComponent()}
          <CongratulationModal
            open={openCongratulationModal}
            handleClose={handleCongratulationModal}
          />

          <ErrorModal
            open={taskError === true ? true : false}
            handleClose={taskErrorReset}
          />
        </div>
      </div>

      {apiIsPending && <Modal />}

      <p className="footer px-5 fs-15 font-medium text-cgreen-700 opacity-40 text-center md:text-left">
        © Capx 2022. All rights reserved
      </p>
    </div>
  );
};

export default AnswerQuiz;
