import React from "react";
import { InstagramIcon, TwitterIcon } from "../../assets/svg";
import ActionCard from "./components/actionCard/ActionCard";
import Banner from "./components/banner/Banner";

const Quest = () => {
  const dummyDataForActionCard = [
    {
      title: "Watch the Video",
      type: "video",
      status: "",
    },
    {
      title: "Answer the Question",
      type: "quiz",
      status: "",
    },
  ];

  return (
    <div className="quest-page md:p-8 p-5 ">
      <Banner />
      <div className="quest-wrapper flex md:flex-row flex-col-reverse pt-8">
        <div className="quest-details flex flex-col gap-14">
          <div className="discription-box flex flex-col gap-3">
            <h5 className="quest-headings">Description</h5>
            <p className="discription-text">
              To complete this task watch the video “what is Capx App” to
              understand why it exists and how you can leverage the power of
              community and learning to earn xCapx tokens & other rewards. Once
              done, answer a simple question to earn your xCapx tokens!
            </p>
          </div>
          <div className="action-details flex flex-col gap-3">
            <h5 className="quest-headings">Actions</h5>
            {dummyDataForActionCard.map((quest, ind) => {
              return (
                <ActionCard
                  key={quest.title}
                  type={quest.type}
                  title={quest.title}
                  serial={ind + 1}
                />
              );
            })}
          </div>
          <div className="social-box flex justify-between items-center">
            <h5 className="quest-headings">Share this quest</h5>

            <div className="icons flex items-center">
              <div className="icon flex justify-center items-center">
                <img src={TwitterIcon} alt="twitter" />
              </div>
              <div className="icon flex justify-center items-center ml-3">
                <img src={InstagramIcon} alt="instagram" />
              </div>
            </div>
          </div>
        </div>

        <div className="quest-action">
          <h5 className="quest-headings">
            Action #1 : Watch the Video ‘What is Capx App?’
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Quest;
