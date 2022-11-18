import React from "react";
import {
  FrontPandaImg,
  GetstartImg2,
  GetStatedImg,
  OnboardImg,
  OnboardMobBg,
  RightPandaImg,
} from "../../assets/images";
import {
  ChipCapxSvg,
  DiscordIcon,
  GoogleIcon,
  TwitterIcon,
} from "../../assets/svg";
import LayoutSideImg from "../onboarding/components/LayoutSideImg";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  handleFirebaseLogin,
  googleLoginProvider,
  twitterLoginProvider,
} from "../../firebase/firebase";

const Login = () => {
  return (
    <>
      <main className="login-page min-h-screen">
        <div className="flex md:flex-row flex-col-reverse min-h-screen">
          <div className="flex-1 p-6 flex-col  flex justify-center md:items-center bg-white-transparent relative rounded-t-3xl md:rounded-none md:mt-0 -mt-6 ">
            <div className="left-content-box flex flex-col items-center justify-center ">
              <div className="bg-primary-100  hidden md:block border-primary-200 border-1 px-4 py-1.5 rounded-full mb-6 md:self-center self-start">
                <img src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng hidden md:block font-black gredient-text leading-tight md:mb-5 mb-3">
                Welcome back!
              </h2>
              <button className="mb-3 self-stretch">
                <div className=" flex justify-center items-center self-stretch bg-gredient-2 py-2.5 rounded-xl">
                  <IoMdMail className="text-white fs-22" />
                  <span className="text-white font-bold fs-15 ml-4">
                    Login with Email
                  </span>
                </div>
              </button>
              <div class="flex items-center self-stretch  mb-3">
                <div className="bg-primary-200 devider flex-grow"></div>
                <span className="fs-16 font-bold text-primary-800 mx-3">
                  or
                </span>
                <div className="bg-primary-200 devider flex-grow"></div>
              </div>
              <button
                onClick={() => {
                  handleFirebaseLogin(googleLoginProvider);
                }}
                className="mb-3 self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={GoogleIcon} alt="google" />
                  <span className="text-primary-800 font-bold fs-15 ml-4">
                    Login with Google
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  handleFirebaseLogin(twitterLoginProvider);
                }}
                className="mb-3 self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={TwitterIcon} alt="google" />
                  <span className="text-primary-800 font-bold fs-15 ml-4">
                    Login with Twitter
                  </span>
                </div>
              </button>
              <button className="mb-3  self-stretch">
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={DiscordIcon} alt="google" />
                  <span className="text-primary-800 font-bold fs-15 ml-4">
                    Login with Discord
                  </span>
                </div>
              </button>
              <Link
                to="/signup"
                className="fs-15 font-black text-slate-500 underline mb-6"
              >
                Not a member? Get Started
              </Link>
              <div className="bg-primary-100 md:hidden block  border-primary-200 border-1 px-4 py-1.5 rounded-full mb-6 md:self-center self-center">
                <img src={ChipCapxSvg} alt="capx" />
              </div>
              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <LayoutSideImg image={GetStatedImg} />
          </div>
          <div className="right-img-wrapper flex-1 md:min-h-screen block md:hidden pt-10">
            <LayoutSideImg image={GetstartImg2} />
            <p className="gredient-text text-center fs-40 font-black tracking-tight -translate-y-10">
              Welcome back !
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
