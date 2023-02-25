import React, { useEffect, useState } from "react";
import {
  ChipCapxSvg,
  DiscordIcon,
  GoogleIcon,
  TwitterIcon,
} from "../../assets/svg";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFireBaseLogin } from "../../hooks/useFirebaseLogin";
import { useApi } from "../../hooks/useApi";
import { getURLParameter } from "../../utils";
import { config } from "../../config";
import TopLoader from "../../components/topLoader/TopLoader";
import Modal from "../../components/Modal/Modal";

const Signup = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const {
    error,
    isPending,
    signInUserUsingSocial,
    customSignin,
    getSigninResult,
  } = useFireBaseLogin();

  const {
    data: ApiData,
    error: apiError,
    isPending: isApiPending,
    getData,
  } = useApi(config.AUTH_ENDPOINT);

  useEffect(() => {
    (async () => {
      let code = getURLParameter("code");
      if (code && !ApiData) {
        getData({ code: code }, "/signUpAuthDiscord");
      } else if (code && ApiData) {
        customSignin(ApiData.token);
      } else {
        getSigninResult();
      }
    })();
    if (ApiData?.result?.message || ApiData?.result?.error) {
      setShowErrorModal(true);
    }
  }, [ApiData]);

  useEffect(() => {
    if (apiError || error) {
      setShowErrorModal(true);
    }
  }, [apiError, error]);

  const handleLogin = async (method) => {
    if (method === "discord") {
      window.location.href = `${config.AUTH_ENDPOINT}/signUpDiscord`;
    } else {
      await signInUserUsingSocial(method);
    }
  };

  const handleErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <div className="signup-page left-content-box-wrapper md:p-6 px-11 py-8 flex-col  flex justify-center md:items-center bg-white-transparent relative rounded-t-3xl md:rounded-none md:mt-0 -mt-6">
        <div className="left-content-box flex flex-col items-center justify-center ">
          <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full mb-7 md:self-center self-start">
            <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
          </div>
          <h2 className="m-heaidng hidden md:block font-black gredient-text leading-tight md:mb-5 mb-3">
            Let’s get started!
          </h2>
          <Link to="email" className="mb-5 self-stretch ">
            <div className="flex contained-effect justify-center items-center self-stretch bg-gredient-2 py-3 rounded-xl">
              <IoMdMail className="text-white fs-22" />
              <span className="text-white font-medium fs-15 ml-4">
                Continue with Email
              </span>
            </div>
          </Link>
          <div className="flex items-center self-stretch  mb-5">
            <div className="bg-primary-200 devider flex-grow"></div>
            <span className="fs-16 font-medium text-primary-800 mx-3">or</span>
            <div className="bg-primary-200 devider flex-grow"></div>
          </div>
          <button
            onClick={() => {
              handleLogin("google");
            }}
            className="mb-5 self-stretch outlined-effect"
          >
            <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
              <img src={GoogleIcon} alt="google" />
              <span className=" text-primary-800 font-medium fs-15 ml-4">
                Continue with Google
              </span>
            </div>
          </button>
          <button
            onClick={() => {
              handleLogin("twitter");
            }}
            className="mb-5 self-stretch outlined-effect"
          >
            <div className=" flex justify-center self-stretch py-2.5 rounded-xl border-2 border-primary-200">
              <img src={TwitterIcon} alt="google" />
              <span className="text-primary-800 font-medium fs-15 ml-4">
                Continue with Twitter
              </span>
            </div>
          </button>
          <button
            onClick={() => {
              handleLogin("discord");
            }}
            className="mb-5 self-stretch outlined-effect"
          >
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
            © Capx 2023. All rights reserved
          </p>
        </div>
      </div>
      <div className="right-img-wrapper flex-1 md:min-h-screen hidden md:block">
        <div className="h-full w-full flex items-end justify-end">
          <img
            className="width-90p"
            src={config.FIRESTORE_IMAGE_URL + config.GETSTARTED_SVG}
            alt="dummy"
          />
        </div>
      </div>
      <div className="right-img-wrapper flex-1 md:min-h-screen block md:hidden pt-10">
        <div className="h-full w-full flex items-end justify-center px-6">
          <img
            className="width-90p"
            src={config.FIRESTORE_IMAGE_URL + config.GETSTARTED_SVG_2}
            alt="dummy"
          />
        </div>
        <p className="gredient-text text-center fs-40 font-black tracking-tight -translate-y-10">
          Let’s get started !
        </p>
      </div>
      {(isPending || isApiPending) && <TopLoader />}
      {showErrorModal && (
        <Modal
          actions={{
            error:
              error?.toString() ||
              apiError?.toString() ||
              ApiData?.result?.message ||
              ApiData?.result?.error ||
              "Something went wrong",
            showModalFunc: handleErrorModal,
          }}
        />
      )}
    </>
  );
};

export default Signup;
