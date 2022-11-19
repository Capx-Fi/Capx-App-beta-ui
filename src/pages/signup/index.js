import React from "react";
import {
  ChipCapxSvg,
  DiscordIcon,
  GetStatedSvg,
  GetStatedSvg2,
  GoogleIcon,
  TwitterIcon,
} from "../../assets/svg";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  handleFirebaseLogin,
  googleLoginProvider,
  twitterLoginProvider,
} from "../../firebase/firebase";

const Signup = () => {
  return (
    <>
      <main className="signup-page min-h-screen">
        <div className="flex md:flex-row flex-col-reverse min-h-screen">
          <div className="left-content-box-wrapper p-6 flex-col  flex justify-center md:items-center bg-white-transparent relative rounded-t-3xl md:rounded-none md:mt-0 -mt-6 ">
            <div className="left-content-box flex flex-col items-center justify-center ">
              <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-7 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng hidden md:block font-black gredient-text leading-tight md:mb-5 mb-3">
                Let’s get started!
              </h2>
              <Link to="email" className="mb-5 self-stretch">
                <div className=" flex justify-center items-center self-stretch bg-gredient-2 py-3 rounded-xl">
                  <IoMdMail className="text-white fs-22" />
                  <span className="text-white font-medium fs-15 ml-4">
                    Continue with Email
                  </span>
                </div>
              </Link>
              <div class="flex items-center self-stretch  mb-5">
                <div className="bg-primary-200 devider flex-grow"></div>
                <span className="fs-16 font-medium text-primary-800 mx-3">
                  or
                </span>
                <div className="bg-primary-200 devider flex-grow"></div>
              </div>
              <button
                onClick={() => {
                  handleFirebaseLogin(googleLoginProvider);
                }}
                className="mb-5 self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={GoogleIcon} alt="google" />
                  <span className="text-primary-800 font-medium fs-15 ml-4">
                    Continue with Google
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  handleFirebaseLogin(twitterLoginProvider);
                }}
                className="mb-5 self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={TwitterIcon} alt="google" />
                  <span className="text-primary-800 font-medium fs-15 ml-4">
                    Continue with Twitter
                  </span>
                </div>
              </button>
              <button className="mb-5  self-stretch">
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={DiscordIcon} alt="google" />
                  <span className="text-primary-800 font-medium fs-15 ml-4">
                    Continue with Discord
                  </span>
                </div>
              </button>
              <Link
                to="/signin"
                className="fs-15 font-bold text-primary-900 underline mb-6"
              >
                Already a member? Log in
              </Link>
              <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-7">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
                © Capx 2022. All rights reserved
              </p>
            </div>
          </div>
          <div className="flex-1 md:min-h-screen hidden md:block">
            <div className="h-full w-full flex items-end justify-end">
              <img className="width-90p" src={GetStatedSvg} alt="dummy" />
            </div>
          </div>
          <div className="right-img-wrapper flex-1 md:min-h-screen block md:hidden pt-10">
            <div className="h-full w-full flex items-end justify-center px-6">
              <img className="width-90p" src={GetStatedSvg2} alt="dummy" />
            </div>
            <p className="gredient-text text-center fs-40 font-black tracking-tight -translate-y-10">
              Let’s get started !
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
