import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  GoogleIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../../../../assets/svg";

const Codestep2 = () => {
  const userInviteCode = useSelector((state)=>state.user.invite_code)
  console.log(userInviteCode)
  return (
    <div className="codestep2 flex-col md:ml-20 px-5 md:px-0 md:w-3/5 w-full">
      <p className="codestep2-title font-bold underline underline-offset-4 text-cgreen-700 fs-15 pb-5">Action #1 : Generate Invite Code </p>
      <div className="codestep2-wrapper w-full flex flex-col gap-6 p-3 md:p-4 border-2 rounded-3xl">
          <p className=" codestep2-placeholder fs-22 font-bold px-5 py-4 w-full bg-slate-50 rounded-2xl text-cgreen-700 ">{userInviteCode}</p>
    </div>

    <div className="codestep2-congrats w-full flex flex-col items-center gap-6 pt-8">
      <div className="codestep2-congrats-1 flex flex-col items-center">
        <p className="codestep2-congratstitle fs-30 font-bold">Congratulations!</p>
        <p className="fs-18 font-medium">You have 3 invites</p>
      </div>

      <div className="codestep2-congrats-1 flex flex-col items-center px-5 gap-4">
        <p className="fs-15 font-bold px-5 underline underline-offset-4 text-cgreen-700 opacity-90">Invite Frens with your Invite Code</p>
        <div className="social-icons flex flex-col gap-3 w-full">
            <button className=" flex justify-center w-full py-2.5 rounded-xl border-2 border-primary-200">
                      <img src={TwitterIcon} alt="google" />
                      <span className="font-semibold fs-15 ml-4 text-cgreen-700">Share on Twitter</span>
            </button>
            <button className=" flex justify-center w-full py-2.5 rounded-xl border-2 border-primary-200">
                      <img src={InstagramIcon} alt="google" />
                      <span className="font-semibold fs-15 ml-4 text-cgreen-700">Share on Instagram</span>
            </button>
            <button className=" flex justify-center w-full py-2.5 rounded-xl border-2 border-primary-200">
                      <img src={WhatsappIcon} alt="google" />
                      <span className="font-semibold fs-15 ml-4 text-cgreen-700">Share on Whatsapp</span>
            </button>
        </div>
      </div>


    </div>
    </div>
  );
};

export default Codestep2;
