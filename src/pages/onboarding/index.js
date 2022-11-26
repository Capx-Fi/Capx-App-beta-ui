import React from "react";

import { ChipCapxSvg, OnboardSvg } from "../../assets/svg";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FrontPandaImg,
  OnboardMobBg,
  RightPandaImg,
} from "../../assets/images";

const Onboarding = () => {
  return (
    <>
      <main className="onboarding-page min-h-screen">
        <div className="flex min-h-screen">
          <div className="left-content-box-wrapper p-6 flex-col  flex md:justify-center justify:start items-center bg-white-transparent min-h-screen relative">
            <img
              className="md:hidden block absolute top-0 right-0"
              src={OnboardMobBg}
              alt="bg"
            />
            <div className="left-content-box flex flex-col items-center justify-center mt-12 md:mt-0">
              <div className="brand-chip bg-primary-100   border-primary-200 border-1 rounded-full md:mb-6 mb-10 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-2 mb-3">
                Learn, together 
                Earn together
              </h2>
              <p className="discription fs-16 font-bold text-slate-500 md:text-center md:mb-10 mb-8 hidden md:block">
                Welcome to the world of quests, contests & 
                challenges. Begin your web3 journey! 
              </p>
              <p className="discription fs-16 font-bold text-slate-500 md:text-center md:mb-10 mb-8 block md:hidden">
                Join Capx and learn to earn contribution to communities and
                projects. Begin your journey.
              </p>
              <div className="md:hidden block devider self-stretch h-1 mb-2 bg-primary-200 mb-9"></div>
              <Link to="/signup" className="mb-6 self-stretch">
                <div className="md:flex hidden items-center bg-primary-100 border-primary-200 border-1 px-3 py-4 rounded-xl ">
                  <img src={FrontPandaImg} alt="Panda" />
                  <div className="flex flex-col items-start ml-4">
                    <span className="fs-15 font-medium">I’m new here</span>
                    <span className="fs-15 font-medium text-slate-500">
                      help me create my Capx account
                    </span>
                  </div>
                  <span className="flex-1" />
                  <FaChevronRight className="text-primary-800" />
                </div>
                <div className="rounded=xl md:hidden flex justify-center self-stretch bg-gredient-2 py-3 rounded-xl">
                  <span className="text-white font-bold fs-16">Sign up</span>
                </div>
              </Link>
              <Link to="/signin" className=" md:mb-20 self-stretch">
                <div className="md:flex hidden items-center bg-primary-100 border-primary-200 border-1 px-3 py-4 rounded-xl">
                  <img src={RightPandaImg} alt="Panda" />
                  <div className="flex flex-col items-start ml-4 ">
                    <span className="fs-15 font-medium">
                      I’m already a user
                    </span>
                    <span className="fs-15 font-medium text-slate-500">
                      take me to the world of Capx quests
                    </span>
                  </div>
                  <span className="flex-1" />
                  <FaChevronRight className="text-primary-800" />
                </div>
                <div className="rounded=xl md:hidden flex justify-center self-stretch py-3 rounded-xl border-2 border-primary-200">
                  <span className="text-primary-800 font-bold fs-16">
                    Sign in
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <div className="h-full w-full flex items-end justify-center px-6">
              <img className="width-90p" src={OnboardSvg} alt="dummy" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Onboarding;
