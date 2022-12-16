import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { CoinSvg } from "../../../../assets/svg";
import Lottie from "react-lottie";
import animationData from "../../../../assets/lottie/failedCross.json";

const FailureMsg = ({ errorReset }) => {
  console.log(errorReset);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="failure flex flex-col md:ml-20 px-10 py-5 gap-5 h-fit">
      <Lottie options={defaultOptions} height={240} width={240} />
      <div className="codestep2-congrats-1 flex flex-col items-center">
        <p className="codestep2-congratstitle fs-30 font-bold">Uh oh!</p>
        <p className="fs-18 font-medium">
          Looks like your tasks weren’t <br /> completed successfully. Try
          again!{" "}
        </p>
      </div>
      <button
        onClick={errorReset}
        className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 mb-5 rounded-2xl text-white font-semibold fs-16 w-full"
      >
        Try Again
        <HiArrowRight className="text-xl ml-4" />
      </button>
    </div>
  );
};

export default FailureMsg;
