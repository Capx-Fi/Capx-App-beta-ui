import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ErrorLottie from "../../../../../assets/lottie/ErrorAnimation.json";
import { HiArrowRight } from "react-icons/hi";

const ShareModal = ({ open, platform, handleClose, inviteCode }) => {
  const cancelButtonRef = useRef(null);

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

        <div className="social-share-dialog fixed inset-0 z-10 overflow-y-auto">
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
                <h3 className="dialog-heading gredient-text">
                  Share on {platform}
                </h3>

                <p className="dialog-text mb-3 p-4">
                  Join the Capx app closed alpha - app.capx-fi with my code -{" "}
                  {inviteCode}
                </p>
                <div className="dialog-buttons flex flex-col">
                  <button
                    onClick={handleClose}
                    className="btn-contained contained-effect bg-gredient-2 flex justify-center items-center"
                  >
                    <span>Copy</span>
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

export default ShareModal;
