import React from "react";
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



// Quest Right Component Imports End ---------------------------------------------------------

const questdescript = [
    {
        qdescription: "To complete this task you will have to watch this small video clip, as you understand what is Capx App, why it exists and how you can leverage the power of community and learning to earn rewards and grow together with your community members. Then answer a simple question to claim your xCapx tokens!",
        qexpiry: "12th November, 2022",

    }
];

const questtitle = [
    {
      qtitle: "What is Capx App?",
      qreward: "2 xCapx",
    }
];

const questDetails = [
  {
    actionnum: "#1",
    actiontitle: "What is Capx App ?",
    actiontag: "video",
    actionBtn: "ongoing",
    completed: false,
  },

  {
    actionnum: "#2",
    actiontitle: "What is Capx App ?",
    actiontag: "quiz",
    actionBtn: "start now",
    completed: false,
  },
];

const AnswerQuiz = () => {
  return (
    <div className="quest-layout flex-col px-2 py-8 md:p-8 ">

{/* Pass Banner Details Here --------------------------------------------------------------------- */}
          <div className="banner-wrapper px-3">
            {questtitle.map((details1) => {
              return <Banner title={details1} />;
            })}
            </div>

        <div className="quest flex flex-col-reverse gap-10 md:flex-row py-10 px-2 ">
          <div className="quest-details-1 px-5 w-full md:w-2/5">

{/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

            {questdescript.map((details2) => {
              return <QuestDescription primarydetails={details2} />;
            })}

{/* Pass Description & Expiry Details Here --------------------------------------------------------- */}

        <div className="qabout flex flex-col pb-5">
            <p className="qexpiry-title font-semibold underline underline-offset-4 text-cgreen-700 fs-15 pb-1">Actions</p>
            {questDetails.map((details3) => {
                  return <QuestLeft details={details3} />;
                })}
        </div>
         
        </div>

        <div className="quest-details-2 flex flex-row w-full md:w-3/5 ">
        <FailedMsg />
          </div>

        </div>

      <p className="footer px-5 fs-15 font-medium text-cgreen-700 opacity-40 text-center md:text-left">
        © Capx 2022. All rights reserved
      </p>
    </div>
  );
};

export default AnswerQuiz;
