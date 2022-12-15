import React from "react";
import ReactDOM from "react-dom";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/loader.json";
import failureData from "../../assets/lottie/failedCross.json";
import { HiArrowRight } from "react-icons/hi";
const Modal = ({ actions }) => {
  console.log(actions);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsFailure = {
    loop: true,
    autoplay: true,
    animationData: failureData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        {!(actions && actions.error) ? (
          <Lottie options={defaultOptions} height={240} width={240} />
        ) : (
          <div className="flex flex-col px-10 py-5 gap-5 h-fit">
            <Lottie options={defaultOptionsFailure} height={240} width={240} />
            <div className="codestep2-congrats-1 flex flex-col items-center">
              <p className="codestep2-congratstitle fs-30 font-bold">Uh oh!</p>
              <p className="fs-18 font-medium">
                {actions.error && actions.error}
                <br /> Try again!{" "}
              </p>
            </div>
            <button
              onClick={(e) => actions.showModalFunc()}
              className="bg-gredient-2 action-btn self-stretch flex justify-center items-center p-3 mb-5 rounded-2xl text-white font-semibold fs-16 w-full"
            >
              Try Again
              <HiArrowRight className="text-xl ml-4" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
