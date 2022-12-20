import React, { useEffect, useState } from "react";
import Banner from "../banner";
import QuestLeft from "../compLeft";
import QuestDescription from "../compLeft/description/description.js";
import Modal from "../../../components/Modal/Modal";

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
import Profile from "../compRight/buildProfile/profile/Profile";



// Quest Right Component Imports End ---------------------------------------------------------


import QuestCompleteScreen from "../compRight/QuestComplete/QuestComplete";
import CongratulationModal from "../compRight/CongratulationModal/CongratulationModal";
import ErrorModal from "../compRight/errorModal/ErrorModal";
import ActionCompleteModal from "../compRight/actionConpleteModal/ActionCompleteModal";
import ConnectTwitter from "../compRight/buildProfile/connectTwitter/ConnectTwitter";
import ConnectDiscord from "../compRight/buildProfile/connectDiscord/ConnectDiscord";
import UploadPicture from "../compRight/buildProfile/uploadPicture/UploadPicture";

const AnswerQuiz = () => {
  const auth = useSelector((state) => state.auth.user);
  const questOrderId = useSelector((state) => state.quest.currentQuest.questId);
  const [url, setUrl] = useState(
    'https://capx-gateway-cnfe7xc8.uc.gateway.dev/'
  );
  const [questData, setQuestData] = useState(null);
  const [actionData, setActionData] = useState(null);
  const [openCongratulationModal, setOpenCongratulationModal] = useState(false);
  const [openActionCompleteModal, setOpenActionCompleteModel] = useState(false);
  const [isClaimQuest,setIsClaimQuest] = useState(false);
  const [showClaimScreen,setShowClaimScreen] = useState(false);
  const [showActionClaim,setShowActionClaim] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const { isPending, data, error } = useFirestoreCollection("xquest_order", [
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

  const handleActionCompleteDialog = () => {
    setOpenActionCompleteModel((prev) => (prev ? !prev : prev));
    setShowActionClaim((prev) => (prev ? !prev : prev));
  }

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
        case "updateFullName":
          return (
            <CreateName
              actionData={{ ...actionData,questID: questData.quest_id + "|" + auth.uid,handleCompleteAction: handleCompleteAction, claimRewardHandler:claimRewardHandler }}
            />
          );
        case "updateProfileImage":
          return (
            <UploadPicture
              actionData={{ ...actionData,questID: questData.quest_id + "|" + auth.uid,handleCompleteAction: handleCompleteAction, claimRewardHandler:claimRewardHandler }}
            />
          );
        case "linkTwitter":
          return (
            <ConnectTwitter
              actionData={{ ...actionData,questID: questData.quest_id + "|" + auth.uid,handleCompleteAction: handleCompleteAction, claimRewardHandler:claimRewardHandler }}
            />
          );
        case "linkDiscord":
          return (
            <ConnectDiscord
              actionData={{ ...actionData,questID: questData.quest_id + "|" + auth.uid,handleCompleteAction: handleCompleteAction, claimRewardHandler:claimRewardHandler }}
            />
          );
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
        case "Share_Invite_Code":
          return (
            <GenCodeStep2
              actionData={{ ...actionData,handleCompleteAction: handleCompleteAction }}
            />
          );
        case "Daily_Reward":
          return <DailyReward actionData={{...actionData,handleCompleteAction: handleCompleteAction,questID:questOrderId}}/>;
        default:
          return <p>No data</p>;
      }
    }
  };

  const claimRewardHandler = () => {
    console.log(questData?.quest_category);
    if(questData?.quest_category !== 'Build_Profile'){
      let apiDataObject = {
        data: { quest_order_id: questOrderId },
      };
      postData(apiDataObject, "/claimReward");
    }else if(questData?.quest_category === 'Build_Profile'){
      let apiDataObject = {
        data: { action_order_id: actionData.action_order_id },
      };
      setShowActionClaim(true);
      postData(apiDataObject, "/claimReward");
    } 
  }

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
      case "twitterVerify": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            tweet_url: input.value,
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
            name:input.value
          },
        };
        break;
      }
      case "profileImage": {
        apiDataObject = {
          data: {
            action_order_id: actionData.action_order_id,
            image_url:input.value
          },
        };
        break;
      }
      default:
        apiDataObject = {
          data: { action_order_id: actionData.action_order_id },
        };
    }
    postData(apiDataObject, "/completeAction");
  };

  const taskErrorReset = () => {
    console.log("error reset");
    setTaskError(null);
  };

  useEffect(() => {
    if (data) {
      setQuestData(data[0]);
      let actionData = []
      if(data[0].quest_category === "Daily_Reward"){
        actionData = Object.values(data[0].actions)
        .filter((val) => {
          return (val.action_order_status !== 'COMPLETED');
        })
      }else{
        actionData = Object.values(data[0].actions)
        .filter((val) => {
          return (val.is_claimed !== true);
        })
      }

     

      if(actionData.length === 0){
        console.log('All actions completed')
        if(isClaimQuest){
          console.log('show claim')
          setActionData([]);
          
        }else if(data[0].quest_type.toLowerCase() === 'special' && data[0].status.toLowerCase() === 'completed' ){
          setActionData({
            ...Object.values(data[0].actions).filter((val) => {
              return (val.action_order_status === 'COMPLETED');
            }).sort((a, b) => (a.action_id > b.action_id ? 1 : -1)).reverse()[0],
          });
        }else{
          console.log('show congrats');
          setOpenCongratulationModal(true);
        }
      }else{
        setActionData({
          ...actionData.sort((a, b) => (a.action_id > b.action_id ? 1 : -1))[0],
        });
      }
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (apiData && !showClaimScreen && !showActionClaim ) {
      console.log(apiData);
      //to-do:change succcess to success
      if (apiData.result.success === true) {
        if(actionData.length === 0){
          if(questData.quest_category === "Daily_Reward"){
            setOpenCongratulationModal(true);
          }else{
            setShowClaimScreen(true);
            setTaskError(false);
          }
        }else{
          setTaskError(null);
        }
        
      } else {
        setTaskError(true);
      }
    }else if(apiData && showClaimScreen && !isPending){
      if (apiData.result.success === true) {
        setOpenCongratulationModal(true);
      } else {
        setTaskError(true);
      }
    }else if(apiData && showActionClaim && !isPending){
      console.log(' claim result for action ');
      if(apiData.result.success === true) {
        setOpenActionCompleteModel(true);
      }else{
        setTaskError(true);
      }
    }
  }, [apiData]);

  return (
    <div className="quest-layout flex flex-col px-4 py-8 md:p-8 md:gap-0 gap-8 ">
      {/* Pass Banner Details Here --------------------------------------------------------------------- */}
      <div className="banner-wrapper md:px-3">
        {questData && (
          <Banner
            data={{
              title: questData.quest_title,
              rewards: questData.max_rewards,
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
                          id : details3.action_order_id,
                          title: details3.action_title,
                          actionnum: details3.action_id,
                          actiontag: details3.action_order_type,
                          completed:
                            details3.action_order_status === "COMPLETED"
                              ? true
                              : false,
                          actionBtn: details3.action_order_status,
                          currentActionId : actionData.action_order_id
                        }}
                        key={details3.action_order_id}
                      />
                    );
                  })}
            </div>
          }
        </div>

        <div className="quest-details-2 flex flex-col">
          {taskError === null && !showClaimScreen && questData && renderActionComponent()}
          {showClaimScreen && actionData.length === 0 && <QuestCompleteScreen modalAction={{claimReward:claimRewardHandler}}/>}
          {/* {taskError === false && <SuccessMsg errorReset={taskErrorReset} />}
          {taskError === true && <FailureMsg errorReset={taskErrorReset} />} */}

          <CongratulationModal
            open={openCongratulationModal}
            handleClose={handleCongratulationModal}
            rewards = {questData?.max_rewards}
          />

          <ActionCompleteModal
            open={openActionCompleteModal}
            handleClose={handleActionCompleteDialog}
          />

          <ErrorModal
            open={taskError === true ? true : false}
            handleClose={taskErrorReset}
          />
        </div>
      </div>

      {apiIsPending && <Modal />}
    </div>
  );
};

export default AnswerQuiz;
