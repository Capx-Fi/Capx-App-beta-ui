import React from "react";
import Header from "./components/Header";
import { BiRightArrowAlt } from "react-icons/bi";
import { CardsImg, DummyImg } from "../../assets/images";
import QuestCard from "./components/QuestCard";
import ContributersTable from "./components/ContributersTable";
import DesktopFooter from "../../components/DesktopFooter";
import { BrandSvgLogo } from "../../assets/svg";

const index = () => {
  return (
    <>
      <header className="md:block hidden">
        <Header />
      </header>
      {/* desktop view */}
      <main className="md:block hidden pb-20 bg-white">
        <div className="custom-container">
          <div class="grid md:grid-cols-1 md:grid-cols-3 gap-8 py-20">
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

          <div className="grid grid-cols-8 gap-4 mb-24">
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
          <h2 className="fs-44  font-semibold leading-10 mb-1">
            Top Contributors
          </h2>
          <p className="fs-20  font-normal mb-10">
            Contribute to the ecosystem and earn attractive rewards
          </p>
          <div className="grid md:grid-cols-9 gap-20">
            <div class="md:col-span-6 col-span-1">
              <ContributersTable />
              <button className="fs-16 contained-btn px-7 py-3 inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-transparent text-base font-medium text-white shadow-sm hover:bg-Gray-900">
                <span>Begin you journey</span>
                <BiRightArrowAlt className="text-2xl" />
              </button>
            </div>
            <div class="col-span-3 hidden md:block">
              <img src={DummyImg} alt="Dummy" />
            </div>
          </div>
        </div>
      </main>
      <main className="md:hidden block">
        <div className="custom-container">
          <div className="flex flex-col items-start">
            <button className="bg-transparent rounded-full border-2 border-green-300 px-2 py-1">
              <img className="h-6" src={BrandSvgLogo} alt="Capx" />
            </button>
            <h2 className="font-black fs-72 leading-none primary-text-gradient">
              Learn, contribute and claim rewards
            </h2>
            <p>
              Join Capx and learn to earn contribution to communities and
              projects. Begin your journey.
            </p>
            <div className="h-1 bg-green-500 mb-2 self-stretch"></div>
            <button className="green-bg-gradient text-white  py-3  self-stretch rounded-2xl">
              Register
            </button>
            <button className="bg-transparent text-green-600 py-3 border-2 border-green-600 self-stretch rounded-2xl">
              Login
            </button>
          </div>
        </div>
      </main>
      <footer className="md:block hidden">
        <DesktopFooter />
      </footer>
    </>
  );
};

export default index;
