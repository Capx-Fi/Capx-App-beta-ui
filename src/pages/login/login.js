import React, { useEffect } from "react";
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
import { useFireBaseLogin } from "../../hooks/useFirebaseLogin";
import { useApi } from "../../hooks/useApi";
import { getURLParameter } from "../../utils";
import { config } from "../../config";
import Modal from "../../components/Modal/Modal";

const Login = () => {
  const {
    error,
    isPending,
    signInUserUsingSocial,
    getSigninResult,
    customSignin,
  } = useFireBaseLogin();

  const {
    data: ApiData,
    error: apiError,
    isPending: isApiPending,
    getData,
  } = useApi(config.AUTH_ENDPOINT);

  const handleLogin = async (method) => {
    if (method === "discord") {
      window.location.href = `${config.AUTH_ENDPOINT}/loginDiscord`;
    } else {
      await signInUserUsingSocial(method);
    }
  };

  useEffect(() => {
    (async () => {
      let code = getURLParameter("code");
      if (code && !ApiData) {
        getData({ code: code }, "/loginAuthDiscord");
      } else if (code && ApiData) {
        customSignin(ApiData.token);
      } else {
        getSigninResult();
      }
    })();
  }, [ApiData]);

  return (
    <>
      <main className="signup-page min-h-screen">
        <div className="flex md:flex-row flex-col-reverse min-h-screen">
          <div className="left-content-box-wrapper md:p-6 px-11 py-8 flex-col  flex justify-center md:items-center bg-white-transparent relative rounded-t-3xl md:rounded-none md:mt-0 -mt-6 ">
            <div className="left-content-box flex flex-col items-center justify-center ">
              <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-7 md:self-center self-start">
                <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
              </div>
              <h2 className="m-heaidng hidden md:block font-black gredient-text leading-tight md:mb-5 mb-3">
                Welcome back!
              </h2>
              <Link to="email" className="mb-5 self-stretch">
                <div className=" flex justify-center items-center self-stretch bg-gredient-2 py-3 rounded-xl">
                  <IoMdMail className="text-white fs-22" />
                  <span className="text-white font-medium fs-15 ml-4">
                    Login with Email
                  </span>
                </div>
              </Link>
              <div className="flex items-center self-stretch  mb-5">
                <div className="bg-primary-200 devider flex-grow"></div>
                <span className="fs-16 font-medium text-primary-800 mx-3">
                  or
                </span>
                <div className="bg-primary-200 devider flex-grow"></div>
              </div>
              <button
                onClick={() => {
                  handleLogin("google");
                }}
                className="mb-5 self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={GoogleIcon} alt="google" />
                  <span className="text-primary-800 font-medium fs-15 ml-4">
                    Login with Google
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  handleLogin("twitter");
                }}
                className="mb-5 self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={TwitterIcon} alt="google" />
                  <span className="text-primary-800 font-medium fs-15 ml-4">
                    Login with Twitter
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  handleLogin("discord");
                }}
                className="mb-5  self-stretch"
              >
                <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
                  <img src={DiscordIcon} alt="google" />
                  <span className="text-primary-800 font-medium fs-15 ml-4">
                    Login with Discord
                  </span>
                </div>
              </button>
              <Link
                to="/signup"
                className="fs-15 font-bold text-primary-900 underline mb-6"
              >
                Not a member? Get Started
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
              Welcome back !
            </p>
          </div>
        </div>
      </main>
      {(isPending || isApiPending) && <Modal />}
    </>
  );
};

export default Login;
