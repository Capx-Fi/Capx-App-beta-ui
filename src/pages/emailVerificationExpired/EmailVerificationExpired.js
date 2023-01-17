import React from "react";
import { Link } from "react-router-dom";
import { ChipCapxSvg } from "../../assets/svg";
import { config } from "../../config";

const EmailVerificationExpired = () => {
  return (
    <main className="emailVerification-page min-h-screen">
      <div className="flex min-h-screen">
        <div className="left-content-box-wrapper  p-6 flex-col  flex justify-center  items-stretch md:items-center min-h-screen relative">
          <div className="left-content-box flex gap-8 flex-col items-center justify-center  md:mb-20">
            <div className="brand-chip bg-primary-100  hidden md:block border-primary-200 border-1 rounded-full md:self-center self-start">
              <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
            </div>
            <h2 className="m-heaidng font-black gredient-text text-center leading-tight pb-1">
              Oops! Sorry, your verification
              <br /> link has expired please
              <br /> try signing up again!
            </h2>

            <Link to="/signup" className="self-stretch">
              <button className="signup-btn contained-effect bg-gredient-2 w-full">
                Sign up
              </button>
            </Link>

            <div className="brand-chip bg-primary-100  block md:hidden border-primary-200 border-1 rounded-full mb-6 self-center ">
              <img className=" mt-1" src={ChipCapxSvg} alt="capx" />
            </div>

            <p className="text-gray-400 fs-15 font-bold hidden md:block absolute bottom-0 py-5">
              © Capx 2022. All rights reserved
            </p>
          </div>
        </div>
        <div className="flex-1 md:min-h-screen hidden md:block">
          <div className="h-full w-full flex items-end justify-center px-6 relative">
            <img
              className="width-90p"
              src={config.FIRESTORE_IMAGE_URL + config.EMAIL_VERIFICATION_SVG}
              alt="dummy"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmailVerificationExpired;
