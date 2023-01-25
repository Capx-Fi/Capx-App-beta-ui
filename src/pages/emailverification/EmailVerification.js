import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChipCapxSvg } from "../../assets/svg";
import Stepper from "../../components/stepper/Stepper";
import { config } from "../../config";
import { useFirebaseEmailVerification } from "../../hooks/useFirebaseEmailVerification";

const EmailVerification = () => {
  const email = useSelector((state) => state.auth.user.email);
  const {
    verifyEmail,
    error: linkSocalError,
    isPending: isSOcialLinkPending,
    isCompleted: linkDone,
  } = useFirebaseEmailVerification();
  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <>
      <div className="emailVerification-page left-content-box-wrapper  p-6 flex-col  flex md:justify-center justify-start items-stretch md:items-center min-h-screen relative">
        <div className="left-content-box flex gap-8 flex-col items-center justify-center md:mt-0 mt-20 md:mb-20">
          <Stepper step1={"active"} step2={"disable"} step3={"disable"} />
          <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full md:self-center self-start">
            <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
          </div>
          <h2 className="m-heaidng font-black gredient-text text-center leading-tight ">
            Check your email for the
            <br className="hidden md:block" /> verification link
          </h2>
          <p className="text-center middle-text md:px-0 px-8">
            We've sent a verification link to <b>{email}</b>
            <br className="md:block hidden" /> The link will expire in the next
            90 minutes!
          </p>
          <div className="flex flex-col gap-2  md:px-0 px-8">
            <p className="bottom-text text-center">
              Still didn’t receive?{" "}
              <span className="underline cursor-pointer">
                Resend verification link
              </span>
            </p>
            <p className="bottom-text text-center">
              Can’t find the verification email? Check your spam folder!{" "}
            </p>
          </div>

          <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
            <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
          </div>

          <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
            © Capx 2022. All rights reserved
          </p>
          {
            <img
              src={config.FIRESTORE_IMAGE_URL + config.MOB_SIGNUP_STICKER}
              alt="sticker"
              className="block md:hidden absolute bottom-0 mb-12"
            />
          }
        </div>
      </div>
      <div className="flex-1 md:min-h-screen hidden md:block">
        <div className="h-full w-full flex items-end justify-center px-6 relative">
          <img
            className="width-90p"
            src={config.FIRESTORE_IMAGE_URL + config.SIGNUP_STICKER_SVG}
            alt="dummy"
          />
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
