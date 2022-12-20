import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ActionCompleteLottie from "../../../../assets/lottie/ActionSuccessAnimation.json";
import Lottie from "react-lottie";
import { HiArrowRight } from "react-icons/hi";

const ActionCompleteModal = ({ open, handleClose }) => {
  const cancelButtonRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ActionCompleteLottie,
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

        <div className="action-com-dialog fixed inset-0 z-10 overflow-y-auto">
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
                <h3 className="dialog-heading gredient-text">
                  Congratulations!
                </h3>
                <p className="dialog-text mb-3">
                  You have claimed 1 xCapx by completing the action.
                </p>
                <div className="dialog-buttons flex flex-col">
                  <button
                    onClick={handleClose}
                    className="btn-contained bg-gredient-2 flex justify-center items-center"
                  >
                    <span>Next Quest</span>
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

export default ActionCompleteModal;
