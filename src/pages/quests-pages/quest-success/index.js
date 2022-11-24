import React from "react";
import {
  InstaContainedIcon,
  QuestSuccessSvg,
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
    completed: true,
  },
];

const QuestSuccess = () => {
  return (
    <div className="quest-layout quest-success-page">
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
        <div className="quest-action flex flex-col items-center ">
          <img className="mx-3 mb-8" src={QuestSuccessSvg} alt="Success" />
          <h4 className="congo-text gredient-text text-center">
            Congratulations!
          </h4>
          <p className="mb-14">You have earned 5 xCapx as rewards!</p>
          <button className="bg-gredient-2 action-btn self-stretch flex justify-center items-center">
            Next Quest
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

export default QuestSuccess;
