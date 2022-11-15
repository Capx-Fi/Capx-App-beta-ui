import React from "react";
import Header from "./components/Header";
import { BiRightArrowAlt } from "react-icons/bi";
import { CardsImg } from "../../assets/images";
import QuestCard from "./components/QuestCard";

const index = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="custom-container">
          <div class="grid md:grid-cols-1 md:grid-cols-3 gap-3 py-20">
            <div class="md:col-span-2 col-span-1">
              <div className="flex flex-col items-start justify-center h-full">
                <h2 className="lg:text-6xl md:text-5xl text-4xl font-semibold">
                  Contribute to Capx ecosystem and earn attractive rewards
                </h2>
                <p className="text-1xl fs-20 my-5">
                  Contribute to the ecosystem and earn attractive rewards
                </p>
                <button className="fs-16 contained-btn px-7 py-3 inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-transparent text-base font-medium text-white shadow-sm hover:bg-Gray-900">
                  <span>Begin you journey</span>
                  <BiRightArrowAlt className="text-2xl" />
                </button>
              </div>
            </div>
            <div class="col-span-1 hidden md:block">
              <img className="w-100" src={CardsImg} alt="cards" />
            </div>
          </div>
          <h2 className="fs-44 text-center font-semibold leading-10 mb-1">
            Fresh Quests
          </h2>
          <p className="fs-20 text-center font-normal mb-10">
            Contribute to the ecosystem and earn attractive rewards
          </p>

          <div className="grid grid-cols-8 gap-4">
            <div></div>
            {Array(3)
              .fill("")
              .map((card) => {
                return (
                  <div className="col-span-2 ">
                    <QuestCard />
                  </div>
                );
              })}

            <div></div>
          </div>
          <div />
          <div className="grid md:grid-cols-1 md:grid-cols-3 gap-3 py-10">
            <div class="md:col-span-2 col-span-1">ddf</div>
            <div class="col-span-1 hidden md:block">ff</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
