import React from "react";
import {
  InstaContainedIcon,
  TwitterContainedIcon,
  TwitterIcon,
} from "../../../assets/svg";
import Banner from "../banner";
import QuestLeft from "../compLeft";
import QuestDescription from "../compLeft/description/description.js";

// Quest Right Component Imports ---------------------------------------------------------

import MemeContest from "../compRight/affiliate/affiliate";


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
    <div className="quest-layout flex-col px-2 py-8 md:p-8">

{/* Pass Banner Details Here --------------------------------------------------------------------- */}
          <div className="banner-wrapper px-3">
            {questtitle.map((details1) => {
              return <Banner title={details1} />;
            })}
            </div>

        <div className="quest flex flex-col-reverse gap-10 md:flex-row py-10 px-2">
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
        
{/* Share this Quest Here -------------------------------------------------------------------------- */}
{/* 
        <div className="social flex flex-row gap-8 items-center">
        <p className="qexpiry-title font-semibold underline underline-offset-4 text-cgreen-700 fs-15 pb-1">Share this quest </p>
        <div className="socials flex flex-row gap-2">
          <img src={InstaContainedIcon} className="social-icon p-3 rounded-xl"/>
          <img src={TwitterContainedIcon} className="social-icon p-3 rounded-xl "/>
        </div> 
        </div>
         */}
         
        </div>

        <div className="quest-details-2 flex flex-row w-full md:w-3/5 ">
        <MemeContest />
          </div>

        </div>

      <p className="footer px-5 fs-15 font-medium text-cgreen-700 opacity-40 text-center md:text-left">
        © Capx 2022. All rights reserved
      </p>
    </div>
  );
};

export default AnswerQuiz;
