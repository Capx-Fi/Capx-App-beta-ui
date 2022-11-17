import React from "react";
import {
  FrontPandaImg,
  OnboardImg,
  OnboardMobBg,
  RightPandaImg,
} from "../../assets/images";
import { ChipCapxSvg } from "../../assets/svg";
import LayoutSideImg from "./components/LayoutSideImg";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <>
      <main className="onboarding-page">
        <div className="flex">
          <div className="flex-1 p-6 flex-col  flex justify-center items-center bg-white-transparent min-h-screen relative">
            <img
              className="md:hidden block absolute top-0 right-0"
              src={OnboardMobBg}
              alt="bg"
            />
            <div className="left-content-box flex flex-col items-center justify-center min-h-screen">
              <div className="bg-primary-100 border-primary-200 border-1 px-4 py-1.5 rounded-full mb-6 md:self-center self-start">
                <img src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng font-black gredient-text leading-tight md:mb-2 mb-3">
                Learn, contribute and earn rewards
              </h2>
              <p className="fs-16 font-bold text-slate-500 md:text-center md:mb-10 mb-8">
                Join Capx to learn & earn while contributing to the Capx
                ecosystem. Begin your journey!
              </p>
              <div className="md:hidden block devider self-stretch h-1 mb-2 bg-primary-200 mb-9"></div>
              <Link to="/signup" className="mb-6 self-stretch">
                <div className="md:flex hidden items-center bg-primary-100 border-primary-200 border-1 px-2 py-2 rounded-xl ">
                  <img src={FrontPandaImg} alt="Panda" />
                  <div className="flex flex-col items-start ml-4">
                    <span className="fs-15 font-bold">I’m new here</span>
                    <span className="fs-15 font-bold text-slate-500">
                      I need to create an account and explore
                    </span>
                  </div>
                  <FaChevronRight className="ml-4" />
                </div>
                <div className="rounded=xl md:hidden flex justify-center self-stretch bg-gredient-2 py-3 rounded-xl">
                  <span className="text-white font-bold fs-16">Sign up</span>
                </div>
              </Link>
              <button className=" md:mb-20 self-stretch">
                <div className="md:flex hidden items-center bg-primary-100 border-primary-200 border-1 px-2 py-2 rounded-xl">
                  <img src={RightPandaImg} alt="Panda" />
                  <div className="flex flex-col items-start ml-4 ">
                    <span className="fs-15 font-bold">I’m new here</span>
                    <span className="fs-15 font-bold text-slate-500">
                      I need to create an account and explore
                    </span>
                  </div>
                  <FaChevronRight className="ml-4" />
                </div>
                <div className="rounded=xl md:hidden flex justify-center self-stretch py-3 rounded-xl border-2 border-primary-200">
                  <span className="text-primary-800 font-bold fs-16">
                    Sign up
                  </span>
                </div>
              </button>

              <p className="text-gray-400 fs-15 font-bold hidden md:block">
                © Capx 2022. All rights reserved
              </p>
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <LayoutSideImg image={OnboardImg} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Onboarding;
