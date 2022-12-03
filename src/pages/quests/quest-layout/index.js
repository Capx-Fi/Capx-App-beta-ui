import React, { useEffect, useState } from "react";
import {InstaContainedIcon, TwitterContainedIcon, TwitterIcon,} from "../../../assets/svg";
import Banner from "../banner";
import QuestLeft from "../compLeft";
import QuestDescription from "../compLeft/description/description.js";

// Day 01 Quest Imports ---------------------------------------------------------

import DailyReward from "../compRight/dailyReward/dailyRewards"; // [Day1]-Task 0
import WatchVideo from "../compRight/watchvideo/watchvideo"; // [Day1]-Task 1 & Task 2
import SingleQuiz from "../compRight/singleQuiz/singleQuiz"; // [Day1]-Task 1 & Task 2
import GenCodeStep1 from "../compRight/inviteCode/CodeStep1/CodeStep1"; // [Day1]-Task 3
import GenCodeStep2 from "../compRight/inviteCode/CodeStep2/CodeStep2"; // [Day1]-Task 3
import BuildProfile from "../compRight/buildProfile/buildProfile"; // [Day1]-Task 4
import TweetStep1 from "../compRight/tweetfromAcc/tweetstep1/tweetstep1"; // [Day1]-Task 5
import TweetStep2 from "../compRight/tweetfromAcc/tweetstep2/tweetstep2"; // [Day1]-Task 5
import Affiliate from "../compRight/affiliate/affiliate"; // [Day1]-Task 6
import SuccessMsg from "../compRight/success/success"; // Success-Message
import FailedMsg from "../compRight/failure/failure"; // Failure-Message
import { useFirestoreCollection } from "../../../hooks/useFirestoreCollection";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



// Quest Right Component Imports End ---------------------------------------------------------



const AnswerQuiz = () => {
  const routeData = useLocation();
  console.log(routeData.state);
  const auth = useSelector((state)=>state.auth.user);
  const [questData,setQuestData] = useState(null);
  const [actionData,setActionData] = useState(null);
  const {isPending,data,error} = useFirestoreCollection("quest_order",["quest_order_id","==",routeData.state.questID+"|"+auth.uid])

  const renderActionComponent = ()=>{
    if(data && actionData && questData){
      console.log(actionData);
      switch(actionData.action_order_type){
        case "Video" : return <WatchVideo actionData={{...actionData,questID:questData.quest_id+"|"+auth.uid}} />;
        case "Quiz" : return <SingleQuiz actionData={{...actionData,questID:questData.quest_id+"|"+auth.uid}} />;
        case "Notify" : return <Affiliate/>;
        case "CheckProfile": return <BuildProfile/>;
        case "Social_Twitter": return <TweetStep1/>;
        case "Generate_Invite_Code": return <GenCodeStep1/>;
        case "Daily_Rewards": return <DailyReward/>;
        default : return <p>No data</p>;
      }
    }
  }

  useEffect(()=>{
    if(data){
      console.log(Object.values(data[0].actions).filter((val)=>{return val.status !== 'COMPLETED'}));
      setQuestData(data[0]);
      setActionData({...Object.values(data[0].actions).filter((val)=>{return val.status !== 'COMPLETED'})[0]});
      console.log(actionData)
    }else if(error){
      console.log(error)
    }
  },[data,error])

  return (
    <div className="quest-layout flex-col px-2 py-8 md:p-8 ">

{/* Pass Banner Details Here --------------------------------------------------------------------- */}
          <div className="banner-wrapper px-3">
            
          
               {questData && <Banner data={{title:questData.quest_title,rewards:questData.max_rewards}} />}
            
            
            </div>

        <div className="quest flex flex-col-reverse gap-10 md:flex-row py-10 px-2 ">
          <div className="quest-details-1 px-5 w-full md:w-2/5">

{/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

{questData && <QuestDescription primarydetails={{qdescription:questData.quest_description,qexpiry:questData.quest_end_date}} />}

{/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

        <div className="qabout flex flex-col pb-5">
            <p className="qexpiry-title font-semibold underline underline-offset-4 text-cgreen-700 fs-15 pb-1">Actions</p>
            {questData && Object.values(questData.actions).map((details3) => {
                  return <QuestLeft data={{title:details3.action_title,actionnum:details3.action_id,actiontag:details3.action_order_type,completed:details3.action_order_status === 'COMPLETED' ?true:false,actionBtn:details3.action_order_status}} />;
                })}
        </div>
         
        </div>

        <div className="quest-details-2 flex flex-row w-full md:w-3/5 ">
        {questData && renderActionComponent()}
          </div>

        </div>

      <p className="footer px-5 fs-15 font-medium text-cgreen-700 opacity-40 text-center md:text-left">
        © Capx 2022. All rights reserved
      </p>
    </div>
  );
};

export default AnswerQuiz;
