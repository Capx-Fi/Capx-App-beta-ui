import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import badgeGold from "../../assets/lottie/badge_gold.json";
import Lottie from "react-lottie";
import { HiArrowRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const AlertModal = ({ open, handleClose }) => {
  const cancelButtonRef = useRef(null);
  const location = useLocation();
  const pagename = location.pathname.replace("/", "").replace("-", " ");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: badgeGold,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="alert-dialog fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="dialog-box  flex flex-col gap-3 relative transform overflow-hidden rounded-lg  shadow-xl transition-all  sm:w-full sm:max-w-lg">
                <div className="coin-lottie">
                  <Lottie options={defaultOptions} height={240} width={240} />
                </div>
                <p className="gredient-text  mb-3">
                  <span className="dialog-heading ">
                    Complete Quests and earn 21 xCapx tokens or more to unlock
                    the Leaderboard Screen
                  </span>
                  <span className="dialog-text ">
                    {" "}
                    tokens or more to unlock the {pagename} Screen
                  </span>
                </p>

                <div className="dialog-buttons flex flex-col">
                  <button
                    onClick={handleClose}
                    className="btn-contained bg-gredient-2 flex justify-center items-center"
                  >
                    <span>Go to Home</span>
                    <HiArrowRight className="text-xl ml-3" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AlertModal;
