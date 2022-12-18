import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  ContentCopySvg,
  GoogleIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../../../../assets/svg";

const Codestep2 = () => {
  const userInviteCode = useSelector((state) => state.user.invite_code);

  const [showSharingOptions, setShowSharingOptions] = useState(false);
  return (
    <div className="codestep2 flex flex-col gap-3">
      <p className="codestep2-title action-heading   ">
        Action #1 : Generate Invite Code
      </p>
      <div className="codestep2-wrapper mb-3">
        <div className="codestep2-placeholder px-5 py-4 rounded-2xl text-cgreen-700 flex justify-between">
          <span> {userInviteCode}</span>
          <button
            className="flex items-center justify-center"
            onClick={() => {
              navigator.clipboard.writeText(userInviteCode);
            }}
          >
            <img src={ContentCopySvg} alt="copy" />
          </button>
        </div>
      </div>
      {!showSharingOptions && (
        <button
          className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl "
          onClick={() => {
            setShowSharingOptions(true);
          }}
        >
          Invite Your Frens
          <HiArrowRight className="text-xl ml-4" />
        </button>
      )}

      {showSharingOptions && (
        <div className="codestep2-congrats w-full flex flex-col gap-6">
          <div className="codestep2-congrats-1 flex flex-col gap-4">
            <div className="social-icons flex flex-col gap-3 w-full">
              <button className=" flex w-full rounded-xl border-2 border-primary-200">
                <img src={TwitterIcon} alt="google" />
                <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                  Share on Twitter
                </span>
              </button>
              <button className=" flex w-full rounded-xl border-2 border-primary-200">
                <img src={InstagramIcon} alt="google" />
                <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                  Share on Instagram
                </span>
              </button>
              <button className=" flex w-full rounded-xl border-2 border-primary-200">
                <img src={WhatsappIcon} alt="google" />
                <span className="font-semibold fs-15 ml-4 text-cgreen-700">
                  Share on Whatsapp
                </span>
              </button>
            </div>
            <button
              className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 rounded-2xl "
              onClick={() => {
                setShowSharingOptions(true);
              }}
            >
              Complete Quest
              <HiArrowRight className="text-xl ml-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Codestep2;