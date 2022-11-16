import React from "react";
import Header from "./components/Header";

import { ErrorImg, PandaHandImg } from "../../assets/images";
import QuestCard from "./components/QuestCard";
import Banner from "./components/Banner";
import CustomSlider from "./components/Slider";
import MobileFooter from "../../components/MobileFooter";

const Dashboard = () => {
  return (
    <>
      <header className="fixed top-0 w-full z-10">
        <Header />
      </header>
      <mian className="dashboard-main block py-6 md:mt-20 mt-14">
        <div className="custom-container">
          <div className="flex justify-between items-center px-3 py-2 mb-6 bg-orange-100 block md:hidden border-dashed border-2 border-orange-300 rounded-full">
            <span className="text-gray-400">
              Complete your profile & earn 5 xCapx
            </span>
            <img src={ErrorImg} alt="ex" />
          </div>
          <Banner />
          <div className="md:hidden block">
            <CustomSlider heading="Daily Quests" />
          </div>
          <div className="md:hidden block">
            <CustomSlider heading="Daily Quests" />
          </div>
          <div className="md:hidden block">
            <CustomSlider heading="Daily Quests" />
          </div>
          <div className="md:hidden block">
            <CustomSlider heading="Daily Quests" />
          </div>
          <div className="md:hidden block">
            <CustomSlider heading="Daily Quests" />
          </div>
          <div className=" hidden md:grid md:grid-cols-2 grid-cols-1 gap-6 mb-16">
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
          <h2 className="fs-32 font-bold text-gray-600 mb-6 md:block hidden">
            Available Quests
          </h2>
          <div className="md:grid hidden lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6 mb-16">
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
          <h2 className="md:block hidden fs-32 font-bold text-gray-600 mb-6">
            Pending Quests
          </h2>
          <div className="md:grid hidden lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6 mb-16">
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
      <MobileFooter />
    </>
  );
};

export default Dashboard;
