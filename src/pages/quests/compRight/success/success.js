import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { CoinSvg } from "../../../../assets/svg";
import Lottie from "react-lottie";
import animationData from "../../../../assets/lottie/successCheck.json";

const SuccessMsg = ({ errorReset }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="success flex flex-col md:ml-20 px-10 py-5 gap-5 h-fit">
      <Lottie options={defaultOptions} height={240} width={240} />
      <div className="codestep2-congrats-1 flex flex-col items-center">
        <p className="codestep2-congratstitle fs-30 font-bold">
          Congratulations!
        </p>
        <p className="fs-18 font-medium">
          You have successfully completed the task!{" "}
        </p>
      </div>
      <button
        onClick={errorReset}
        className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 mb-5 rounded-2xl text-white font-semibold fs-16 w-full"
      >
        Next Quest
        <HiArrowRight className="text-xl ml-4" />
      </button>
    </div>
  );
};

export default SuccessMsg;