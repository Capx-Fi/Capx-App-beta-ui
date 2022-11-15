import React from "react";
import Header from "./components/Header";

import { BiRightArrowAlt } from "react-icons/bi";
import { PandaHandImg } from "../../assets/images";
import QuestCard from "./components/QuestCard";

const Dashboard = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <mian>
        <div className="custom-container">
          <div className="dark-bg-gradient-2 rounded-xl px-10 py-16 my-6">
            <div class="grid md:grid-cols-1 md:grid-cols-3 gap-3">
              <div class="md:col-span-2 col-span-1 md:mb-0 mb-6">
                <h2 className="text-white leading-tight fs-44 text-4xl font-semibold">
                  Congratulations!
                  <br /> You made it to Day 2
                </h2>
                <p className="text-white fs-18 font-normal">
                  We have the next set of quests, challenges and more ready for
                  you!
                </p>
              </div>
              <div class="col-span-1 flex flex-col md:pr-7">
                <button className="fs-16 text-center flex justify-center items-center whitespace-no-wrap font-bold text-white light-bg-gradient flex mb-6 rounded-lg px-6 py-4">
                  <span>Claim today’s Sign in reward</span>
                  <BiRightArrowAlt className="text-2xl" />
                </button>
                <button className="fs-16 text-center flex justify-center items-center whitespace-no-wrap font-bold text-white light-bg-gradient flex rounded-lg px-6 py-4">
                  <span>Complete next quest</span>
                  <BiRightArrowAlt className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-16">
            <div className="col-span-1 rounded-2xl bg-white flex items-center p-2">
              <img
                className="inline-block h-13 w-13 rounded-full  yellow-bg-gradient ml-2"
                src={PandaHandImg}
                alt="Avatar"
              />
              <p className="fs-18 font-medium ml-4">
                Maximize rewards by maintaining a 7-day Sign in streak 🤑{" "}
              </p>
            </div>
            <div className="col-span-1 rounded-2xl bg-white flex items-center p-2">
              <img
                className="inline-block h-13 w-13 rounded-full  yellow-bg-gradient ml-2"
                src={PandaHandImg}
                alt="Avatar"
              />
              <p className="fs-18 font-medium ml-4">
                Refer a friend or a group of friends to earn more rewards
              </p>
            </div>
          </div>
          <h2 className="fs-32 font-bold text-gray-600 mb-6">
            Available Quests
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6 mb-16">
            {Array(6)
              .fill("")
              .map((card) => {
                return (
                  <div className="col-span-1">
                    <QuestCard />
                  </div>
                );
              })}
          </div>
          <h2 className="fs-32 font-bold text-gray-600 mb-6">Pending Quests</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6 mb-16">
            {Array(3)
              .fill("")
              .map((card) => {
                return (
                  <div className="col-span-1">
                    <QuestCard />
                  </div>
                );
              })}
          </div>
        </div>
      </mian>
    </>
  );
};

export default Dashboard;
