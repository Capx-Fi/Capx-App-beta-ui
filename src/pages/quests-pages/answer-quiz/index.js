import React from "react";
import {
  InstaContainedIcon,
  TwitterContainedIcon,
  TwitterIcon,
} from "../../../assets/svg";
import ActionCard from "../components/action-card";
import Banner from "../components/banner";
import { HiArrowRight } from "react-icons/hi";

const actionCardDetails = [
  {
    title: "What is Capx App ?",
    tag: "video",
    btnText: "ongoing",
    completed: true,
  },
  {
    title: "What is Capx App ?",
    tag: "quiz",
    btnText: "start now",
    completed: false,
  },
];

const AnswerQuiz = () => {
  return (
    <div className="quest-layout answer-quiz-page">
      <Banner />
      <div className="quest flex my-6">
        <div className="quest-details p-5">
          <div className="discription-box mb-10">
            <h3 className="task-heading mb-3 ">Description</h3>
            <p className="task-text">
              Capx App offers a host of quests for the daily user. Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="expiry-box mb-10">
            <h3 className="task-heading mb-3">Quest expiry :</h3>
            <p className="task-text">42 Hours 32 Mins 48 Seconds</p>
          </div>
          <div className="action-box mb-10">
            <h3 className="task-heading mb-3">Action :</h3>
            {actionCardDetails.map((card) => {
              return <ActionCard details={card} />;
            })}
          </div>
          <div className="social-box flex items-center">
            <h3 className="task-heading mr-4">Share this quest :</h3>
            <button className="social-btn ml-4">
              <img src={TwitterContainedIcon} alt="twitter" />
            </button>
            <button className="social-btn ml-4">
              <img src={InstaContainedIcon} alt="twitter" />
            </button>
          </div>
        </div>
        <div className="quest-action">
          <h3 className="task-heading mb-3">Action #2 : What is Capx App ?</h3>
          <div className="quiz-box self-stretch mb-10">
            <h5 className="pl-5 mb-2">
              What do you earn as rewards from Capx app ?
            </h5>
            <div className="answers">
              <p className="answer mb-2">IOU Rewards</p>
              <p className="answer mb-2">XP Rewards</p>
              <p className="answer mb-2">Point Rewards</p>
            </div>
          </div>
          <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center">
            Complete Action
            <HiArrowRight className="text-xl ml-4" />
          </button>
        </div>
      </div>
      <p className="footer text-gray-400 mt-20">
        © Capx 2022. All rights reserved
      </p>
    </div>
  );
};

export default AnswerQuiz;
